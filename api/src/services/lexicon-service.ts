import { IProject, ISymbol, IScenario } from '@/models';
import { normalize } from '@/utils/string/normalize';

export interface Lexicon {
  resource: string;
  name: string;
  starts: number;
  ends: number;
  type: string;
}

export class LexiconService {
  public findPossibleLexicon = <
    T extends { name?: string; title?: string; id?: string; project: IProject },
  >(
    text: string,
    termos: T[]
  ) => {
    const possibleLexicon: Lexicon[] = [];

    for (const termo of termos) {
      const lexiconName = termo.name || termo.title || '';
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
              ? `/api/project/${termo.project.id}/scenario/${id}`
              : `/api/project/${termo.project.id}/symbol/${id}`,
            name: lexiconName,
            starts,
            ends,
            type: termo.title ? 'cenário' : 'símbolo',
          });
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
    const foundLexicons: Lexicon[] = [];

    const possibleSymbols = this.findPossibleLexicon(content, symbols);
    let possibleScenarios: Lexicon[] = [];
    if (searchOtherScenarios) {
      possibleScenarios = this.findPossibleLexicon(content, scenarios);
    }

    // primeiro, o cenário compete com outros cenários dentro do text
    const scenariosFilter = (candidate: Lexicon) => {
      return !possibleScenarios.some((scenario) => {
        return (
          scenario !== candidate &&
          scenario.starts <= candidate.starts &&
          scenario.ends >= candidate.ends
        );
      });
    };

    // depois, o símbolo compete com cenários (cenários tem prioridade) e depois com outros símbolos
    const symbolsFilter = (candidate: Lexicon) => {
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

  public orderByPosition = (a: Lexicon, b: Lexicon) => {
    if (a.starts > b.starts) {
      return 1;
    }
    if (b.starts > a.starts) {
      return -1;
    }
    return 0;
  };
}