import apiFetcher from "@/services/api";
import HomeIcon from "@/assets/homeIcon.webp";
import { movieDetailsApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  let { id } = useParams();
  const getMovieDetailsQuery = useQuery({
    queryKey: ["movieDetails"],
    queryFn: () => apiFetcher(movieDetailsApiUrl + id),
    enabled: id ? true : false,
  });
  const getMovieCreditsQuery = useQuery({
    queryKey: ["movieCredits"],
    queryFn: () => apiFetcher(movieDetailsApiUrl + id + "/credits"),
    enabled: id ? true : false,
  });
  return (
    <div className="lg:flex grid gap-5">
      <div className="fixed top-0 left-0 right-0 px-5 py-2 bg-white shadow-lg flex justify-between items-center">
        <h3>Movie Details</h3>
        <Link to="/">
          <img src={HomeIcon} />
        </Link>
      </div>
      <picture>
        <source
          media="(max-width: 799px)"
          srcSet={`https://image.tmdb.org/t/p/w500${getMovieDetailsQuery?.data?.poster_path}`}
        />
        <source
          media="(min-width: 800px)"
          srcSet={`https://image.tmdb.org/t/p/w200${getMovieDetailsQuery?.data?.poster_path}`}
        />
        <img
          src={`https://image.tmdb.org/t/p/w200${getMovieDetailsQuery?.data?.poster_path}`}
        />
      </picture>
      <div className="grid gap-2">
        <div className="flex gap-2 items-center">
          <h3 className="font-semibold">{getMovieDetailsQuery?.data?.title}</h3>
          <p>{getMovieDetailsQuery?.data?.popularity}</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>{getMovieDetailsQuery?.data?.release_date}</p>|
          <p>{getMovieDetailsQuery?.data?.runtime}</p>|
          <p>
            {
              getMovieCreditsQuery?.data?.cast?.find(
                (item: any) => item.job === "Director"
              )?.name
            }
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span>Cast:</span>
          <p>
            {getMovieCreditsQuery?.data?.cast
              ?.splice(0, 3)
              .map((item: any) => item.name)
              .join(", ")}
          </p>
        </div>
        <p>{getMovieDetailsQuery?.data?.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
