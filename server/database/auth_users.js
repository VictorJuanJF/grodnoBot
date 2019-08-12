'use strict';
const request = require('request');
const config = require('../chatbot/config.js');
const pg = require('pg');
pg.defaults.ssl = true;
//bcrypt options
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const login = (user, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        bcrypt.hash(user.password, saltRounds).then(function(hash) {
            client
                .query(
                    `select * from auth_users where email='${user.email}'`,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            callback(null, result.rows[0]);
                        };
                        done();
                    });
        });
    });
    //pool.end();
}

const registerUser = (user, callback) => {
    var pool = new pg.Pool(config.PG_CONFIG);
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        bcrypt.hash(user.password, saltRounds).then(function(hash) {
            client
                .query(
                    `insert into auth_users(first_name,last_name,email,password,role,status) values('${user.first_name}','${user.last_name}','${user.email}','${hash}','${user.role}','${user.status}')`,
                    function(err, result) {
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

module.exports = {
    registerUser,
    login
}