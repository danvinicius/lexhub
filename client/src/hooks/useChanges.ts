import { IChange, IDifference } from '../shared/interfaces';

interface UseChangesReturn {
    formatChange: (change: IChange) => string;
}

interface Gender {
	definite: string,
	indefinite: string,
}

interface Article {
	male: Gender,
	female: Gender
}

interface Translation {
	value: string,
	gender: Gender
}

interface Translations {
	[key: string]: Translation
}

const articles: Article = {
	male: {
		definite: 'o',
		indefinite: 'um',
	},
	female: {
		definite: 'a',
		indefinite: 'uma',
	}
};

const translations: Translations = {
	name: {value: 'nome', gender: articles.male},
	description: {value: 'descrição', gender: articles.female},
	scenarios: {value: 'cenário', gender: articles.male},
	symbols: {value: 'símbolo', gender: articles.male},
	users: {value: 'usuário', gender: articles.male},
};

const getDifferenceDescription = (difference: IDifference, entityName: string): string => {
	const [entityType] = difference.path;

	const isNotProjectAttribute = ['scenarios', 'symbols', 'users'].includes(entityType);

	const isDeletedAtChange = difference.kind === 'E' && difference.path[difference.path.length - 1] === 'deletedAt';

	switch (difference.kind) {
	case 'N':
		return `adicionou ${translations[entityType]?.gender.definite} ${translations[entityType].value}
	${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} no projeto`;
	case 'D':
		return `removeu ${translations[entityType]?.gender.definite} ${translations[entityType].value}
		${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
	case 'E':
		if (isDeletedAtChange) {
			return `removeu ${translations[entityType]?.gender.definite} ${translations[entityType].value}
			${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
		}
		return `alterou ${translations[entityType]?.gender.definite} ${translations[entityType].value}
		${isNotProjectAttribute ? `<span class="action">${entityName}</span>` : ''} do projeto`;
	case 'A':
		if (difference.item?.kind === 'N') {
			return `adicionou ${translations[entityType]?.gender.definite} ${translations[entityType].value}
			<span class="action">${entityName}</span> ao projeto`;
		} else if (difference.item?.kind === 'D') {
			return `removeu ${translations[entityType]?.gender.definite} ${translations[entityType].value}
			<span class="action">${entityName}}</span> do projeto`;
		}
		break;
	default:
		return '';
	}

	return '';
};

export const useChanges = (): UseChangesReturn => {
	const formatChange = (change: IChange): string => {
		const { differences, responsible, project, entityName } = change;

		// Considera a primeira diferença apenas para simplificação.
		const firstDifference = differences[0];

		if (!firstDifference) {
			return '';
		}

		const actionDescription = getDifferenceDescription(firstDifference, entityName);

		// Pega o nome do projeto e o nome da entidade (se existir).
		const projectName = project.name || 'projeto desconhecido';

		// Formata a mensagem final.
		return `<b>${responsible.name}</b> ${actionDescription} <span class="action">${projectName}</span>.`;
	};

	return {
		formatChange,
	};
};