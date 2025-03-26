import { useContext } from 'react';

import { IDifference, IProject, IUser } from '../shared/interfaces';
import { UserContext } from '../context/UserContext';

interface UseChangesReturn {
    formatChange: (difference: IDifference, responsible: IUser, project: IProject, entityName: string) => string;
}

interface Translation {
	value: string,
	gender: Article
}

interface Translations {
	[key: string]: Translation
}

enum Article {
	MALE = 'o',
	FEMALE ='a'
}

export const translations: Translations = {
	name: {value: 'nome', gender: Article.MALE},
	description: {value: 'descrição', gender: Article.FEMALE},
	private: {value: 'visibilidade', gender: Article.FEMALE},
	scenarios: {value: 'cenário', gender: Article.MALE},
	symbols: {value: 'símbolo', gender: Article.MALE},
	users: {value: 'usuário', gender: Article.MALE},
	user: {value: 'usuário', gender: Article.MALE},
	role: {value: 'função', gender: Article.FEMALE},
	email: {value: 'email', gender: Article.FEMALE},
	title: {value: 'título', gender: Article.MALE},
	goal: {value: 'objetivo', gender: Article.MALE},
	exceptions: {value: 'exceções', gender: Article.FEMALE},
	actors: {value: 'atores', gender: Article.MALE},
	resources: {value: 'recursos', gender: Article.MALE},
	context: {value: 'contexto', gender: Article.MALE},
	episodes: {value: 'episódio', gender: Article.MALE},
	position: {value: 'posição', gender: Article.FEMALE},
	type: {value: 'tipo', gender: Article.MALE},
	classification: {value: 'classificação', gender: Article.FEMALE},
	notion: {value: 'noção', gender: Article.FEMALE},
	synonyms: {value: 'sinônimos', gender: Article.MALE},
	impacts: {value: 'impactos', gender: Article.MALE},
	restriction: {value: 'restrições', gender: Article.FEMALE},
	restrictions: {value: 'restrições', gender: Article.FEMALE},
	preCondition: {value: 'pré-condição', gender: Article.FEMALE},
	temporalLocation: {value: 'localização temporal', gender: Article.FEMALE},
	geographicLocation: {value: 'localização geográfica', gender: Article.FEMALE},
	nonSequentialEpisodes: {value: 'episódios não sequenciais', gender: Article.MALE},
};

const getDifferenceDescription = (difference: IDifference, entityName: string): string => {
	const [entityType] = difference.path;

	const isNotProjectAttribute = ['scenarios', 'symbols', 'users'].includes(entityType);

	const isDeletedAtChange = difference.kind === 'E' && difference.path[difference.path.length - 1] === 'deletedAt';

	switch (difference.kind) {
	case 'N':
		if (difference.path.length > 1) {
			return `alterou ${translations[entityType]?.gender} ${translations[entityType].value}
			${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
		}
		return `adicionou ${translations[entityType]?.gender} ${translations[entityType].value}
	${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} ao projeto`;
	case 'D':
		if (difference.path.length > 3) {
			return `alterou ${translations[entityType]?.gender} ${translations[entityType].value}
			${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
		}
		return `removeu ${translations[entityType]?.gender} ${translations[entityType].value}
		${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
	case 'E':
		if (isDeletedAtChange) {
			return `removeu ${translations[entityType]?.gender} ${translations[entityType].value}
			${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
		}
		return `alterou ${translations[entityType]?.gender} ${translations[entityType].value}
		${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
	case 'A':
		if (difference.path.length > 1) {
			return `alterou ${translations[entityType]?.gender} ${translations[entityType].value}
			${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
		}
		if (difference.item?.kind === 'N') {
			return `adicionou ${translations[entityType]?.gender} ${translations[entityType].value}
			<span class="action">${entityName}</span> ao projeto`;
		} else if (difference.item?.kind === 'D') {
			return `removeu ${translations[entityType]?.gender} ${translations[entityType].value}
			<span class="action">${entityName}</span> do projeto`;
		}
		break;
	default:
		return '';
	}

	return '';
};

export const useChanges = (): UseChangesReturn => {
	const {isAuthenticated} = useContext(UserContext);
	const userId = isAuthenticated()?.id;
	
	const formatChange = (difference: IDifference, responsible: IUser, project: IProject, entityName: string): string => {

		const actionDescription = getDifferenceDescription(difference, entityName);

		const projectName = project.name || 'projeto desconhecido';

		const username = responsible.id === userId ? 'Você' : responsible.name;

		return `<b>${username}</b> ${actionDescription} <span class="action pointer"><a href="/projeto/${project.id}">${projectName}</a></span>.`;
	};

	return {
		formatChange,
	};
};