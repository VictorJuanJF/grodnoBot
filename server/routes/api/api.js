const express = require('express');
const router = express.Router();
const {
    listIntents,
    updateIntent
} = require('../../chatbot/dialogFlowApiFunctions')
const axios = require('axios');

//chatbot

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
                payload: callback
            });
        });
    } catch (e) {
        console.log("hubo un error:", e);
        // next(e);
    }
});



module.exports = router;