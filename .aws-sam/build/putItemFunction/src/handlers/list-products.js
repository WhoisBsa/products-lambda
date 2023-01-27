const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const docClient = new DocumentClient();
const TableName = process.env.TABLE_NAME;

exports.handler = async _event => {

  try {
    const params = { TableName };
    const data = await docClient.scan(params).promise();
    const items = data.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(items)
    };
  }
  catch (error) {
    console.log(`Error while listing products: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error` })
    };
  }
};