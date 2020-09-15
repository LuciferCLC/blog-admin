import { gql } from '@apollo/client';

export const GET_INFO = gql`
  query {
    getInfo @client {
      _id
      name
      username
      slogan
      gravatar
    }
  }
`;

export const GET_QINIU = gql`
  query {
    getQiniu {
      token
    }
  }
`;
