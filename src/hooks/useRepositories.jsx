import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedFilter) => {
  const filter = filterSelection(selectedFilter);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: filter,
  });

  return { repositories: data, loading, refetch };
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
