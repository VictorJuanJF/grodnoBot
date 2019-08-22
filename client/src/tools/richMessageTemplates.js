import {
    jsonToStructProto
} from "./structFunctions";

function messageTemplate() {
    return {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
            text: ["Nuevo mensaje"]
        },
        message: "text"
    };
}
const genericTemplate = () => {
    return {
        platform: "PLATFORM_UNSPECIFIED",
        payload: jsonToStructProto({
            facebook: {
                attachment: {
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "Créditos",
                            buttons: [{
                                payload: "boton 01",
                                type: "postback",
                                title: "boton 01"
                            }, {
                                type: "postback",
                                title: "boton 02",
                                payload: "boton 02"
                            }, {
                                title: "boton 03",
                                payload: "boton 03",
                                type: "postback"
                            }],
                            subtitle: "Contamos con las siguientes opciones",
                            image_url: "http://4.bp.blogspot.com/-_QCxfa0Jjv4/U1h7FRoJnAI/AAAAAAAAAYg/lbU-uWs5T-M/s1600/cpa-school-test.png"
                        }]
                    },
                    type: "template"
                }
            }
        }),
        message: "payload"
    }
}
const quickReplyTemplate = () => {
    return {
        platform: "PLATFORM_UNSPECIFIED",
        payload: jsonToStructProto({
            facebook: {
                text: "Ejemplo",
                quick_replies: [{
                    content_type: "text",
                    title: "iniciar sesion",
                    payload: "login_payload",
                    image_url: ""
                }, {
                    content_type: "text",
                    title: "registro",
                    payload: "registro_payload",
                    image_url: ""
                }]
            }
        }),
        message: "payload"
    }
}
const buttonTemplate = () => {
    return {
        platform: "PLATFORM_UNSPECIFIED",
        payload: jsonToStructProto({
            facebook: {
                attachment: {
                    payload: {
                        buttons: [{
                            url: "https://developers.facebook.com/docs/messenger-platform/send-messages/template/list",
                            title: "boton ejemplo",
                            type: "web_url"
                        }],
                        template_type: "button",
                        text: "Es obligatorio un mensaje junto al boton ⬇"
                    },
                    type: "template"
                }
            }
        }),
        message: "payload"
    }
}

export {
    messageTemplate,
    genericTemplate,
    quickReplyTemplate,
    buttonTemplate
}