import { FaUser } from "react-icons/fa";
import { Button } from "./ui/Button";
import { FormEvent, useRef, useState } from "react";
import { useSession } from "../contexts/session-context";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isShow, setShow] = useState(false);
  const navigate = useNavigate();
  const idRef = useRef<HTMLInputElement | null>(null);

  const { login } = useSession();

  const makeLogin = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const id = Number(idRef.current?.value);
    if (id < 1 || id > 10) {
      setShow(true);
      return;
    } else {
      setShow(false);
      if (await login(id)) navigate("/albums");
    }
  };

  return (
    <form onSubmit={makeLogin}>
      <div className="flex flex-row gap-3 ">
        <div className="flex flex-row items-center border rounded-md border-red-300 p-3 gap-3 ">
          <FaUser />
          <input
            type="number"
            ref={idRef}
            placeholder="User ID는 1~10번만 가능합니다."
            className="focus:outline-none w-64"
          />
        </div>
        <Button type="submit">Sign In</Button>
      </div>
      {isShow && (
        <div className="text-red-600 font-bold ml-2">
          User ID는 1~10번만 가능합니다.
        </div>
      )}
    </form>
  );
};
