import Button from "../forms/Button";
import "./ProjectsList.scss";
import ChevronRight from "../../assets/icon/ChevronRight.svg";
import { UserContext } from "../../context/UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProject } from "../../shared/interfaces";
import { GET_PROJECTS } from "../../api";
import api from "../../lib/axios";
import Loading from "../helper/Loading";
import Error from "../helper/Error";

const ProjectsList = () => {
  const { isAuthenticated } = useContext(UserContext) || {};

  const [projects, setProjects] = useState<IProject[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { url, options } = GET_PROJECTS(
        isAuthenticated ? isAuthenticated().token : ""
      );
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
    <section className="projects-list-container">
      <h1>Bem-vindo, Daniel</h1>
      <div className="projects-list-container-header">
        <div>
          <h2>Seus projetos</h2>
          {projects.length > 5 && 
          <Link to="/projetos">
            <span className="action">Ver todos</span>
          </Link>
          }
        </div>
        <Link to="/projeto/criar">
          <Button theme="primary" text="Criar projeto"></Button>
        </Link>
      </div>
      <ul className="projectsList">
        {error && <Error error={error} />}
        {loading && <Loading />}
        {!error && !loading && projects?.length ? (
          projects.slice(0, 5).map((project: IProject) => {
            return (
              <li key={project.id}>
                <Link to={`/projeto/${project.id}`}>
                  <div className="project">
                    <div className="projectImage"></div>
                    <div className="projectContent">
                      <p className="project-name">{project.name}</p>
                      <p className="project-description">
                        {project.description}
                      </p>
                    </div>
                    <img src={ChevronRight} alt="" />
                  </div>
                </Link>
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
