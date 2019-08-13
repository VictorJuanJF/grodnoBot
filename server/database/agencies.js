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
                `select * from agencies inner join regions on agencies.region=regions.id where agency_name='${agencyName}'`,
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
const listAgencies = (callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select agency_name,region,schedule,address,reference,name from agencies inner join regions on agencies.region=regions.id`,
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
const createAgency = (agency, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `insert into agencies (agency_name,region,schedule,address,reference) values('${agency.agency_name}',${agency.region},'${agency.schedule}','${agency.address}','${agency.reference}');`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, true);
                    };
                    done();
                });

    });
}
const updateAgency = (agency, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `insert into agencies (agency_name,region,schedule,address,reference) values('${agency.agency_name}',${agency.region},'${agency.schedule}','${agency.address}','${agency.reference}');`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, true);
                    };
                    done();
                });

    });
}

module.exports = {
    getAgency,
    listAgencies,
    createAgency
}

// getAgency((response) => {
//     console.log("la respuesta es: ", response);
// }, 'AGENCIA CAYMA')