"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.create = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "";
const create = async (event) => {
    const body = JSON.parse(event.body || "{}");
    const taskId = (0, uuid_1.v4)();
    const task = {
        userId: "demo-user", // TODO: Get from Cognito authorizer
        taskId,
        ...body,
        createdAt: new Date().toISOString(),
        status: "pending"
    };
    await docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: TABLE_NAME,
        Item: task
    }));
    return {
        statusCode: 201,
        body: JSON.stringify(task)
    };
};
exports.create = create;
const list = async (event) => {
    // TODO: Query by userId
    const result = await docClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: TABLE_NAME
    }));
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
};
exports.list = list;
