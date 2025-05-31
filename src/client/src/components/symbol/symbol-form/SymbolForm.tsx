import { FC, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import api from '../../../lib/axios';
import { CREATE_SYMBOL, UPDATE_SYMBOL } from '../../../api';
import useForm from '../../../hooks/useForm';
import { useSelect } from '../../../hooks/useSelect';
import { ProjectContext } from '../../../context/ProjectContext';
import { useToast } from '../../../context/ToastContext';
import { UserContext } from '../../../context/UserContext';
import { ErrorResponse, ILexiconSymbol } from '../../../shared/interfaces';
import { SymbolRequestDTO } from '../../../shared/dto';

import Input from '../../forms/input/Input';
import Form from '../../forms/Form';
import Loading from '../../helper/Loading';
import Button from '../../forms/button/Button';
import Select from '../../forms/select/Select';
import { AddImpactComboBox } from '../impact/ImpactComboBox';
import { AddSynonymComboBox } from '../synonym/SynonymComboBox';
import Close from '../../../assets/icon/Close_Dark.svg';
import './SymbolForm.scss';

interface SymbolFormProps {
    symbol?: ILexiconSymbol;
    onClose: () => void;
    resetInfo: () => void;
}

const SymbolForm: FC<SymbolFormProps> = ({ symbol, onClose, resetInfo }: SymbolFormProps): ReactNode => {
    const isEditing = !!symbol;
    const { isAuthenticated } = useContext(UserContext) || {};
    const projectContext = useContext(ProjectContext);
    const { success, error } = useToast();

    const name = useForm('dontValidateName');
    const notion = useForm('dontValidateNotion');
    const classification = useSelect('dontValidateClassification');
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
                    .filter((impact) => impact != null)
                    .map((impact: string) => ({ description: impact })),
                synonyms: [...synonyms, currentSynonym.length ? currentSynonym : null]
                    .filter((synonym) => synonym != null)
                    .map((synonym: string) => ({ name: synonym })),
            };

            setLoading(true);
            try {
                const { url, options } = isEditing
                    ? UPDATE_SYMBOL(projectContext.project?.id, symbol!.id, isAuthenticated()?.token || '')
                    : CREATE_SYMBOL(projectContext.project?.id, isAuthenticated()?.token || '');
                await api[options.method](url, body, options);
                resetInfo();
                if (!isEditing) success('Símbolo atualizado com sucesso');
            } catch (err) {
                const typedError = err as AxiosError<ErrorResponse>;
                error(typedError?.response?.data?.error || 'Erro inesperado');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className='symbol-form flex column gap-125'>
            <div className='symbol-form-header'>
                <h2>{isEditing ? 'Editar símbolo' : 'Novo símbolo'}</h2>
                <img src={Close} alt='Fechar' title='Fechar' onClick={onClose} />
            </div>
            <Form>
                <Input type='text' name='name' placeholder='Nome' label='Nome' autoFocus {...name} onInput={() => name.setError('')} />
                <Input type='text' name='notion' placeholder='Noção' label='Noção' {...notion} onInput={() => notion.setError('')} />
                <Select
                    name='classification'
                    label='Classificação'
                    options={[
                        { value: 'Verbo', label: 'Verbo' },
                        { value: 'Sujeito', label: 'Sujeito' },
                        { value: 'Estado', label: 'Estado' },
                        { value: 'Objeto', label: 'Objeto' },
                    ]}
                    {...classification}
                />
                <AddSynonymComboBox synonyms={synonyms} setSynonyms={setSynonyms} setCurrentSynonym={setCurrentSynonym} />
                <AddImpactComboBox impacts={impacts} setImpacts={setImpacts} setCurrentImpact={setCurrentImpact} />
                {loading ? <Loading /> : <Button theme='primary' text={isEditing ? 'Atualizar' : 'Criar'} onClick={handleSubmit} />}
            </Form>
        </section>
    );
};

export default SymbolForm;
