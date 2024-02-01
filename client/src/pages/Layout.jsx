import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const loader = async () => {
  try {
    const response = await axios.get("/api/user/getuser");
    const userdata = response.data.user;
    return userdata;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const Layout = () => {
  const user = useLoaderData();

  return (
    <UserContext.Provider value={{ username: user.name, userid: user._id }}>
      <Header />
      <Outlet />
      <Footer />
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);

export default Layout;
