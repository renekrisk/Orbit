"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.list = exports.create = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "";
const create = async (event) => {
    const body = JSON.parse(event.body || "{}");
    const noteId = (0, uuid_1.v4)();
    const note = {
        userId: "demo-user", // TODO: Get from Cognito
        noteId,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    await docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: TABLE_NAME,
        Item: note
    }));
    return {
        statusCode: 201,
        body: JSON.stringify(note)
    };
};
exports.create = create;
const list = async (event) => {
    const result = await docClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: TABLE_NAME
    }));
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
};
exports.list = list;
const get = async (event) => {
    const noteId = event.pathParameters?.id;
    const result = await docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: TABLE_NAME,
        Key: {
            userId: "demo-user",
            noteId
        }
    }));
    if (!result.Item) {
        return { statusCode: 404, body: JSON.stringify({ error: "Note not found" }) };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
};
exports.get = get;
