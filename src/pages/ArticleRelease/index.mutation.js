import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: Title
    $keyword: Keyword
    $content: Content
    $publish: Publish
    $tag: Tag
  ) {
    updateArticle(
      articleInfo: {
        title: $title
        keyword: $keyword
        content: $content
        publish: $publish
        tag: $tag
      }
    ) {
      title
      keyword
      content
      publish
      tag
    }
  }
`;
