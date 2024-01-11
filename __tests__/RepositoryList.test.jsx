import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../src/components/RepositoryList";

describe("RepositoryListContainer", () => {
  const repositories = {
    repositories: {
      edges: [
        {
          node: {
            description: "Description 1",
            forksCount: 10,
            fullName: "Full Name 1",
            language: "Language 1",
            ownerAvatarUrl: "Avatar URL 1",
            stargazersCount: 20,
            ratingAverage: 4.5,
            reviewCount: 30,
          },
        },
        {
          node: {
            description: "Description 2",
            forksCount: 5,
            fullName: "Full Name 2",
            language: "Language 2",
            ownerAvatarUrl: "Avatar URL 2",
            stargazersCount: 15,
            ratingAverage: 3.5,
            reviewCount: 25,
          },
        },
        {
          node: {
            description: "Description 3",
            forksCount: 8,
            fullName: "Full Name 3",
            language: "Language 3",
            ownerAvatarUrl: "Avatar URL 3",
            stargazersCount: 18,
            ratingAverage: 4.0,
            reviewCount: 28,
          },
        },
      ],
    },
  };

  it("renders repository items correctly", () => {
    const { getByText } = render(
      <RepositoryListContainer repositories={repositories} />
    );

    expect(getByText("Full Name 1")).toBeTruthy();
    expect(getByText("Full Name 2")).toBeTruthy();
    expect(getByText("Full Name 3")).toBeTruthy();
  });

  it("renders empty list when no repositories are provided", () => {
    const { queryByText } = render(
      <RepositoryListContainer repositories={null} />
    );

    expect(queryByText("Full Name 1")).toBeNull();
    expect(queryByText("Full Name 2")).toBeNull();
    expect(queryByText("Full Name 3")).toBeNull();
  });

  it("renders the correct amount of repository items by testID repositoryItem", () => {
    const { getAllByTestId } = render(
      <RepositoryListContainer repositories={repositories} />
    );

    const repositoryItems = getAllByTestId("repositoryItem");
    expect(repositoryItems).toHaveLength(
      repositories.repositories.edges.length
    );
  });
});
