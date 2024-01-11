import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedFilter, queryValue) => {
  const filter = filterSelection(selectedFilter, queryValue);
  const variables = { ...filter, searchKeyword: queryValue, first: 3 };

  console.log(variables);
  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

const filterSelection = (filter) => {
  switch (filter) {
    case "highest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    case "lowest":
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    default:
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
};

export default useRepositories;
