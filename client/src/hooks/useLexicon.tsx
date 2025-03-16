import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import LexiconSpan from '../components/lexicon/lexicon-span/LexiconSpan';

export interface LexiconInfo {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}
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
    // Ordena primeiro por posição inicial e depois pelo maior nome (evita sobreposição de palavras menores)
    foundLexicons.sort((a, b) => a.starts - b.starts || b.name.length - a.name.length);

    const elements: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const occupiedIndexes = new Set<number>(); // Guarda os índices já processados

    foundLexicons.forEach((lexicon) => {
      // Se qualquer índice da palavra já foi processado, ignoramos esse lexicon para evitar duplicação
      if ([...Array(lexicon.ends - lexicon.starts).keys()].some(i => occupiedIndexes.has(lexicon.starts + i))) {
        return;
      }

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

      // Marca os índices desse lexicon como ocupados
      for (let i = lexicon.starts; i < lexicon.ends; i++) {
        occupiedIndexes.add(i);
      }

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
