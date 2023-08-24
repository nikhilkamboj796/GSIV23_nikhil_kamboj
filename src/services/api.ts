const BASE_URL = "https://api.themoviedb.org";

// Function to perform the actual fetch with common headers
const fetchWithHeaders = async (
  url: string,
  options?: RequestInit | undefined
) => {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzljMTJmM2EwOGU0ZWE5NWIyNmFlMTI5ZDEyOWYzYyIsInN1YiI6IjY0ZTQyNjYxNTI1OGFlMDEyY2EzMjM0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMECyqj6adxZGObSd-nVirPE8wkVbhQgpleCPEL77Y",
    "Content-Type": "application/json",
    // ...other headers
  };

  const response = await fetch(`${BASE_URL}/${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// React Query fetcher using the fetchWithHeaders function
const apiFetcher = async (url: string, options?: RequestInit | undefined) => {
  try {
    return await fetchWithHeaders(url, options);
  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};

export const fetchMovies = async (url: number) => {
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzljMTJmM2EwOGU0ZWE5NWIyNmFlMTI5ZDEyOWYzYyIsInN1YiI6IjY0ZTQyNjYxNTI1OGFlMDEyY2EzMjM0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UTMECyqj6adxZGObSd-nVirPE8wkVbhQgpleCPEL77Y",
    "Content-Type": "application/json",
    // ...other headers
  };

  try {
    const response = await fetch(`${BASE_URL}/3/movie/upcoming?page=${url+1}`, {

      headers,
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    
      return response.json();

  } catch (error) {
    throw new Error("An error occurred while fetching the data.");
  }
};
export default apiFetcher;
