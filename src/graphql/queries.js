import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          description
          forksCount
          id
          fullName
          language
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ratingAverage
      ownerAvatarUrl
      forksCount
      description
      fullName
      language
      reviewCount
      stargazersCount
      url
      id
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repositoryId
          }
        }
      }
    }
  }
`;
