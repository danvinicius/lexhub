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
    foundLexicons.sort((a, b) => a.starts - b.starts || b.name.length - a.name.length);

    const elements: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const occupiedIndexes = new Set<number>();

    foundLexicons.forEach((lexicon) => {
      if ([...Array(lexicon.ends - lexicon.starts).keys()].some(i => occupiedIndexes.has(lexicon.starts + i))) {
        return;
      }

      if (lastIndex < lexicon.starts) {
        elements.push(content.substring(lastIndex, lexicon.starts));
      }

      const id = lexicon.resource.match(/[^/]+$/)?.[0];
      elements.push(
        <LexiconSpan
          id={id ? id : ''}
          resource={lexicon.resource}
          name={lexicon.name}
          type={lexicon.type}
          key={`${lexicon.name}-${lexicon.starts}`}
          onClick={() =>
            setChosenType(lexicon.type === 'symbol' ? 'symbol' : 'scenario')
          }
        >
          {content.substring(lexicon.starts, lexicon.ends)}
        </LexiconSpan>
      );

      for (let i = lexicon.starts; i < lexicon.ends; i++) {
        occupiedIndexes.add(i);
      }

      lastIndex = lexicon.ends;
    });

    if (lastIndex < content?.length) {
      elements.push(content.substring(lastIndex));
    }

    return elements;
  }

  return {
    processContent,
  };
};
