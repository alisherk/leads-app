/* Amplify Params - DO NOT EDIT
	API_LEADSAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_LEADSAPP_GRAPHQLAPIIDOUTPUT
	API_LEADSAPP_GRAPHQLAPIKEYOUTPUT
	API_LEADSAPP_USERTABLE_ARN
	API_LEADSAPP_USERTABLE_NAME
	AUTH_LEADSAPP9AA0EB849AA0EB84_USERPOOLID
	ENV
	REGION
	STORAGE_S39F7E601D_BUCKETNAME
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const CognitoISP = new aws.CognitoIdentityServiceProvider();

exports.handler = async ({ arguments: { email } }) => {
    const response = CognitoISP.adminCreateUser({
      UserPoolId: process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID,
      Username: email,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'email_verified',
          Value: 'True'
        }
      ],
      TemporaryPassword: Math.random().toString(36).substr(2, 6),
      MessageAction: 'RESEND'
    }).promise();
  
    return response;
  };