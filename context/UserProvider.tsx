import { fetchCreateUser, fetchGetUser } from "fetch/user";
import User from "models/User";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery, QueryClient } from "react-query";

export const UserContext = React.createContext<{
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const useUser = () => React.useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = new QueryClient();
  useQuery("users", fetchGetUser, {
    onSuccess: (data) => {
      const findUser = data.find((u: User) => u.email == user?.email);
      if (!findUser) {
        fetchCreateUser({
          email: user?.email!,
          name: user?.name!,
        }).then((res) => {
          queryClient.invalidateQueries("users");
        });
      }
      setCurrentUser(findUser);
    },
  });

  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const value = React.useMemo(() => {
    return { currentUser, setCurrentUser };
  }, [currentUser, setCurrentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
