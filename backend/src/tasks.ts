import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "";

export const create: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const taskId = uuidv4();
  const task = {
    userId: "demo-user", // TODO: Get from Cognito authorizer
    taskId,
    ...body,
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: task
  }));

  return {
    statusCode: 201,
    body: JSON.stringify(task)
  };
};

export const list: APIGatewayProxyHandler = async (event) => {
  // TODO: Query by userId
  const result = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  };
};
