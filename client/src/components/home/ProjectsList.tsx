import Button from "../forms/Button";
import "./ProjectsList.scss";
import ChevronRight from '../../assets/icon/ChevronRight.svg'

const ProjectsList = () => {
  return (
    <section className="projectsListContainer">
      <h1>Bem-vindo, Daniel</h1>
      <div className="projectsListContainerHeader">
        <h2>Seus projetos</h2>
        <Button text="Criar projeto"></Button>
      </div>
      <ul className="projectsList">
        <li>
          <div className="project">
            <div className="projectImage"></div>
            <div className="projectContent">
              <p className="projectName">Project alfa</p>
              <p className="projectDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
            <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="project">
            <div className="projectImage"></div>
            <div className="projectContent">
              <p className="projectName">Project bravo</p>
              <p className="projectDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
            <img src={ChevronRight} alt="" />
          </div>
        </li>
        <li>
          <div className="project">
            <div className="projectImage"></div>
            <div className="projectContent">
              <p className="projectName">Project charlie</p>
              <p className="projectDescription">
                Lorem ipsum, dolor sit amet consectetur adipisicing, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa.
              </p>
            </div>
            <img src={ChevronRight} alt="" />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ProjectsList;
