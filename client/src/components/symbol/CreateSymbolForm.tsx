import { FC, FormEvent, KeyboardEvent, ReactNode, useContext, useState } from 'react';
import Input from '../forms/Input';
import useForm from '../../hooks/useForm';
import Form from '../forms/Form';
import Loading from '../helper/Loading';
import Button from '../forms/Button';
import Error from '../helper/Error';
import api from '../../lib/axios';
import { CREATE_SYMBOL } from '../../api';
import { UserContext } from '../../context/UserContext';
import './CreateSymbolForm.scss';
import Select from '../forms/Select';
import { useSelect } from '../../hooks/useSelect';
import { AddImpactComboBox } from './impact/AddImpactComboBox';
import { AddSynonymComboBox } from './synonym/AddSynonymComboBox';
import Close from '../../assets/icon/Close_Dark.svg';
import { ProjectContext } from '../../context/ProjectContext';
import { ErrorResponse } from '../../shared/interfaces';
import { AxiosError } from 'axios';

interface CreateSymbolRequestDTO {
  name: string;
  notion: string;
  classification: string;
  synonyms: {
    name: string;
  }[];

  impacts: {
    description: string;
  }[];
  projectId: string;
}

interface CreateSymbolFormProps {
  onClose: () => void;
  resetProjectInfo: () => void;
}

const CreateSymbolForm: FC<CreateSymbolFormProps> = ({ onClose, resetProjectInfo }: CreateSymbolFormProps): ReactNode => {
	const { isAuthenticated } = useContext(UserContext || {});

	const name = useForm('dontValidateName');
	const notion = useForm('dontValidateNotion');
	const classification = useSelect('dontValidateClassification');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const [impacts, setImpacts] = useState<string[]>([]);
	const [synonyms, setSynonyms] = useState<string[]>([]);
	
	const [currentImpact, setCurrentImpact] = useState('');
	const [currentSynonym, setCurrentSynonym] = useState('');

	const projectContext = useContext(ProjectContext);

	const createSymbol = async (body: CreateSymbolRequestDTO) => {
		setLoading(true);
		if (projectContext.project?.id) {
			try {
				const { url, options } = CREATE_SYMBOL(
					projectContext.project.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				resetProjectInfo();
			} catch (error) {
				const err = error as AxiosError<ErrorResponse>;
				setError(err?.response?.data?.error || 'Erro inesperado');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (name.validate() && notion.validate() && classification.validate()) {
			if (projectContext.project?.id) {
				createSymbol({
					name: name.value,
					notion: notion.value,
					classification: classification.value,
					projectId: projectContext.project.id,
					impacts: [...impacts, currentImpact.length ? currentImpact : null].filter(impact => impact != null).map((impact: string) => ({
						description: impact,
					})),
					synonyms: [...synonyms, currentSynonym.length ? currentSynonym : null].filter(synonym => synonym != null).map((synonym: string) => ({
						name: synonym,
					})),
				});
			}
		}
	};

	return (
		<section className="create-symbol-form flex column gap-125">
			<div className="create-symbol-form-header">
				<h2>Novo símbolo</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<br />
			<Form>
				<Input
					type="text"
					name="name"
					placeholder="Usuário do sistema"
					label="Nome"
					autoFocus
					{...name}
					onInput={() => setError('')}
					onKeyDown={(e: KeyboardEvent) => {
						e.key === 'Enter' && e.preventDefault();
					}}
				/>
				<Input
					type="text"
					name="notion"
					placeholder="Usuário principal que irá interagir com o software"
					label="Noção"
					{...notion}
					onInput={() => setError('')}
					onKeyDown={(e) => {
						e.key === 'Enter' && e.preventDefault();
					}}
				/>
				<Select
					name="classification"
					label="Classificação"
					options={[
						{
							value: 'Recurso',
							label: 'Recurso',
						},
						{
							value: 'Ator',
							label: 'Ator',
						},
						{
							value: 'Estado',
							label: 'Estado',
						},
						{
							value: 'Objeto',
							label: 'Objeto',
						},
					]}
					{...classification}
				></Select>
				<AddSynonymComboBox synonyms={synonyms} setSynonyms={setSynonyms} setCurrentSynonym={setCurrentSynonym}/>
				<AddImpactComboBox impacts={impacts} setImpacts={setImpacts} setCurrentImpact={setCurrentImpact}/>
				{loading ? (
					<Loading />
				) : (
					<Button theme="primary" text="Criar" onClick={handleSubmit} />
				)}
				<Error error={error} />
			</Form>
		</section>
	);
};

export default CreateSymbolForm;
