import { FC, useCallback, useContext, useEffect, useState } from "react";
import "./css/Project.scss";
import { Navbar } from "../components/navbar/Navbar";
import { UserContext } from "../context/UserContext";
import { GET_PROJECT } from "../api";
import api from "../lib/axios";
import { useParams } from "react-router-dom";
import Loading from "../components/helper/Loading";
import Error from "../components/helper/Error";
import ScenariosList from "../components/scenario/ScenariosList";
import Button from "../components/forms/Button";
import { ProjectContext } from "../context/ProjectContext";
import SummaryWrapper from "../components/scenario/SummaryWrapper";
import EditPen from "../assets/icon/Edit.svg";
import { Modal } from "@mui/material";
import CreateSymbolForm from "../components/symbol/CreateSymbolForm";

const Project: FC = () => {
  const { isAuthenticated } = useContext(UserContext) || {};
  const { setProject, project } = useContext(ProjectContext || {});

  const [isCreateSymbolModalOpen, setIsCreateSymbolModalOpen] = useState(false);
  const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] = useState(false);
  const handleOpenCreateSymbolModal = () => setIsCreateSymbolModalOpen(true);
  const handleOpenCreateScenarioModal = () => setIsCreateScenarioModalOpen(true);
  const handleCloseCreateSymbolModal = () => setIsCreateSymbolModalOpen(false);
  const handleCloseCreateScenarioModal = () => setIsCreateScenarioModalOpen(false);

  const params = useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProjects = useCallback(async () => {
    setLoading(true);
    if (params?.id) {
      try {
        const { url, options } = GET_PROJECT(
          +params.id,
          isAuthenticated ? isAuthenticated().token : ""
        );
        const response = await api[options.method](url, options);
        setProject(response.data);
      } catch (error: any) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  }, [isAuthenticated, params.id, setProject]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);
  return (
    <>
      <Navbar navBg={true} />
      <div className="project">
        <div className="container">
          {loading && <Loading />}
          {error && <Error error={error} />}
          {!loading && !error && (
            <div className="project-info">
              <div className="project-name">
                <h1 className="project-name">{project?.name}</h1>
                <img src={EditPen} alt="Editar nome do projeto" />
              </div>
              <p className="project-description">
                {project?.description}
                <img src={EditPen} alt="Editar descrição do projeto" />
              </p>
            </div>
          )}
          <div className="scenarios-container">
            <div className="scenarios-container-header">
              <Button onClick={handleOpenCreateScenarioModal} theme="primary" text="Novo cenário"></Button>
              <Button onClick={handleOpenCreateSymbolModal} theme="secondary" text="Novo símbolo"></Button>
            </div>
            <div className="scenarios-content">
              <SummaryWrapper></SummaryWrapper>
              {project?.scenarios && (
                <ScenariosList scenarios={project?.scenarios} />
              )}
            </div>
          </div>
        </div>
        <Modal
          open={isCreateSymbolModalOpen}
          onClose={handleCloseCreateSymbolModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateSymbolForm/>
        </Modal>
        <Modal
          open={isCreateScenarioModalOpen}
          onClose={handleCloseCreateScenarioModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateSymbolForm/>
        </Modal>
      </div>
    </>
  );
};

export default Project;
