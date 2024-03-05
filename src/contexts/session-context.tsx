/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type SessionContextProps = {
  session: Session;
  login: (id: number) => Promise<boolean>;
  logout: () => void;
};
type ProviderProps = {
  children: ReactNode;
};
type Action =
  | {
      type: "login" | "logout";
      payload: LoginUser | null;
    }
  | { type: "set"; payload: Session };

const SKEY = "session";
const DefaultSession: Session = {
  loginUser: null,
};

function setStorage(session: Session) {
  localStorage.setItem(SKEY, JSON.stringify(session));
}
function getStorage() {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) {
    return JSON.parse(storedData) as Session;
  }

  setStorage(DefaultSession);
  return DefaultSession;
}

const SessionContext = createContext<SessionContextProps>({
  session: { loginUser: null },
  login: () => Promise.resolve(false),
  logout: () => {},
});

const reducer = (session: Session, { type, payload }: Action) => {
  let newer;

  switch (type) {
    case "set":
      newer = { ...payload };
      break;
    case "login":
    case "logout":
      newer = { loginUser: payload };
      break;

    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

export const SessionProvider = ({ children }: ProviderProps) => {
  const [session, dispatch] = useReducer(reducer, DefaultSession);

  const login = useCallback(async (userId: number) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`);
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      const { id, name, username } = await res.json();
      dispatch({ type: "login", payload: { id, name, username } });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: null });
  }, []);

  useEffect(() => {
    dispatch({ type: "set", payload: getStorage() });
  }, []);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
