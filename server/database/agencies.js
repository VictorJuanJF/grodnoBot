'use strict';
const config = require('../chatbot/config.js');
const pg = require('pg');
pg.defaults.ssl = true;

const getAgency = (callback, agencyName) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select schedule from agencies where agency_name='${agencyName}'`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(null);
                    } else {
                        callback(result.rows[0]);
                    };
                    done();
                });

    });
    //pool.end();
}

module.exports = {
    getAgency
}

// getAgency((response) => {
//     console.log("la respuesta es: ", response);
// }, 'AGENCIA CAYMA')