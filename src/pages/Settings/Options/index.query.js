import { gql } from '@apollo/client';

export const GET_OPTIONS = gql`
  query {
    getOptions {
      _id
      sub_title
      title
      email
      icp
      descript
      keyword
      url
    }
  }
`;
