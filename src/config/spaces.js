const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACE_SECRET_KEY,
  region: process.env.DO_SPACE_REGION,
});

module.exports = s3;

