import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
      first: 8,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 8,
      },
    });
  };

  return { repository: data?.repository, loading, fetchMore: handleFetchMore };
};

export default useRepository;
