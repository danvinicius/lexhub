import Button from "../forms/Button";
import "./ProjectsList.scss";
import ChevronRight from "../../assets/icon/ChevronRight.svg";
import { UserContext } from "../../context/UserContext";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { IProject } from "../../shared/interfaces";
import { GET_PROJECTS } from "../../api";
import api from "../../lib/axios";
import Loading from "../helper/Loading";
import Error from "../helper/Error";

const ProjectsList = () => {
  const { isAuthenticated } = React.useContext(UserContext) || {};

  const [projects, setProjects] = React.useState<IProject[]>([]);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { url, options } = GET_PROJECTS(isAuthenticated ? isAuthenticated().token : '');
      const response = await api[options.method](url, options);
      setProjects(response.data);
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <section className="projectsListContainer">
      <h1>Bem-vindo, Daniel</h1>
      <div className="projectsListContainerHeader">
        <h2>Seus projetos</h2>
        <Link to="/projeto/criar">
          <Button text="Criar projeto"></Button>
        </Link>
      </div>
      <ul className="projectsList">
        {error && <Error error={error}/>}
        {loading && <Loading/>}
        {!error && !loading && projects?.length ? (
          projects.map((project: IProject) => {
            return (
              <li key={project.id}>
                <div className="project">
                  <div className="projectImage"></div>
                  <div className="projectContent">
                    <p className="projectName">{project.name}</p>
                    <p className="projectDescription">{project.description}</p>
                  </div>
                  <img src={ChevronRight} alt="" />
                </div>
              </li>
            );
          })
        ) : (
          <span className="noProjects">Você ainda não possui projetos</span>
        )}
      </ul>
    </section>
  );
};

export default ProjectsList;
