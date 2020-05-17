export default {
    s3: {
      REGION: "ap-southeast-1",
      BUCKET: "bookstore256",
      MAX_ATTACHMENT_SIZE: 5000000
    },
    apiGateway: {
      REGION: "ap-southeast-1",
      URL: "https://aef1nhb6nb.execute-api.ap-southeast-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "ap-southeast-1",
      USER_POOL_ID: "ap-southeast-1_F8mZr4S03",
      APP_CLIENT_ID: "33sf6v8lkvmvbf6c0qc7vnimja",
      IDENTITY_POOL_ID: "ap-southeast-1:93ce1db0-b5a6-449d-b393-b3dee2acd326"
    }
  };