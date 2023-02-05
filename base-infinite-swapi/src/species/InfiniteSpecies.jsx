import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error... {error.toString()}</div>;

  return (
    <>
      {isFetchingNextPage && <div>데이터 더 불러오는 중...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map(({ results }, pageIdx) =>
          results.map(({ name, language, average_lifespan }, idx) => (
            <Species
              key={`specie-${pageIdx}-${idx}`}
              name={name}
              language={language}
              averageLifespan={average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
