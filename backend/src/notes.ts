import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "";

export const create: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const noteId = uuidv4();
  const note = {
    userId: "demo-user", // TODO: Get from Cognito
    noteId,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: note
  }));

  return {
    statusCode: 201,
    body: JSON.stringify(note)
  };
};

export const list: APIGatewayProxyHandler = async (event) => {
  const result = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  };
};

export const get: APIGatewayProxyHandler = async (event) => {
  const noteId = event.pathParameters?.id;
  const result = await docClient.send(new GetCommand({
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
