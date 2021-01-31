/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLead = /* GraphQL */ `
  subscription OnCreateLead {
    onCreateLead {
      id
      firstName
      lastName
      gender
      profilePicture
      createdAt
      updatedAt
      addresses {
        items {
          id
          type
          country
          state
          line1
          line2
          leadId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateLead = /* GraphQL */ `
  subscription OnUpdateLead {
    onUpdateLead {
      id
      firstName
      lastName
      gender
      profilePicture
      createdAt
      updatedAt
      addresses {
        items {
          id
          type
          country
          state
          line1
          line2
          leadId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteLead = /* GraphQL */ `
  subscription OnDeleteLead {
    onDeleteLead {
      id
      firstName
      lastName
      gender
      profilePicture
      createdAt
      updatedAt
      addresses {
        items {
          id
          type
          country
          state
          line1
          line2
          leadId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
      id
      type
      country
      state
      line1
      line2
      leadId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
      id
      type
      country
      state
      line1
      line2
      leadId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
      id
      type
      country
      state
      line1
      line2
      leadId
      createdAt
      updatedAt
    }
  }
`;
