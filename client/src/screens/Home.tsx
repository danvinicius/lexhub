import React from "react";
import "./css/Home.scss";
import { Navbar } from "../components/navbar/Navbar";
import ProjectsList from "../components/home/ProjectsList";
import Banner from "../components/home/Banner";
import NotificationsList from "../components/home/NotificationsList";

const Home: React.FC = () => {
  return (
    <>
      <Navbar navBg={true} />
      <div className="home">
        <Banner></Banner>
        <ProjectsList></ProjectsList>
        <div className="container">
          <h1>Bem-vindo, Daniel</h1>
          <hr />
          <NotificationsList></NotificationsList>
        </div>
      </div>
    </>
  );
};

export default Home;
