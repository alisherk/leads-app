/* Amplify Params - DO NOT EDIT
	API_LEADSAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_LEADSAPP_GRAPHQLAPIIDOUTPUT
	API_LEADSAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_LEADSAPP9AA0EB849AA0EB84_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const CognitoISP = new aws.CognitoIdentityServiceProvider();

exports.handler = async ({
    arguments: { groups: newGroups, id },
    identity: { groups: requestorGroups }
  }) => {
    if (!requestorGroups.includes('Admin')) throw new Error('Unauthorized');
  
    const poolId = process.env.AUTH_LEADSMANAGEMENTSYS71FD0E2271FD0E22_USERPOOLID;
  
    let { Groups: oldGroups } = await CognitoISP.adminListGroupsForUser({
      UserPoolId: poolId,
      Username: id
    }).promise();
  
    oldGroups = oldGroups.reduce(
      (accumulator, { GroupName }) => accumulator.concat(GroupName),
      []
    );
  
    await Promise.all(
      [].concat(
        // adding user to new groups
        newGroups.map(group => {
          if (oldGroups.includes(group)) return null;
  
          return CognitoISP.adminAddUserToGroup({
            UserPoolId: poolId,
            Username: id,
            GroupName: group
          }).promise();
        }),
        // removing user from groups
        oldGroups.map(group => {
          if (newGroups.includes(group)) return null;
  
          return CognitoISP.adminRemoveUserFromGroup({
            UserPoolId: poolId,
            Username: id,
            GroupName: group
          }).promise();
        })
      )
    );
  
    return { status: 'success' };
  };