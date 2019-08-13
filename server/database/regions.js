'use strict';
const config = require('../chatbot/config.js');
const pg = require('pg');
pg.defaults.ssl = true;

const listRegions = (callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select * from regions`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, result.rows);
                    };
                    done();
                });

    });
}

module.exports = {
    listRegions
}