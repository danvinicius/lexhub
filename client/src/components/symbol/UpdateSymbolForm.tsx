import {
	FC,
	FormEvent,
	KeyboardEvent,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Form from '../forms/Form';
import './UpdateSymbolForm.scss';
import { UserContext } from '../../context/UserContext';
import Loading from '../helper/Loading';
import { UPDATE_SYMBOL } from '../../api';
import useForm from '../../hooks/useForm';
import api from '../../lib/axios';
import Error from '../helper/Error';
import { ISynonym, IImpact, ErrorResponse, ILexiconSymbol } from '../../shared/interfaces';
import Close from '../../assets/icon/Close_Dark.svg';
import { AddSynonymComboBox } from './synonym/AddSynonymComboBox';
import { AddImpactComboBox } from './impact/AddImpactComboBox';
import Select from '../forms/Select';
import { useSelect } from '../../hooks/useSelect';
import { AxiosError } from 'axios';

export interface UpdateSymbolRequestDTO {
  name: string;
  notion: string;
  classification: string;
  synonyms: ISynonym[];
  impacts: IImpact[];
  projectId: string;
}

interface UpdateSymbolFormProps {
  symbol: ILexiconSymbol;
  onClose: () => void;
  projectId: string;
  resetSymbolInfo: () => void;
}

const UpdateSymbolForm: FC<UpdateSymbolFormProps> = ({
	symbol,
	onClose,
	resetSymbolInfo,
	projectId,
}: UpdateSymbolFormProps): ReactNode => {
	const nameEdit = useForm('dontValidateName');
	const notionEdit = useForm('dontValidateNotion');
	const classificationEdit = useSelect();
	const [synonymsEdit, setSynonymsEdit] = useState<string[]>([]);
	const [impactsEdit, setImpactsEdit] = useState<string[]>([]);

	const [currentImpact, setCurrentImpact] = useState('');
	const [currentSynonym, setCurrentSynonym] = useState('');

	useEffect(() => {
		nameEdit.setValue(symbol.name);
		notionEdit.setValue(symbol.notion.content || '');
		classificationEdit.setValue(symbol.classification || '');
		setSynonymsEdit(symbol?.synonyms?.map((synonym) => synonym.name.content) || []);
		setImpactsEdit(symbol?.impacts?.map((impact) => impact.description.content) || []);
	}, []);

	const { isAuthenticated } = useContext(UserContext) || {};

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const updateSymbol = async (body: UpdateSymbolRequestDTO) => {
		if (projectId && symbol?.id) {
			setLoading(true);

			try {
				const { url, options } = UPDATE_SYMBOL(
					projectId,
					symbol.id,
					isAuthenticated()?.token || ''
				);
				await api[options.method](url, body, options);
				resetSymbolInfo();
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
		if (nameEdit.validate() && notionEdit.validate()) {
			updateSymbol({
				name: nameEdit.value,
				notion: notionEdit.value,
				classification: classificationEdit.value,
				impacts: [...impactsEdit, currentImpact.length ? currentImpact : null].filter(impact => impact != null).map((impact: string) => ({
					description: impact,
				})),
				synonyms: [...synonymsEdit, currentSynonym.length ? currentSynonym : null].filter(synonym => synonym != null).map((synonym: string) => ({
					name: synonym,
				})),
				projectId,
			});
		}
	};

	return (
		<section className="update-symbol-form flex column gap-125">
			<div className="update-symbol-form-header">
				<h2>Editar símbolo</h2>
				<img
					src={Close}
					alt="Ícone 'X' popup"
					title="Ícone 'X' popup"
					onClick={onClose}
				/>
			</div>
			<br />
			<div className="flex gap-2">
				<Form>
					<Input
						type="text"
						name="name"
						placeholder="Usuário do sistema"
						label="Nome"
						autoFocus
						{...nameEdit}
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
						{...notionEdit}
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
						{...classificationEdit}
					></Select>
					<AddSynonymComboBox
						synonyms={synonymsEdit}
						setSynonyms={setSynonymsEdit}
						symbolId={symbol.id}
						setCurrentSynonym={setCurrentSynonym}
					/>
					<AddImpactComboBox
						impacts={impactsEdit}
						setImpacts={setImpactsEdit}
						symbolId={symbol.id}
						setCurrentImpact={setCurrentImpact}
					/>
					{loading ? (
						<Loading />
					) : (
						<Button theme="primary" text="Salvar" onClick={handleSubmit} />
					)}
					<Error error={error} />
				</Form>
			</div>
		</section>
	);
};

export default UpdateSymbolForm;
