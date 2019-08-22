function extractIntentId(name) {
    let intentId = name.substring(name.lastIndexOf('/') + 1, name.length);
    return intentId;
}
export {
    extractIntentId
}