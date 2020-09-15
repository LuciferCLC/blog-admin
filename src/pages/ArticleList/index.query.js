import { gql } from '@apollo/client';

export const GET_ARTICLE = gql`
  query getArticle(
    $offset: Float!
    $limit: Float!
    $keyword: String
    $state: ArticleState
  ) {
    getArticles(
      offset: $offset
      limit: $limit
      keyword: $keyword
      state: $state
    ) {
      total
      limit
      offset
      docs {
        _id
        title
        state
        tag {
          name
        }
        publish
        keyword
        descript
        type
        create_at
      }
    }
  }
`;
