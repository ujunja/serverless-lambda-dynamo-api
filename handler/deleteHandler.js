const AWS = require("aws-sdk");

/** serverless.yml environment 参照 */
const LSWN_TABLE = process.env.LSWN_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteHandler = (event, context, callback) => {
    const params = {
        TableName: LSWN_TABLE,
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

deleteHandler