'use strict';
const request = require('request');
const config = require('../chatbot/config');
const moment = require('moment');
const pg = require('pg');
pg.defaults.ssl = true;


const addUser = function(callback, userId) {
    request({
        uri: 'https://graph.facebook.com/v2.7/' + userId,
        qs: {
            access_token: config.FB_PAGE_TOKEN
        }

    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var user = JSON.parse(body);
            if (user.first_name.length > 0) {

                var pool = new pg.Pool(config.PG_CONFIG);
                pool.connect(function(err, client, done) {
                    if (err) {
                        return console.error('Error acquiring client', err.stack);
                    }
                    var rows = [];
                    var date = moment().format();
                    let sql1 = `SELECT id FROM users WHERE fb_id='${userId}' LIMIT 1`;
                    client
                        .query(sql1,

                            function(err, result) {
                                // done();
                                if (err) {
                                    callback(err);
                                    console.log('Query error: ' + err);

                                } else {
                                    if (result.rows.length === 0) {
                                        console.log('Agregando usuario a bd');
                                        let sql = 'INSERT INTO users (fb_id, first_name, last_name, profile_pic, ' +
                                            'fec_registro) VALUES ($1, $2, $3, $4, $5)';
                                        client.query(sql, [
                                            userId,
                                            user.first_name,
                                            user.last_name,
                                            user.profile_pic,
                                            date
                                        ], (err2, result2) => {
                                            if (err) {
                                                callback(err2);
                                                console.log('Query error: ' + err2);
                                            } else {
                                                callback(null, user);
                                            }

                                        });
                                    } else {
                                        callback(null, result.rows[0]);
                                    }
                                }

                            });
                    done();

                });
                // pool.end(function (err) {
                //      if (err) throw err;

                //     process.exit();
                ///  });
            } else {
                console.log("Cannot get data for fb user with id",
                    userId);
            }
        } else {
            console.error(response.error);
        }

    });
}

const readAllUsers = (callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        console.log('Se entro a readAllUsers de user.js');
        client
            .query(
                'SELECT fb_id, first_name, last_name FROM users WHERE newsletter=1',
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback([]);
                    } else {
                        console.log('rows');
                        console.log(result.rows);
                        callback(result.rows);
                    };
                    done();
                });

    });
    //pool.end();
}

const getPrivacyPolicyStatus = function(userId, callback) {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        client
            .query(
                `select privacy_policy_status from users where fb_id='${userId}'`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        console.log("se buscara la politica del usuario: ", userId);
                        callback(null, result.rows[0].privacy_policy_status);
                    };
                    done();
                });

    });
}

const updatePrivacyPolicyStatus = (userId) => {
    return new Promise((resolve, reject) => {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    `update users set privacy_policy_status=true where fb_id='${userId}'`,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(true);
                        };
                        done();
                    });

        });
    });
}

module.exports = {
    addUser,
    readAllUsers,
    getPrivacyPolicyStatus,
    updatePrivacyPolicyStatus
}