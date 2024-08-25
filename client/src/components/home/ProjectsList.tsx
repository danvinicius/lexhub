import Button from "../forms/Button";
import "./ProjectsList.scss";
import ChevronRight from '../../assets/icon/ChevronRight.svg'
import { UserContext } from "../../context/UserContext";
import React from "react";
import { UserProject } from "../../interfaces/Project";

const ProjectsList = () => {
  const {user} = React.useContext(UserContext) || {};
  return (
    <section className="projectsListContainer">
      <h1>Bem-vindo, Daniel</h1>
      <div className="projectsListContainerHeader">
        <h2>Seus projetos</h2>
        <Button text="Criar projeto"></Button>
      </div>
      <ul className="projectsList">
        {user?.projects?.length ? user?.projects.map((up: UserProject) => {
          return (
            <li key={up?.project?.id}>
            <div className="project">
              <div className="projectImage"></div>
              <div className="projectContent">
                <p className="projectName">{up?.project?.name}</p>
                <p className="projectDescription">
                  {up?.project?.description}
                </p>
              </div>
              <img src={ChevronRight} alt="" />
            </div>
          </li>
          )
        }) : <span className="noProjects">Você ainda não possui projetos</span>}
      </ul>
    </section>
  );
};

export default ProjectsList;
