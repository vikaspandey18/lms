import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/api/user/getuser")
      .then((response) => setUser(response.data.user))
      .catch((error) => console.log(error.response.data.msg));
  }, []);

  return (
    <>
      <Header />
      <HeroSection user={user} />
      <Footer />
    </>
  );
};
export default Home;
