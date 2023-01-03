const AWS = require("aws-sdk");

/** serverless.yml environment 参照 */
const TABLE_NAME = process.env.TABLE_NAME;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.getHandler = (event, context, callback) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            // userId : DynamoDBのpartition=key, テンプレートファイルのresources参照
            // eventpathParameters : api gatewayを通じてもらうパースパラメータ
            // event.pathParameters.id : テンプレートファイルのgetにあるpath参照
            userId: event.pathParameters.id
        },
    }

    dynamoDbClient.get(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = data.Item
        ? {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        } : {
            statusCode: 404,
            body: JSON.stringify({message: "Todo not found"})
        }
        callback(null, response)
    })
}