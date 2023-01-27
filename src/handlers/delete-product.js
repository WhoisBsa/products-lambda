const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const docClient = new DocumentClient();
const TableName = process.env.TABLE_NAME;

exports.handler = async event => {
  const productId = event.pathParameters.id;


  try {
    const params = { TableName, Key: {id: productId}};

    await docClient.delete(params).promise();

    return {
      statusCode: 204,
      body: null,
    }
  } catch (error) {
    console.log(`Error while deleting product: ${productId}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error` })
    }
  }
}