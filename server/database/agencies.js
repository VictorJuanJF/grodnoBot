'use strict';
const config = require('../chatbot/config.js');
const pg = require('pg');
pg.defaults.ssl = true;

const getAgency = (callback, agencyName) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select * from agencias inner join regiones on agencias.region=regions.id where nombre='${agencyName}'`,
                function (err, result) {
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
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select agencias.id as agency_id,agencias.nombre as agency_name,region,horario as schedule,direccion as address,referencia as reference,regiones.nombre as name,sinonimos as synonyms from agencias inner join regiones on agencias.region=regiones.id where agencias.estado='1' ORDER BY regiones.nombre ASC`,
                function (err, result) {
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
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `insert into agencias (nombre,region,horario,direccion,referencia,sinonimos,estado) values('${agency.agency_name}',${agency.region},'${agency.schedule}','${agency.address}','${agency.reference}','${agency.synonyms}','${agency.status}');`,
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
}
const updateAgency = (id, agency, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `update agencias set direccion='${agency.address}',nombre='${agency.agency_name}',referencia='${agency.reference}',region='${agency.region}',horario='${agency.schedule}',sinonimos='${agency.synonyms}' where id='${id}'`,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(null, agency);
                    };
                    done();
                });
    });
}

const deleteAgency = (id, callback) => {
    console.log("se eliminara el id: ", id);
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `update agencias set estado='0' where id='${id}'`,
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

const listAgenciesByRegion = (region, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select agencias.nombre as agency_name,direccion as address from agencias inner join regiones on agencias.region=regiones.id where regiones.nombre='${region}'`,
                function (err, result) {
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
    getAgency,
    listAgencies,
    createAgency,
    listAgenciesByRegion,
    deleteAgency,
    updateAgency
}

// listAgencies((err, response) => {
//     console.log("la respuesta es: ", response);
// })