import { FC, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import Input from '../../forms/input/Input';
import useForm from '../../../hooks/useForm';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/button/Button';
import Error from '../../helper/Error';
import api from '../../../lib/axios';
import { CREATE_SYMBOL, UPDATE_SYMBOL } from '../../../api';
import { UserContext } from '../../../context/UserContext';
import './SymbolForm.scss';
import Select from '../../forms/select/Select';
import { useSelect } from '../../../hooks/useSelect';
import { AddImpactComboBox } from '../impact/ImpactComboBox';
import { AddSynonymComboBox } from '../synonym/SynonymComboBox';
import Close from '../../../assets/icon/Close_Dark.svg';
import { ProjectContext } from '../../../context/ProjectContext';
import { ErrorResponse, ILexiconSymbol } from '../../../shared/interfaces';
import { AxiosError } from 'axios';
import { SymbolRequestDTO } from '../../../shared/dto';

interface SymbolFormProps {
  symbol?: ILexiconSymbol;
  onClose: () => void;
  resetInfo: () => void;
}

const SymbolForm: FC<SymbolFormProps> = ({ symbol, onClose, resetInfo }: SymbolFormProps): ReactNode => {
  const isEditing = !!symbol;
  const { isAuthenticated } = useContext(UserContext) || {};
  const projectContext = useContext(ProjectContext);

  const name = useForm('dontValidateName');
  const notion = useForm('dontValidateNotion');
  const classification = useSelect('dontValidateClassification');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [impacts, setImpacts] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [currentImpact, setCurrentImpact] = useState('');
  const [currentSynonym, setCurrentSynonym] = useState('');

  useEffect(() => {
    if (symbol) {
      name.setValue(symbol.name);
      notion.setValue(symbol.notion.content || '');
      classification.setValue(symbol.classification || '');
      setSynonyms(symbol?.synonyms?.map((synonym) => synonym.name.content) || []);
      setImpacts(symbol?.impacts?.map((impact) => impact.description.content) || []);
    }
  }, [symbol]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.validate() && notion.validate() && classification.validate() && projectContext.project?.id) {
      const body: SymbolRequestDTO = {
        name: name.value,
        notion: notion.value,
        classification: classification.value,
        projectId: projectContext.project?.id,
        impacts: [...impacts, currentImpact.length ? currentImpact : null]
          .filter(impact => impact != null)
          .map((impact: string) => ({ description: impact })),
        synonyms: [...synonyms, currentSynonym.length ? currentSynonym : null]
          .filter(synonym => synonym != null)
          .map((synonym: string) => ({ name: synonym })),
      };

      setLoading(true);
      try {
        const { url, options } = isEditing
          ? UPDATE_SYMBOL(projectContext.project?.id, symbol!.id, isAuthenticated()?.token || '')
          : CREATE_SYMBOL(projectContext.project?.id, isAuthenticated()?.token || '');
        await api[options.method](url, body, options);
        resetInfo();
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        setError(err?.response?.data?.error || 'Erro inesperado');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="symbol-form flex column gap-125">
      <div className="symbol-form-header">
        <h2>{isEditing ? 'Editar símbolo' : 'Novo símbolo'}</h2>
        <img src={Close} alt="Fechar" title="Fechar" onClick={onClose} />
      </div>
      <Form>
        <Input type="text" name="name" placeholder="Nome" label="Nome" autoFocus {...name} onInput={() => setError('')} />
        <Input type="text" name="notion" placeholder="Noção" label="Noção" {...notion} onInput={() => setError('')} />
        <Select
          name="classification"
          label="Classificação"
          options={[{ value: 'Recurso', label: 'Recurso' }, { value: 'Ator', label: 'Ator' }, { value: 'Estado', label: 'Estado' }, { value: 'Objeto', label: 'Objeto' }]}
          {...classification}
        />
        <AddSynonymComboBox synonyms={synonyms} setSynonyms={setSynonyms} setCurrentSynonym={setCurrentSynonym} />
        <AddImpactComboBox impacts={impacts} setImpacts={setImpacts} setCurrentImpact={setCurrentImpact} />
        {loading ? <Loading /> : <Button theme="primary" text={isEditing ? 'Atualizar' : 'Criar'} onClick={handleSubmit} />}
        <Error error={error} />
      </Form>
    </section>
  );
};

export default SymbolForm;
