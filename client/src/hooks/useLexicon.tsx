import { useContext } from 'react';
import LexiconSpan from '../components/lexicon/LexiconSpan';
import { ProjectContext } from '../context/ProjectContext';
import { LexiconInfo } from '../shared/interfaces';

interface UseLexiconReturn  {
	processContent: (params: {
	content: string;
	foundLexicons: LexiconInfo[];
	}) => (string | JSX.Element)[];
}

export const useLexicon = (): UseLexiconReturn => {
	const { setChosenType } = useContext(ProjectContext || {});
	function processContent({
		content,
		foundLexicons,
	}: {
    content: string;
    foundLexicons: LexiconInfo[];
  }): (string | JSX.Element)[] {
		foundLexicons.sort((a, b) => a.starts - b.starts);

		const elements: (string | JSX.Element)[] = [];
		let lastIndex = 0;

		foundLexicons.forEach((lexicon) => {
			// Adiciona o texto antes do lexicon
			if (lastIndex < lexicon.starts) {
				elements.push(content.substring(lastIndex, lexicon.starts));
			}

			// Adiciona o LexiconSpan com o conteúdo correspondente
			const id = lexicon.resource.match(/[^/]+$/)?.[0];
			elements.push(
				<LexiconSpan 
					id={id ? id : ''}
					resource={lexicon.resource}
					name={lexicon.name}
					type={lexicon.type}
					key={lexicon.name}
					onClick={() =>
						setChosenType(lexicon.type == 'symbol' ? 'symbol' : 'scenario')
					}
				>
					{content.substring(lexicon.starts, lexicon.ends)}
				</LexiconSpan>
			);

			// Atualiza o índice final
			lastIndex = lexicon.ends;
		});

		// Adiciona o texto restante
		if (lastIndex < content?.length) {
			elements.push(content.substring(lastIndex));
		}

		return elements;
	}
	return {
		processContent,
	};
};
