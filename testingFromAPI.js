const intent = [{
    "inputContextNames": [],
    "events": ["WELCOME"],
    "trainingPhrases": [{
        "parts": [{
            "text": "hola",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "94d9d1b4-b7b2-483a-86a3-560da03d4732",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }, {
        "parts": [{
            "text": "hey",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "657c634b-5c83-49b5-bc59-1390df2a36b0",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }, {
        "parts": [{
            "text": "saludos",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "b7d5355e-ea74-43e3-9556-7f3df0a77573",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }, {
        "parts": [{
            "text": "que tal",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "0e191b47-6fba-41fc-919c-96b5b6e8b6e1",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }, {
        "parts": [{
            "text": "chao",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "e46cee3c-7bd7-4f88-973c-613a784034dd",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }],
    "outputContexts": [],
    "parameters": [],
    "messages": [{
        "platform": "PLATFORM_UNSPECIFIED",
        "text": {
            "text": ["¡Hola! Para cualquier consulta escríbenos especificando los detalles de la misma. También puedes comunicarte a nuestro Call Center: (052) 583658 o acudir a la agencia más cercana."]
        },
        "message": "text"
    }, {
        "platform": "PLATFORM_UNSPECIFIED",
        "payload": {
            "fields": {
                "facebook": {
                    "structValue": {
                        "fields": {
                            "attachment": {
                                "structValue": {
                                    "fields": {
                                        "payload": {
                                            "structValue": {
                                                "fields": {
                                                    "buttons": {
                                                        "listValue": {
                                                            "values": [{
                                                                "structValue": {
                                                                    "fields": {
                                                                        "type": {
                                                                            "stringValue": "web_url",
                                                                            "kind": "stringValue"
                                                                        },
                                                                        "url": {
                                                                            "stringValue": "https://developers.facebook.com/docs/messenger-platform/send-messages/template/list",
                                                                            "kind": "stringValue"
                                                                        },
                                                                        "title": {
                                                                            "stringValue": "Enlace",
                                                                            "kind": "stringValue"
                                                                        }
                                                                    }
                                                                },
                                                                "kind": "structValue"
                                                            }]
                                                        },
                                                        "kind": "listValue"
                                                    },
                                                    "template_type": {
                                                        "stringValue": "button",
                                                        "kind": "stringValue"
                                                    },
                                                    "text": {
                                                        "stringValue": "✅ EJemplo:",
                                                        "kind": "stringValue"
                                                    }
                                                }
                                            },
                                            "kind": "structValue"
                                        },
                                        "type": {
                                            "stringValue": "template",
                                            "kind": "stringValue"
                                        }
                                    }
                                },
                                "kind": "structValue"
                            }
                        }
                    },
                    "kind": "structValue"
                }
            }
        },
        "message": "payload"
    }, {
        "platform": "PLATFORM_UNSPECIFIED",
        "text": {
            "text": ["Ubica nuestras agencias aquí:"]
        },
        "message": "text"
    }, {
        "platform": "PLATFORM_UNSPECIFIED",
        "text": {
            "text": ["¡Gracias por escribirnos!"]
        },
        "message": "text"
    }],
    "defaultResponsePlatforms": ["FACEBOOK"],
    "followupIntentInfo": [],
    "name": "projects/smart-ujcm-testing/agent/intents/f311c6f0-19d2-4684-994d-c2d6e6403488",
    "displayName": "Default Welcome Intent",
    "priority": 500000,
    "isFallback": false,
    "webhookState": "WEBHOOK_STATE_UNSPECIFIED",
    "action": "input.welcome",
    "resetContexts": false,
    "rootFollowupIntentName": "",
    "parentFollowupIntentName": "",
    "mlDisabled": false
}]

const multipleResponses = [{
    "inputContextNames": [],
    "events": [],
    "trainingPhrases": [{
        "parts": [{
            "text": "canales de la cmac ",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }, {
            "text": "tacna",
            "entityType": "@sys.ignore",
            "alias": "",
            "userDefined": false
        }],
        "name": "d06c2c90-193b-4a11-8141-c77a87326221",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }, {
        "parts": [{
            "text": "canales electrónicos",
            "entityType": "",
            "alias": "",
            "userDefined": false
        }],
        "name": "0534f2ce-0f90-400b-af7e-dc5727db6688",
        "type": "EXAMPLE",
        "timesAddedCount": 0
    }],
    "outputContexts": [],
    "parameters": [],
    "messages": [{
        "platform": "PLATFORM_UNSPECIFIED",
        "text": {
            "text": ["https://www.cmactacna.com.pe/Canales/TuCajaPorInternet", "https://www.cmactacna.com.pe/Canales/ServicajaVirtual", "https://www.cmactacna.com.pe/Canales/CajaTacnaApp", "https://www.cmactacna.com.pe/Canales/Kasnet", "https://www.cmactacna.com.pe/Canales/CMACMovil", "https://www.cmactacna.com.pe/Canales/BIM", "https://www.cmactacna.com.pe/Canales/Servifono", "https://www.cmactacna.com.pe/Canales/CallCenter", "https://www.cmactacna.com.pe/Canales/WesternUnion"]
        },
        "message": "text"
    }],
    "defaultResponsePlatforms": ["FACEBOOK"],
    "followupIntentInfo": [],
    "name": "projects/smart-ujcm-testing/agent/intents/a636aaef-0135-4662-9fc8-8640235e8ee7",
    "displayName": "Canales.tipos",
    "priority": 500000,
    "isFallback": false,
    "webhookState": "WEBHOOK_STATE_UNSPECIFIED",
    "action": "",
    "resetContexts": false,
    "rootFollowupIntentName": "",
    "parentFollowupIntentName": "",
    "mlDisabled": false
}]


/////////////////response format
const response = [{
    "responseId": "2643c5b8-a32b-4ce9-8c2e-cab60c336ba7-712767ed",
    "queryResult": {
        "fulfillmentMessages": [{
            "platform": "FACEBOOK",
            "text": {
                "text": ["Para despejar tus dudas sobre el producto en el cual estás interesado, tan solo escribe a la siguiente dirección de correo electrónico para poder asesorarte debidamente:\n\nAtencion_al_Usuario_Caja_Tacna@cmactacna.com.pe\n\nAsimismo, puedes visitar el siguiente enlace para conocer más sobre los beneficios del producto en cuestión:"]
            },
            "message": "text"
        }, {
            "platform": "FACEBOOK",
            "text": {
                "text": ["https://www.cmactacna.com.pe/Ahorros/Corriente"]
            },
            "message": "text"
        }, {
            "platform": "PLATFORM_UNSPECIFIED",
            "text": {
                "text": ["Para despejar tus dudas sobre el producto en el cual estás interesado, tan solo escribe a la siguiente dirección de correo electrónico para poder asesorarte debidamente:\n\nAtencion_al_Usuario_Caja_Tacna@cmactacna.com.pe\n\nAsimismo, puedesvisitar el siguiente enlace para conocer más sobre los beneficios del producto en cuestión:"]
            },
            "message": "text"
        }, {
            "platform": "PLATFORM_UNSPECIFIED",
            "text": {
                "text": ["https://www.cmactacna.com.pe/Ahorros/Corriente"]
            },
            "message": "text"
        }],
        "outputContexts": [],
        "queryText": "cts",
        "speechRecognitionConfidence": 0,
        "action": "",
        "parameters": {
            "fields": {}
        },
        "allRequiredParamsPresent": true,
        "fulfillmentText": "Para despejar tus dudas sobre el producto en el cual estás interesado, tan solo escribe a la siguiente dirección de correo electrónico para poder asesorarte debidamente:\n\nAtencion_al_Usuario_Caja_Tacna@cmactacna.com.pe\n\nAsimismo, puedes visitar el siguiente enlace para conocer más sobre los beneficios del producto en cuestión:",
        "webhookSource": "",
        "webhookPayload": null,
        "intent": {
            "inputContextNames": [],
            "events": [],
            "trainingPhrases": [],
            "outputContexts": [],
            "parameters": [],
            "messages": [],
            "defaultResponsePlatforms": [],
            "followupIntentInfo": [],
            "name": "projects/smart-ujcm-testing/agent/intents/f8eab162-04aa-4359-b3f1-fdf83519c34a",
            "displayName": "Ahorros.tipos",
            "priority": 0,
            "isFallback": false,
            "webhookState": "WEBHOOK_STATE_UNSPECIFIED",
            "action": "",
            "resetContexts": false,
            "rootFollowupIntentName": "",
            "parentFollowupIntentName": "",
            "mlDisabled": false
        },
        "intentDetectionConfidence": 1,
        "diagnosticInfo": null,
        "languageCode": "es"
    },
    "webhookStatus": null
}, null, null]