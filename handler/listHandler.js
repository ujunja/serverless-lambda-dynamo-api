const AWS = require("aws-sdk");

/** serverless.yml environment 参照 */
const LSWN_TABLE = process.env.LSWN_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.listHandler = (event, context, callback) => {
    const params = {
        TableName: LSWN_TABLE,
    }

    dynamoDbClient.scan(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        }
        callback(null, response);
    })
}