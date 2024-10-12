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
import UserAdd from "../assets/icon/User_Add.svg";
import Kebab from "../assets/icon/Kebab_Vertical.svg";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import CreateSymbolForm from "../components/symbol/CreateSymbolForm";
import CreateScenarioForm from "../components/scenario/CreateScenarioForm";
import { IProject, IUserProject } from "../shared/interfaces";
import EditProjectForm from "../components/project/EditProjectForm";
import { ProjectActionsOptionsMenu } from "../components/project/ProjectActionsOptionsMenu";
import DeleteProjectForm from "../components/project/DeleteProjectForm";
import SymbolsList from "../components/symbol/SymbolsList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ display: value !== index ? "none" : "block", width: "100%" }}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "1rem 0rem", width: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Project: FC = () => {
  const { isAuthenticated } = useContext(UserContext) || {};
  const { setProject, project, setSymbol } = useContext(ProjectContext || {});
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSymbol(null);
    setCurrentTab(newValue);
  };

  const owner = project?.users.find(
    (userProject: IUserProject) => userProject.role == "OWNER"
  )?.user;
  const [isProjectActionsOptionsMenu, setIsProjectActionsOptionsMenu] =
    useState(false);

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [isCreateSymbolModalOpen, setIsCreateSymbolModalOpen] = useState(false);
  const [isCreateScenarioModalOpen, setIsCreateScenarioModalOpen] =
    useState(false);
  const handleOpenCreateSymbolModal = () => setIsCreateSymbolModalOpen(true);
  const handleOpenCreateScenarioModal = () =>
    setIsCreateScenarioModalOpen(true);
  const handleCloseCreateSymbolModal = () => setIsCreateSymbolModalOpen(false);
  const handleCloseCreateScenarioModal = () =>
    setIsCreateScenarioModalOpen(false);
  const handleOpenEditProjectModal = () => {
    setIsEditProjectModalOpen(true);
    setIsProjectActionsOptionsMenu(false);
  };
  const handleCloseEditProjectModal = () => setIsEditProjectModalOpen(false);
  const handleCloseDeleteProjectModal = () =>
    setIsDeleteProjectModalOpen(false);
  const handleOpenDeleteProjectModal = () => {
    setIsDeleteProjectModalOpen(true);
    setIsProjectActionsOptionsMenu(false);
  };
  const params = useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProjects = useCallback(async () => {
    setLoading(true);
    if (params?.id) {
      try {
        const { url, options } = GET_PROJECT(
          params.id,
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
      <div className="project" id="project">
        <div className="container">
          {loading && <Loading />}
          {error && <Error error={error} />}
          {!loading && !error && (
            <div className="project-info">
              <div className="project-header">
                <h1 className="project-name">{project?.name}</h1>
                <div className="project-options">
                  <img src={UserAdd} alt="Compartilhar projeto" />
                  <img
                    src={Kebab}
                    alt="Abrir opções do projeto"
                    onClick={() => setIsProjectActionsOptionsMenu(true)}
                  />
                  {isProjectActionsOptionsMenu && (
                    <ProjectActionsOptionsMenu
                      handleOpenEditProjectModal={handleOpenEditProjectModal}
                      handleCloseEditProjectModal={handleCloseEditProjectModal}
                      setIsProjectActionsOptionsMenu={
                        setIsProjectActionsOptionsMenu
                      }
                      isProjectActionsOptionsMenu={isProjectActionsOptionsMenu}
                      handleOpenDeleteProjectModal={
                        handleOpenDeleteProjectModal
                      }
                    />
                  )}
                </div>
                <div className="buttons-container">
                  <Button
                    onClick={handleOpenCreateScenarioModal}
                    theme="primary"
                    text="Novo cenário"
                  ></Button>
                  <Button
                    onClick={handleOpenCreateSymbolModal}
                    theme="secondary"
                    text="Novo símbolo"
                  ></Button>
                </div>
              </div>
              <p className="project-description">{project?.description}</p>
              {owner && (
                <small className="project-owner">
                  Criado por {owner.name} em{" "}
                  {new Date(project?.createdAt).toLocaleDateString("pt-br")} às{" "}
                  {new Date(project?.createdAt).toLocaleTimeString("pt-br")}
                </small>
              )}
            </div>
          )}
          <div className="scenarios-container">
            <Box sx={{ width: "100%", padding: 0 }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  padding: 0,
                  width: "100%",
                }}
              >
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    ".Mui-selected": {
                      color: "var(--primary-color) !important", // Cor da aba ativa
                    },
                    ".MuiTabs-indicator": {
                      backgroundColor: "var(--primary-color) !important", // Cor da barra abaixo da aba ativa
                    },
                  }}
                >
                  <Tab label="Cenários" {...a11yProps(0)} />
                  <Tab label="Símbolos" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <div className="scenarios-content">
                {currentTab == 0 && (
                  <>
                    <SummaryWrapper></SummaryWrapper>
                    <CustomTabPanel value={currentTab} index={0}>
                      {project?.scenarios && (
                        <ScenariosList scenarios={project?.scenarios} />
                      )}
                    </CustomTabPanel>
                  </>
                )}
                {currentTab == 1 && (
                  <CustomTabPanel value={currentTab} index={1}>
                    {project?.symbols && (
                      <SymbolsList symbols={project?.symbols} />
                    )}
                  </CustomTabPanel>
                )}
              </div>
            </Box>
          </div>
        </div>
        <Modal
          open={isEditProjectModalOpen}
          onClose={handleCloseEditProjectModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditProjectForm
            onClose={handleCloseEditProjectModal}
            project={project ? project : ({} as IProject)}
          />
        </Modal>
        <Modal
          open={isDeleteProjectModalOpen}
          onClose={handleCloseDeleteProjectModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DeleteProjectForm
            onClose={handleCloseDeleteProjectModal}
            project={project ? project : ({} as IProject)}
          />
        </Modal>
        <Modal
          open={isCreateScenarioModalOpen}
          onClose={handleCloseCreateScenarioModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateScenarioForm onClose={handleCloseCreateScenarioModal} />
        </Modal>
        <Modal
          open={isCreateSymbolModalOpen}
          onClose={handleCloseCreateSymbolModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateSymbolForm onClose={handleCloseCreateSymbolModal} />
        </Modal>
      </div>
    </>
  );
};

export default Project;
