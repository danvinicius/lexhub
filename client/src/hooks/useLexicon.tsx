import { useContext } from 'react';
import LexiconSpan from '../components/lexicon/lexicon-span/LexiconSpan';
import { ProjectContext } from '../context/ProjectContext';
import { LexiconInfo } from '../shared/interfaces';

interface UseLexiconReturn {
  processContent: (params: {
    content: string;
    foundLexicons: LexiconInfo[];
  }) => (string | JSX.Element)[];
}

export const useLexicon = (): UseLexiconReturn => {
  const { setChosenType } = useContext(ProjectContext || {});
  
  function processContent({
    content = '',
    foundLexicons = [],
  }: {
    content: string;
    foundLexicons: LexiconInfo[];
  }): (string | JSX.Element)[] {
    // Ordena os lexicons pelo início
    foundLexicons.sort((a, b) => a.starts - b.starts);

    const elements: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Rastreia os nomes já processados para evitar duplicados
    const processedNames = new Set<string>();

    foundLexicons.forEach((lexicon) => {
      // Verifica se o nome já foi processado
      if (processedNames.has(lexicon.name)) {
        return; // Ignora duplicados
      }

      // Marca o nome como processado
      processedNames.add(lexicon.name);

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
          key={`${lexicon.name}-${lexicon.starts}`} // Unique key
          onClick={() =>
            setChosenType(lexicon.type === 'symbol' ? 'symbol' : 'scenario')
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
