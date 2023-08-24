import HomeIcon from "@/assets/homeIcon.webp";
import MovieCard from "@/components/movieCard";
import apiFetcher from "@/services/api";
import { movie } from "@/types/movie";
import { searchMoviesApiUrl, upcomingMoviesApiUrl } from "@/utils/constants";
import useDebounce from "@/utils/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useSearchParams } from "react-router-dom";

const MovieList = () => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams?.get("query");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["upcomingMovies"],
      queryFn: ({ pageParam = 0 }) =>
        apiFetcher(`${upcomingMoviesApiUrl}?page=${pageParam + 1}`),
      getNextPageParam: (lastPage) =>
        lastPage.page <= lastPage.total_pages && lastPage.page,
      enabled: !searchQuery,
    });

  const {
    data: searchedData,
    fetchNextPage: fetchNextSearchedQueryPage,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage: searchIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchMovies"],
    queryFn: ({ pageParam = 0 }) =>
      apiFetcher(
        `${searchMoviesApiUrl}?query=${searchQuery}&page=${pageParam + 1}`
      ),
    getNextPageParam: (lastPage) =>
      lastPage.page <= lastPage.total_pages && lastPage.page,
    enabled: !!searchQuery,
  });

  const [, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 2000); // Adjust the delay as needed

  // This function will be triggered after the debounce completes
  const handleDebouncedChange = (debouncedValue: string) => {
    // Perform your desired action here, e.g., API call, state update, etc.
    setSearchParams({ query: debouncedValue });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleDebouncedChange(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value);
  };

  useEffect(() => {
    if (inView) {
      searchQuery ? fetchNextSearchedQueryPage() : fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-5">
      <div className="fixed top-0 left-0 right-0 px-5 py-2 bg-white shadow-lg flex justify-between items-center">
        <input
          onChange={handleInputChange}
          className="bg-lightGray rounded px-2 py-1 outline-none border-none focus:ring-gray-500"
          type="text"
        />
        <Link to="/">
          <img src={HomeIcon} />
        </Link>
      </div>

      {(searchQuery ? searchedData?.pages : data?.pages)?.map((page) =>
        page.results.map((item: movie) => (
          <MovieCard key={item.id} data={item} />
        ))
      )}

      <div ref={ref}>
        {" "}
        {isFetchingNextPage ||
        hasNextPage ||
        searchIsFetchingNextPage ||
        searchHasNextPage
          ? "Loading more items.............F"
          : "No more data available"}
      </div>
    </div>
  );
};

export default MovieList;
