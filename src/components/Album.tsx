import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/fetch";
import { Button } from "./ui/Button";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type AlbumDetailType = {
  userId: number;
  id: number;
  title: string;
};
type ImageType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const Album = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: album,
    isLoading: albumLoading,
    error: albumError,
  } = useFetch<AlbumDetailType>({
    url: `${BASE_URL}/albums/${id}`,
    dependencies: [id],
  });

  const {
    data: photos,
    isLoading: photosLoading,
    error: photosError,
  } = useFetch<ImageType[]>({
    url: `${BASE_URL}/photos?albumId=${id}`,
    dependencies: [id],
  });

  return (
    <>
      {(albumLoading || photosLoading) && <h1>Fetching Albums...</h1>}
      {albumError ||
        (photosError && <h3 style={{ color: "red" }}>Error: {albumError}</h3>)}
      {album && (
        <>
          <div className="font-bold text-xl">{album.title}</div>
          <div className="grid grid-cols-4 gap-4 my-3">
            {photos &&
              photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                />
              ))}
          </div>
        </>
      )}
      <Button onClick={() => navigate(-1)} className="my-3">
        뒤로
      </Button>
    </>
  );
};
