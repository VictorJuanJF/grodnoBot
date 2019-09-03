'use strict';
const request = require('request');
const config = require('../chatbot/config.js');
const pg = require('pg');
pg.defaults.ssl = true;
//bcrypt options
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = (user, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select id,nombres as first_name,apellidos as first_name,correo as email,contrasena as password,rol as role,estado as status from sistema_usuarios where correo='${user.email}'`,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, result.rows[0]);
                    };
                    done();
                });
    });
    //pool.end();
}

const registerUser = (user, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        bcrypt.hash(user.password, saltRounds).then(function (hash) {
            client
                .query(
                    `insert into sistema_usuarios(nombres,apellidos,correo,contrasena,rol,estado) values('${user.first_name}','${user.last_name}','${user.email}','${hash}','${user.role}','${user.status}')`,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            callback(null, user);
                        };
                        done();
                    });
        });
    });
    //pool.end();
}
const list = (callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select id,nombres as first_name,apellidos as last_name,correo as email,rol as role,estado as status from sistema_usuarios`,
                function (errQuery, result) {
                    if (errQuery) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, result.rows);
                    };
                    done();
                });
    });
    //pool.end();
}
const updatePassword = (email, newPassword, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    console.log("se actualizara: ", email, newPassword);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        bcrypt.hash(newPassword, saltRounds).then(function (hash) {
            client
                .query(
                    `update sistema_usuarios set contrasena='${hash}' where correo='${email}'`,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            callback(null, true);
                        };
                        done();
                    });
        });
    });
    //pool.end();
}
const deleteUser = (email, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `update sistema_usuarios set estado='0' where correo='${email}'`,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, true);
                    };
                    done();
                });
    });
    //pool.end();
}
const updateUser = (user, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `update sistema_usuarios set nombres='${user.first_name}',apellidos='${user.last_name}',correo='${user.email}',rol='${user.role}',estado='${user.status}' where correo='${user.email}'`,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, user);
                    };
                    done();
                });
    });
    //pool.end();
}

module.exports = {
    registerUser,
    login,
    list,
    updatePassword,
    deleteUser,
    updateUser
}