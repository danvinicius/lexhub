import './Scenario.scss';
import { ILexiconScenario, IUserRole } from '../../shared/interfaces';
import { useHelpers } from '../../hooks/useHelpers';
import { useLexicon } from '../../hooks/useLexicon';
import KebabVertical from '../../assets/icon/Kebab_Vertical.svg';
import Plus from '../../assets/icon/Plus.svg';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { CreateResourceForm } from './resource/CreateResourceForm';
import { ScenarioActionsOptionsMenu } from './ScenarioActionsOptionsMenu';
import UpdateScenarioForm from './UpdateScenarioForm';
import DeleteScenarioForm from './DeleteScenarioForm';
import EditPen from '../../assets/icon/Edit.svg';
import { CreateRestrictionForm } from './restriction/CreateRestrictionForm';
import { ProjectContext } from '../../context/ProjectContext';
import { CreateEpisodesForm } from './episodes/CreateEpisodesForm';
import { UserContext } from '../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import ErrorIcon from '@mui/icons-material/Error';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RoomIcon from '@mui/icons-material/Room';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import FlagIcon from '@mui/icons-material/Flag';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

interface IScenarioProps {
    scenario: ILexiconScenario;
}

const Scenario: FC<IScenarioProps> = ({ scenario }: IScenarioProps): ReactNode => {
	const { slugify } = useHelpers();
	const { processContent } = useLexicon();
	const { project } = useContext(ProjectContext);

	const { isAuthenticated } = useContext(UserContext) || {};
	const [isCollaborator, setIsCollaborator] = useState(false);

	useEffect(() => {
		const role = isAuthenticated()?.projects.find((someProject) => someProject.project == project?.id)?.role;
		setIsCollaborator(role == IUserRole.OWNER || role == IUserRole.ADMIN || role == IUserRole.COLLABORATOR);
	}, [isAuthenticated, project?.id]);

	const [isCreateResourceModalOpen, setIsCreateResourceModalOpen] = useState(false);

	const [isCreateRestrictionModalOpen, setIsCreateRestrictionModalOpen] = useState(false);

	const [isCreateEpisodesModalOpen, setIsCreateEpisodesModalOpen] = useState(false);

	const handleOpenCreateEpisodesModal = () => {
		setIsCreateEpisodesModalOpen(true);
	};
	const handleCloseCreateEpisodesModal = () => {
		setIsCreateEpisodesModalOpen(false);
	};

	const handleOpenCreateRestriction = (resourceId?: string, episodeId?: string) => {
		setRestrictionResourceId(resourceId);
		setRestrictionEpisodeId(episodeId);
		setIsCreateRestrictionModalOpen(true);
	};

	const handleCloseCreateRestriction = () => {
		setRestrictionResourceId('');
		setRestrictionEpisodeId('');
		setIsCreateRestrictionModalOpen(false);
	};

	const [restrictionResourceId, setRestrictionResourceId] = useState<string | undefined>('');
	const [, setRestrictionEpisodeId] = useState<string | undefined>('');

	const [isScenarioActionsOptionsMenuOpen, setIsScenarioActionsOptionsMenuOpen] = useState(false);

	const [isEditScenarioModalOpen, setIsEdiScenarioModalOpen] = useState(false);

	const [isDeleteScenarioModalOpen, setIsDeleteScenarioModalOpen] = useState(false);

	const handleCloseDeleteScenarioModal = () => setIsDeleteScenarioModalOpen(false);
	const handleOpenDeleteScenarioModal = () => {
		setIsDeleteScenarioModalOpen(true);
		setIsScenarioActionsOptionsMenuOpen(false);
	};

	const handleCloseEditScenarioModal = () => setIsEdiScenarioModalOpen(false);
	const handleOpenUpdateScenarioModal = () => {
		setIsEdiScenarioModalOpen(true);
		setIsScenarioActionsOptionsMenuOpen(false);
	};
	const handleCloseUpdateScenarioModal = () => setIsScenarioActionsOptionsMenuOpen(false);

	return (
		<div className='scenario' id={`${scenario.id}-${slugify(scenario.title.content)}`}>
			<div className='scenario-header'>
				<h2>{processContent(scenario.title)}</h2>
				{isCollaborator && (
					<>
						<img
							src={KebabVertical}
							alt=''
							className='scenario-options-button'
							onClick={() => setIsScenarioActionsOptionsMenuOpen(true)}
						/>
						<div className='scenario-options'>
							{isScenarioActionsOptionsMenuOpen && (
								<ScenarioActionsOptionsMenu
									handleOpenUpdateScenarioModal={handleOpenUpdateScenarioModal}
									handleCloseUpdateScenarioModal={handleCloseUpdateScenarioModal}
									setIsScenarioActionsOptionsMenuOpen={setIsScenarioActionsOptionsMenuOpen}
									isScenarioActionsOptionsMenuOpen={isScenarioActionsOptionsMenuOpen}
									handleOpenDeleteScenarioModal={handleOpenDeleteScenarioModal}
								/>
							)}
						</div>
					</>
				)}
			</div>
			<section className='scenario-details'>
				<div className='flex column gap-5'>
					<div className='flex gap-5 border-none'>
						<FlagIcon />
						<h3>Objetivo</h3>
					</div>
					<p>{processContent(scenario.goal)}</p>
				</div>
				<div className='flex column gap-2'>
					<div className='flex gap-5 border-none'>
						<LanguageIcon />
						<h3>Contexto</h3>
					</div>
					<div className='scenario-context'>
						<div style={{maxWidth: 1200}}>
							<table className='scenario-context-details'>
								<tbody>
									<tr>
										<th>
											<div className='flex gap-5 border-none'>
												<CheckBoxIcon />
												<p>Pré-condição</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<RoomIcon />
												<p>Localização geográfica</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<CalendarMonthIcon />
												<p>Localização temporal</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<LockIcon />
												<p>Restrições</p>
											</div>
										</th>
									</tr>
									<tr>
										<td>{processContent(scenario.context?.preCondition)}</td>
										<td>{processContent(scenario.context?.geographicLocation)}</td>
										<td>{processContent(scenario.context?.temporalLocation)}</td>
										<td className='restrictions'>
											{isCollaborator && (
												<span className='add-restriction' onClick={() => handleOpenCreateRestriction()}>
													{scenario.context.restrictions.length > 0 ? (
														<>
                                                    Gerenciar restrições <img src={EditPen} alt='' />
														</>
													) : (
														<>
                                                    Cadastrar restrições <img src={Plus} alt='' />{' '}
														</>
													)}
												</span>
											)}
											{scenario.context.restrictions.length > 0 && (
												<ul>
													{scenario.context?.restrictions?.map((restriction) => {
														return (
															<li key={restriction.description.content}>{processContent(restriction.description)}</li>
														);
													})}
												</ul>
											)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='flex column gap-5'>
					<div className='flex gap-5 border-none'>
						<PeopleAltIcon />
						<h3>Atores</h3>
					</div>
					<div className='scenario-actors'>
						{scenario.actors?.length ? (
							<ul>
								{scenario.actors?.map((actor) => {
									return <li key={actor.name.content}>{processContent(actor.name)}</li>;
								})}
							</ul>
						) : (
							<p>N/A</p>
						)}
					</div>
				</div>
				<div className='flex column gap-5'>
					<div className='flex gap-5 border-none'>
						<ErrorIcon />
						<h3>Exceções</h3>
					</div>
					<div className='scenario-exceptions'>
						{scenario.exceptions?.length ? (
							<ul>
								{scenario.exceptions?.map((exception) => {
									return <li key={exception.description.content}>{processContent(exception.description)}</li>;
								})}
							</ul>
						) : (
							<p>N/A</p>
						)}
					</div>
				</div>
				<div className='flex column gap-2'>
					<div className="flex gap-2">
						<div className='flex gap-5 border-none'>
							<HomeRepairServiceIcon />
							<h3>Recursos</h3>
						</div>
						<div className='scenario-resources'>
							{isCollaborator && (
								<span className='add-resource' onClick={() => setIsCreateResourceModalOpen(true)}>
									{scenario.resources.length > 0 ? (
										<>
                                    Gerenciar recursos <img src={EditPen} alt='' />
										</>
									) : (
										<>
                                    Cadastrar recursos <img src={Plus} alt='' />{' '}
										</>
									)}
								</span>
							)}
						</div>
					</div>
					{scenario.resources.length > 0 && (
						<div style={{maxWidth: 1200}}>
							<table className='scenario-resources-details'>
								<tbody>
									<tr>
										<th>
											<div className='flex gap-5 border-none'>
												<HomeRepairServiceIcon />
												<p>Recurso</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<LockIcon />
												<p>Restrições</p>
											</div>
										</th>
									</tr>
									{scenario.resources?.map((resource) => {
										return (
											<tr key={resource.name.content}>
												<td>{processContent(resource.name)}</td>
												<td className='restrictions'>
													{isCollaborator && (
														<span
															className='add-restriction'
															onClick={() => handleOpenCreateRestriction(resource.id)}
														>
															{resource.restrictions?.length > 0 ? (
																<>
                                                                Gerenciar restrições <img src={EditPen} alt='' />
																</>
															) : (
																<>
                                                                Cadastrar restrições <img src={Plus} alt='' />{' '}
																</>
															)}
														</span>
													)}
													{resource.restrictions?.length > 0 && (
														<ul>
															{resource.restrictions?.map((restriction) => {
																return (
																	<li key={restriction.description.content}>
																		{processContent(restriction.description)}
																	</li>
																);
															})}
														</ul>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
				<div className='flex column gap-2'>
					<div className="flex gap-2">
						<div className='flex gap-5 border-none'>
							<ChecklistIcon />
							<h3>Episódios</h3>
						</div>
						<div className='scenario-episodes'>
							{isCollaborator && (
								<span className='add-episode' onClick={handleOpenCreateEpisodesModal}>
									{scenario.episodes.length > 0 ? (
										<>
                                    Gerenciar episódios <img src={EditPen} alt='' />
										</>
									) : (
										<>
                                    Cadastrar episódios <img src={Plus} alt='' />{' '}
										</>
									)}
								</span>
							)}
						</div>
					</div>
					{scenario.episodes.length > 0 && (
						<div style={{maxWidth: 1200}}>
							<table className='scenario-episodes-details'>
								<tbody>
									<tr>
										<th style={{width: 50}}>
											<div className='flex gap-5 border-none'>
												<FormatListNumberedIcon />
												<p>Posição</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<DescriptionIcon />
												<p>Descrição</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<LockIcon />
												<p>Restrição</p>
											</div>
										</th>
										<th>
											<div className='flex gap-5 border-none'>
												<LocalOfferIcon />
												<p>Tipo</p>
											</div>
										</th>
									</tr>
									{scenario.episodes?.map((episode) => {
										return (
											<tr key={episode.position}>
												<td>
													{episode.position} &nbsp;
													{episode?.nonSequentialEpisodes && <small>(grupo de episódios)</small>}
												</td>
												{episode?.nonSequentialEpisodes ? (
													<td colSpan={4}>
														<table style={{width: '100%'}}>
															<tbody>
																{episode.nonSequentialEpisodes?.map((nse) => {
																	return (
																		<tr key={nse.id} style={{border: 'none'}}>
																			<td style={{maxWidth: 500}}>{processContent(nse.description)}</td>
																			<td>{processContent(nse.restriction)}</td>
																			<td >{nse.type}</td>
																		</tr>
																	);
																})}
															</tbody>
														</table>
													</td>
												) : (
													<td>{processContent(episode.description)}</td>
												)}
												{episode?.restriction && <td>{processContent(episode.restriction)}</td>}
												{episode?.type && <td>{episode.type}</td>}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</section>
			<Modal
				open={isEditScenarioModalOpen}
				onClose={handleCloseEditScenarioModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<UpdateScenarioForm
					onClose={handleCloseEditScenarioModal}
					scenario={scenario ? scenario : ({} as ILexiconScenario)}
					projectId={scenario.projectId}
				/>
			</Modal>
			<Modal
				open={isDeleteScenarioModalOpen}
				onClose={handleCloseDeleteScenarioModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<DeleteScenarioForm
					onClose={handleCloseDeleteScenarioModal}
					scenario={scenario ? scenario : ({} as ILexiconScenario)}
					projectId={scenario.projectId}
				/>
			</Modal>
			<Modal
				open={isCreateResourceModalOpen}
				onClose={() => setIsCreateResourceModalOpen(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<CreateResourceForm onClose={() => setIsCreateResourceModalOpen(false)} scenarioId={scenario.id} />
			</Modal>
			<Modal
				open={isCreateRestrictionModalOpen}
				onClose={handleCloseCreateRestriction}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<CreateRestrictionForm
					resourceId={restrictionResourceId}
					onClose={handleCloseCreateRestriction}
					scenarioId={scenario.id}
					projectId={project?.id || ''}
				/>
			</Modal>
			<Modal
				open={isCreateEpisodesModalOpen}
				onClose={handleCloseCreateEpisodesModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<CreateEpisodesForm
					onClose={handleCloseCreateEpisodesModal}
					scenarioId={scenario.id}
					initialEpisodes={scenario.episodes.map((e) => ({
						id: e.id || uuidv4(),
						description: e.description?.content,
						type: e.type,
						position: e.position,
						restriction: e.restriction?.content,
						nonSequentialEpisodes: e.nonSequentialEpisodes?.map(nse => ({
							id: nse.id || uuidv4(),
							description: nse.description.content,
							type: nse.type,
							restriction: nse.restriction.content
						}))
					}))}
				/>
			</Modal>
		</div>
	);
};

export default Scenario;
