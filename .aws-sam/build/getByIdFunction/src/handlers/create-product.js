const { randomUUID } = require('crypto');
const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const docClient = new DocumentClient();
const TableName = process.env.TABLE_NAME;

exports.handler = async event => {
  const eventBody = JSON.parse(event.body);

  try {
    const newProduct = {
      id: randomUUID(),
      name: eventBody.name,
      description: eventBody.description,
      price: eventBody.price
    };

    const params = { TableName, Item: newProduct };

    await docClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ product: newProduct })
    }
  } catch (error) {
    console.log(`Error while creating product: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error` })
    };
  }
}