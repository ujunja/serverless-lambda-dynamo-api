const AWS = require("aws-sdk");

/** serverless.yml environment 参照 */
const LSWN_TABLE = process.env.LSWN_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

/** serverless.yml fuctionsのhandler 参照 　*/
exports.createHandler = (event, context, callback) => {

    /** 
     * new Date()はあまりお勧めしません。下記のリンクを参考してください。
     * https://www.youtube.com/watch?v=CSWc0HYjxEs */
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.todo !== "string") {
        console.log("validation Failed");
        return;
    }
    /** time based uuid 生成 */
    const keyId = uuid.v1();
    const params = {
        TableName: LSWN_TABLE,
        Item: {
            userId: keyId,
            todo: data.todo,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }

    // data = params
    dynamoDbClient.put(params, function(error, data) {
        if (error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        }
        callback(null, response);
    });
}