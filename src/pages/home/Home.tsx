import { useLogout } from "../../hooks/useLogout";
export const Home = () => {
  const { logout } = useLogout();
  return (
    <button className="bg-black" onClick={logout}>
      Home
    </button>
  );
};
