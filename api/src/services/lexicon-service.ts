import { ISymbol, IScenario, ISynonym } from '@/models';
import { normalize } from '@/utils/string/normalize';

export interface LexiconInfo {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export interface Lexicon {
  content: string;
  foundLexicons: LexiconInfo[];
}

export class LexiconService {
  public findPossibleLexicon = <
    T extends {
      name?: string;
      title?: string;
      id?: string;
      project: String;
      synonyms?: ISynonym[];
    },
  >(
    text: string,
    termos: T[]
  ) => {
    const possibleLexicon: LexiconInfo[] = [];

    for (const termo of termos) {
      const lexiconNames = [termo.name || termo.title || ''];

      if (termo.synonyms?.length) {
        lexiconNames.push(...termo.synonyms.map((synonym) => synonym.name));
      }

      for (const lexiconName of lexiconNames) {
        let starts = -1;
        while (true) {
          starts = normalize(text).indexOf(normalize(lexiconName), starts + 1);
          if (starts == -1) {
            break;
          }
          const ends = starts + lexiconName.length;
          const { id } = termo;
          if (id) {
            possibleLexicon.push({
              resource: termo.title
                ? `/api/project/${termo.project}/scenario/${id}`
                : `/api/project/${termo.project}/symbol/${id}`,
              name: lexiconName,
              starts,
              ends,
              type: termo.title ? 'cenário' : 'símbolo',
            });
          }
        }
      }
    }

    return possibleLexicon;
  };

  //   　　　　/)─―ヘ
  // 　　　＿／　　　　＼
  // 　 ／　　　　●　　　●丶
  // 　｜　　　　　　　▼　|
  // 　｜　　　　　　　▽ノ
  // 　 U￣U￣￣￣￣U￣U
  // aqui que a mágica acontece

  public processLexicon = (
    content: string,
    symbols: ISymbol[],
    scenarios: IScenario[],
    searchOtherScenarios: boolean
  ) => {
    const foundLexicons: LexiconInfo[] = [];

    const possibleSymbols = this.findPossibleLexicon(content, symbols);
    let possibleScenarios: LexiconInfo[] = [];
    if (searchOtherScenarios) {
      possibleScenarios = this.findPossibleLexicon(content, scenarios);
    }

    // primeiro, o cenário compete com outros cenários dentro do text
    const scenariosFilter = (candidate: LexiconInfo) => {
      return !possibleScenarios.some((scenario) => {
        return (
          scenario !== candidate &&
          scenario.starts <= candidate.starts &&
          scenario.ends >= candidate.ends
        );
      });
    };

    // depois, o símbolo compete com cenários (cenários tem prioridade) e depois com outros símbolos
    const symbolsFilter = (candidate: LexiconInfo) => {
      return (
        !possibleScenarios.some((scenario) => {
          return (
            scenario.starts <= candidate.starts &&
            scenario.ends >= candidate.ends
          );
        }) &&
        !possibleSymbols.some((outro) => {
          return (
            outro !== candidate &&
            outro.starts <= candidate.starts &&
            outro.ends >= candidate.ends + 1
          );
        })
      );
    };

    foundLexicons.push(...possibleScenarios.filter(scenariosFilter));
    foundLexicons.push(...possibleSymbols.filter(symbolsFilter));

    foundLexicons.sort(this.orderByPosition);

    return {
      content,
      foundLexicons,
    };
  };

  public orderByPosition = (a: LexiconInfo, b: LexiconInfo) => {
    if (a.starts > b.starts) {
      return 1;
    }
    if (b.starts > a.starts) {
      return -1;
    }
    return 0;
  };
}
