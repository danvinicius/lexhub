import React from "react";
import "./css/Home.scss";
import { Navbar } from "../components/navbar/Navbar";
import ProjectsList from "../components/home/ProjectsList";
import Banner from "../components/home/Banner";
import UpdatesList from "../components/home/UpdatesList";
import { UserContext } from "../context/UserContext";

const Home: React.FC = () => {
  const { user } = React.useContext(UserContext) || {};
  const firstName = user?.name.split(' ')[0]
  return (
    <>
      <Navbar navBg={true} />
      <div className="home">
        <Banner></Banner>
        <ProjectsList></ProjectsList>
        <div className="container">
          <h1>Bem-vindo, {firstName}</h1>
          <hr />
          <UpdatesList></UpdatesList>
        </div>
      </div>
    </>
  );
};

export default Home;
