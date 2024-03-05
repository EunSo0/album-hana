import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "../contexts/session-context";
import { useFetch } from "../hooks/fetch";
import { Button } from "./ui/Button";
import clsx from "clsx";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export type AlbumType = {
  userId: number;
  id: number;
  title: string;
};

export const Albums = () => {
  const navigate = useNavigate();
  const {
    session: { loginUser },
  } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectId, setSelectId] = useState<string | null>(
    searchParams.get("selectId")
  );

  const {
    data: albums,
    isLoading,
    error,
  } = useFetch<AlbumType[]>({
    url: `${BASE_URL}/albums?userId=${loginUser?.id}`,
    dependencies: [loginUser?.id],
    defaultData: [],
  });

  const goToDetail = () => {
    if (selectId) navigate(`/albums/${selectId}`);
    else return;
  };

  const setParams = (id: string) => {
    searchParams.set("selectId", id);
    setSearchParams(searchParams);
    setSelectId(id);
  };

  return (
    <>
      <>
        {isLoading && <h1>Fetching Lists...</h1>}
        {error && <h3 style={{ color: "red" }}>Error: {error}</h3>}
        <div className="flex flex-row items-center px-3">
          <div className="font-bold text-lg mr-5">앨범 목록</div>
          <Button onClick={goToDetail}>앨범 상세보기</Button>
        </div>
        <div className="m-2 items-center">
          {albums?.map((album) => (
            <Album
              key={album.id}
              album={album}
              selectId={selectId}
              setParams={setParams}
            />
          ))}
        </div>
      </>
    </>
  );
};

const Album = ({
  album,
  selectId,
  setParams,
}: {
  album: AlbumType;
  selectId: string | null;
  setParams: (id: string) => void;
}) => {
  return (
    <li className="p-2 un-list">
      <button
        onClick={() => setParams(album.id.toString())}
        className={clsx(Number(selectId) === album.id && "active")}
      >
        {album.id}. {album.title}
      </button>
    </li>
  );
};
