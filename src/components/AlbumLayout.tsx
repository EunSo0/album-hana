import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/session-context";
import { Button } from "./ui/Button";

export const AlbumLayout = () => {
  const navigate = useNavigate();
  const {
    session: { loginUser },
    logout,
  } = useSession();

  const goToLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="flex justify-between items-center p-5 bg-red-300 text-white rounded-xl">
        <div className="font-bold text-xl my-3">Hanaro Album</div>
        <div className="flex items-center">
          {loginUser && (
            <>
              <div className="font-bold text-gray-600 gap-1">
                {loginUser.id} {loginUser.name}
              </div>

              <Button className="ml-3" onClick={goToLogout}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-col justify-center items-center my-3">
        <Outlet />
      </div>
    </>
  );
};
