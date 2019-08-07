const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('./config.js');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: 'nuevo intent',
                // The language used by the client (en-US)
                languageCode: 'es',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    console.log("el resultado es: ",
        responses);
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
}
async function createIntent(
    projectId,
    displayName,
    trainingPhrasesParts,
    messageTexts
) {
    console.log("empezando la creacion del intent");
    // [START dialogflow_create_intent]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates the Intent Client
    const intentsClient = new dialogflow.IntentsClient();

    // The path to identify the agent that owns the created intent.
    const agentPath = intentsClient.projectAgentPath(projectId);

    const trainingPhrases = [];

    trainingPhrasesParts.forEach(trainingPhrasesPart => {
        const part = {
            text: trainingPhrasesPart,
        };

        // Here we create a new training phrase for each provided part.
        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: [part],
        };

        trainingPhrases.push(trainingPhrase);
    });
    console.log("el listado de frases entrenadas: ", trainingPhrases);

    const messageText = {
        text: messageTexts,
    };

    const message = {
        text: messageText,
    };

    const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message, message],
    };

    console.log("las respuestas son: ", JSON.stringify(message));

    const createIntentRequest = {
        parent: agentPath,
        intent: intent,
    };

    // Create the intent
    const responses = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${responses[0].name} created`);
    // [END dialogflow_create_intent]
}

async function deleteIntent(projectId, intentId) {
    console.log("Empezando eliminacion de intent");
    // [START dialogflow_delete_intent]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const intentsClient = new dialogflow.IntentsClient();

    const intentPath = intentsClient.intentPath(projectId, intentId);

    const request = {
        name: intentPath
    };

    // Send the request for deleting the intent.
    const result = await intentsClient.deleteIntent(request);
    console.log(`Intent ${intentPath} deleted`);
    return result;
    // [END dialogflow_delete_intent]
}

async function listIntents(projectId) {
    // [START dialogflow_list_intents]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const intentsClient = new dialogflow.IntentsClient();

    // The path to identify the agent that owns the intents.
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    const request = {
        parent: projectAgentPath,
    };

    console.log(projectAgentPath);

    // Send the request for listing intents.
    const [response] = await intentsClient.listIntents(request);
    response.forEach(intent => {
        console.log('====================');
        console.log(`Intent name: ${intent.name}`);
        console.log(`Intent display name: ${intent.displayName}`);
        console.log(`Action: ${intent.action}`);
        console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
        console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

        console.log('Input contexts:');
        intent.inputContextNames.forEach(inputContextName => {
            console.log(`\tName: ${inputContextName}`);
        });

        console.log('Output contexts:');
        intent.outputContexts.forEach(outputContext => {
            console.log(`\tName: ${outputContext.name}`);
        });
    });
    // [END dialogflow_list_intents]
}

async function listEntities(projectId, entityTypeId) {
    // [START dialogflow_create_entity]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient();

    // The path to the agent the entity types belong to.
    const entityTypePath = entityTypesClient.entityTypePath(
        projectId,
        entityTypeId
    );

    // The request.
    const request = {
        name: entityTypePath,
    };

    // Call the client library to retrieve a list of all existing entity types.
    const [response] = await entityTypesClient.getEntityType(request);
    response.entities.forEach(entity => {
        console.log(`Entity value: ${entity.value}`);
        console.log(`Entity synonyms: ${entity.synonyms}`);
    });
    return response;
    // [END dialogflow_create_entity]
}

async function deleteEntity(projectId, entityTypeId, entityValue) {
    // [START dialogflow_delete_entity]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient();

    // The path to the agent the entity types belong to.
    const entityTypePath = entityTypesClient.entityTypePath(
        projectId,
        entityTypeId
    );

    const request = {
        parent: entityTypePath,
        entityValues: [entityValue],
    };

    // Call the client library to delete the entity type.
    await entityTypesClient.batchDeleteEntities(request);
    console.log(`Entity Value ${entityValue} deleted`);
    // [END dialogflow_delete_entity]
}

async function listEntities(projectId, entityTypeId) {
    console.log("Empezando listado de entities");
    // [START dialogflow_create_entity]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient();

    // The path to the agent the entity types belong to.
    const entityTypePath = entityTypesClient.entityTypePath(
        projectId,
        entityTypeId
    );

    // The request.
    const request = {
        name: entityTypePath,
    };

    // Call the client library to retrieve a list of all existing entity types.
    const [response] = await entityTypesClient.getEntityType(request);
    response.entities.forEach(entity => {
        console.log(`Entity value: ${entity.value}`);
        console.log(`Entity synonyms: ${entity.synonyms}`);
    });
    return response;
    // [END dialogflow_create_entity]
}

async function listEntityTypes(projectId) {
    // [START dialogflow_list_entity_types]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');

    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient();

    // The path to the agent the entity types belong to.
    const agentPath = entityTypesClient.projectAgentPath(projectId);

    const request = {
        parent: agentPath,
    };

    // Call the client library to retrieve a list of all existing entity types.
    const [response] = await entityTypesClient.listEntityTypes(request);
    response.forEach(entityType => {
        console.log(`Entity type name: ${entityType.name}`);
        console.log(`Entity type display name: ${entityType.displayName}`);
        console.log(`Number of entities: ${entityType.entities.length}\n`);
    });
    return response;
    // [END dialogflow_list_entity_types]
}

listEntityTypes(config.GOOGLE_PROJECT_ID, )

// listIntents(config.GOOGLE_PROJECT_ID);

// deleteIntent(config.GOOGLE_PROJECT_ID, 'a238ad5c-2801-4d2d-8596-d5063436957a');

// createIntent(config.GOOGLE_PROJECT_ID, 'AmiIntentDesdeApi6', ['Hola que tal', 'Como estas', 'Brus Harper'], [
//     'que pasa', 'como te va',
// ]);

// console.log(process.env);
// console.log("ejecutando ejemplo con el id: ", config.GOOGLE_PROJECT_ID);
// runSample(config.GOOGLE_PROJECT_ID);