import { movie } from "@/types/movie";
import { Link } from "react-router-dom";

const MovieCard = ({ data }: { data: movie }) => {
  return (
    <>
    <Link to={`/movie/${data?.id}`}>
      <div className="shadow-md rounded-md bg-white grid overflow-hidden">
        <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} />
        <div className="grid p-2">
          <div className="flex justify-between">
            <h2 className="truncate max-w-[130px] font-semibold">{data?.title}</h2>
            <p className="text-sm">{data?.popularity}</p>
          </div>
          <div className="line-clamp-2 text-sm text-gray-500">{data?.overview}</div>
        </div>
      </div>
    </Link>

    </>
  );
};
export default MovieCard;
