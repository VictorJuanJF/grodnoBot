const express = require('express');
const router = express.Router();
const {
    listIntents,
    updateIntent
} = require('../../chatbot/dialogFlowApiFunctions');
const authUserService = require('../../database/auth_users');
const chatbotUserService = require('../../database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../chatbot/config.js');
const axios = require('axios');
const agenciesService = require('../../database/agencies');
const regionsService = require('../../database/regions');
var fs = require('fs');
//auth
router.post('/login', (req, res) => {
    let body = req.body;
    let user = {
        email: body.email,
        password: body.password,
    }
    authUserService.login(user, (err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!result) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        let passwordIsValid = bcrypt.compareSync(user.password, result.password);
        if (!passwordIsValid) {
            console.log("no se cumplio la pass");
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }
        let token = jwt.sign({
            result
        }, config.SEED, {
            expiresIn: config.CADUCIDAD
        });
        res.status(200).json({
            ok: true,
            token,
            payload: result,
            message: 'Bienvenido!'
        })
    });
});

router.post('/users/confirm-password', (req, res) => {
    let body = req.body;
    let user = {
        email: body.email,
        password: body.password,
    }
    authUserService.login(user, (err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        let passwordIsValid = bcrypt.compareSync(user.password, result.password);
        if (!passwordIsValid) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña incorrecta'
                }
            });
        }
        res.status(200).json({
            ok: true
        })
    });
});

router.post('/user/update-password', (req, res) => {
    let body = req.body;
    let email = body.email;
    let newPassword = body.newPassword;
    authUserService.updatePassword(email, newPassword, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Algo salió mal'
                }
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Contraseña actualizada correctamente'
        })
    });
});

router.post('/register', (req, res) => {
    let body = req.body;
    let user = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        role: body.role,
        status: body.status,
    }
    authUserService.registerUser(user, (err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log("llego este usuario: ", result);
        res.json({
            ok: true,
            payload: result,
            message: 'Usuario creado con exito!'
        });

    });
});

router.get('/auth-users/list', (req, res) => {
    authUserService.list((err, authUsers) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            payload: authUsers,
            message: ''
        })
    });

});
router.post('/auth-users/delete', (req, res) => {
    let email = req.body.email;
    authUserService.deleteUser(email, (err, callback) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (callback) {
            res.status(200).json({
                ok: true,
                message: 'Usuario desactivado con éxito'
            })
        }
    });

});
router.put('/auth-users/update', (req, res) => {
    let body = req.body;
    let user = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        role: body.role,
        status: body.status,
    }
    authUserService.updateUser(user, (err, updatedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (updatedUser) {
            res.status(200).json({
                ok: true,
                payload: updatedUser,
                message: "Datos de usuario actualizados con éxito"
            })
        }
    });

});
//chatbot
router.get('/chatbot/users/list', (req, res) => {
    chatbotUserService.usersList((err, chatbotUsers) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            payload: chatbotUsers,
            message: ''
        })
    });
});
router.get('/chatbot/agent/intents', (req, res) => {
    try {
        let payload = listIntents((callback) => {
            res.json({
                ok: true,
                payload: callback
            });
        });
    } catch (e) {
        console.log("hubo un error:", e);
        // next(e);
    }
});
//update intent
router.put('/chatbot/agent/intents/update', (req, res) => {
    let newIntent = req.body.newIntent;
    try {
        let payload = updateIntent(newIntent, (callback) => {
            res.json({
                ok: true,
                payload: callback,
                message: "Intención actualizada con éxito"
            });
        });
    } catch (e) {
        console.log("hubo un error:", e);
        // next(e);
    }
});

router.post('/chatbot/agent/persistantmenu', (req, res) => {
    let buttons = req.body.buttons;
    console.log("los botones son: ", buttons);
    let rawFormat = {
        "persistent_menu": [{
            locale: "default",
            composer_input_disabled: false,
            call_to_actions: buttons
        }]
    }
    axios.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token=' + config.FB_PAGE_TOKEN, rawFormat, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            res.status(200).json({
                ok: true,
                payload: 'Persistant menu updated',
                message: 'Menú persistente actualizado con éxito'
            });
            console.log('respuesta de facebook: ', response);
            fs.writeFile(__dirname + '/../../chatbot/menu/persistantMenu.json', JSON.stringify(buttons), function (err) {
                if (err) throw err;
                console.log('complete saved file');
            });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                err
            });
        })
});

router.get('/chatbot/agent/persistantmenu/list', (req, res) => {
    try {
        let rawdata = fs.readFileSync(__dirname + '/../../chatbot/menu/persistantMenu.json');
        rawdata = JSON.parse(rawdata);
        if (rawdata) {
            res.json({
                ok: true,
                payload: rawdata
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            ok: false,
            err
        });
    }
});

router.get('/chatbot/agent/agencies/list', (req, res) => {
    agenciesService.listAgencies((err, list) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                payload: list
            });
        }
    });
});

router.post('/chatbot/agent/agencies/delete', (req, res) => {
    let id = req.body.id;
    console.log("recibi el id: ", id);
    agenciesService.deleteAgency(id, (err, callback) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (callback) {
            res.json({
                ok: true,
                payload: [],
                message: "Agencia eliminada con éxito"
            });
        }
    });
});

router.get('/regions/list', (req, res) => {
    regionsService.listRegions((err, list) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                payload: list
            });
        }
    });
});
router.post('/agencies/create', (req, res) => {
    let newAgency = req.body.newAgency;
    if (newAgency.agency_name.length == 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El nombre de la agencia debe estar completo'
            }
        });
    }
    agenciesService.createAgency(newAgency, (err, callback) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                payload: callback,
                message: "Agencia creada con éxito"
            });
        }
    });
});
router.put('/agencies/update', (req, res) => {
    let body = req.body;
    let id = req.body.id;
    let agency = {
        address: body.address,
        agency_name: body.agency_name,
        reference: body.reference,
        region: body.region,
        schedule: body.schedule,
        synonyms: body.synonyms,
    }
    agenciesService.updateAgency(id, agency, (err, updatedAgency) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (updatedAgency) {
            res.status(200).json({
                ok: true,
                payload: updatedAgency,
                message: "Datos de agencia actualizados con éxito"
            })
        }
    });

});



module.exports = router;