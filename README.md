# serverless-lambda-dynamo-apiは？

このプロジェクトは、SERVERLESS FRAMEWORKを使用してAPI Gateway - LambdaからDynamoDBにデータアプロード、変更、削除するAPIをデプロイするプロジェクトです。

# 環境変数
### ロカル環境の環境変数入力
- 「window + r」で実行画面を開く
- 「sysdm.cpl」入力して、システムのプロバディ画面に移動
- 詳細設定の環境変数をクリック
- ユーザー環境変数で新しい環境変数を入力

# 使用方法
### serverless frameworkインストール
```
npm install -g serverless
```
### node_modulesインストール
```
npm install
```
### デプロイ
```
serverless deploy --function {関数名} --stage {ステージ名} --region {リージョン名}
sls deploy --function {関数名} --stage {ステージ名} --region {リージョン名}
```
### スタック削除
```
serverless remove
sls remove
```
