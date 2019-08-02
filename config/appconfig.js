let appConfig = {}

appConfig.port = 3000;
appConfig.allowedCorsOrigin = '*';
appConfig.env = 'dev';
appConfig.db = {

url: 'mongodb://127.0.0.1:27017/rtro'
}
appConfig.apiVersion = 'api/v1'
appConfig.accessKeyId = 'AKIA5GTZHQA2G6GM6ZE5',
appConfig.secretAccessKey = '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'

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion,
    accessKeyId: appConfig.accessKeyId,
    secretAccessKey: appConfig.secretAccessKey
}
