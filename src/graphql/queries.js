import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
  query Me {
    me {
      username
    }
  }
`;
