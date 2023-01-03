const AWS = require("aws-sdk");

/** serverless.yml environment 参照 */
const TABLE_NAME = process.env.TABLE_NAME;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteHandler = (event, context, callback) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId: event.pathParameters.id
        },
    };

    dynamoDbClient.delete(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        };

        const response = {
            statusCode: 200,
            body: JSON.stringify("Delete Success")
        };
        callback(null, response);
    })
}