import { IActor, IException, IResource, IRestriction, IScenario } from "../../entities/scenario";
import { ScenarioRepository } from "../../../repositories/scenario-repository";
import { SymbolRepository } from "../../../repositories/symbol-repository";
import { ISymbol } from "../../entities/symbol";
import { GetScenarioWithLexiconsUseCase, FoundLexicon } from './interfaces'
import { NotFoundError } from "../../../../application/errors/not-found-error";

export class GetScenarioWithLexicons implements GetScenarioWithLexiconsUseCase {
    private scenarioRepository: ScenarioRepository;
    private symbolRepository: SymbolRepository;

    constructor(scenarioRepository: ScenarioRepository, symbolRepository: SymbolRepository) {
        this.scenarioRepository = scenarioRepository;
        this.symbolRepository = symbolRepository;
    }

    async execute(id: number | number) {
        const scenario = await this.scenarioRepository.getScenario(id);

        if (!scenario || !scenario?.project.id) {
            throw new NotFoundError('Scenario not found')
        }

        const [symbols, scenarios] = await Promise.all([
            this.symbolRepository.getAllSymbols(scenario.project.id),
            this.scenarioRepository.getAllScenarios(scenario.project.id),
        ]);

        // retira o próprio cenário
        const scenarioIndex = scenarios.findIndex((c: IScenario) => {
            return c.id?.valueOf() === scenario?.id?.valueOf();
        });

        scenarios.splice(scenarioIndex, 1);

        scenario.context = scenario.context ? scenario.context : {
            geographicLocation: '',
            temporalLocation: '',
            preCondition: '',
            restrictions: [],
        }

        const {
            title = '',
            goal = '',
            context: {
                geographicLocation = '',
                temporalLocation = '',
                preCondition = '',
                restrictions = [],
            } = {},
            exceptions = [],
            actors = [],
            resources = [],
        } = scenario;

        const findLexicon = (text: string, searchOtherScenarios: boolean) =>
            this.findLexicons(text, symbols, scenarios, searchOtherScenarios);

        return {
            title: findLexicon(title, false),
            goal: findLexicon(goal, false),
            context: {
                geographicLocation: findLexicon(geographicLocation, false),
                temporalLocation: findLexicon(temporalLocation, false),
                preCondition: findLexicon(preCondition, true),
                restrictions: restrictions.map((restriction: IRestriction) =>
                    findLexicon(restriction.description, true),
                ),
            },
            exceptions: exceptions.map((exception: IException) =>
                findLexicon(exception.description, true),
            ),
            actors: actors.map((actor: IActor) => findLexicon(actor.name, false)),
            resources: resources.map((resource: IResource) =>
                findLexicon(resource.name, false),
            ),
        };

    };

    private findPossibleLexicons = <
        T extends { name?: string; title?: string; id?: number | string },
    >(
        text: string,
        termos: T[],
    ) => {
        const possibleLexicons: FoundLexicon[] = [];

        for (const termo of termos) {
            const lexiconName = termo.name || termo.title || '';
            let starts = -1;
            while (true) {
                starts = this.normalize(text).indexOf(
                    this.normalize(lexiconName),
                    starts + 1,
                );
                if (starts == -1) {
                    break;
                }
                const ends = starts + lexiconName.length - 1;
                const { id } = termo;
                if (id) {
                    possibleLexicons.push({
                        resource: termo.title ? `/api/scenario/${id}` : `/api/symbol/${id}`,
                        name: lexiconName,
                        starts,
                        ends,
                        type: termo.title ? 'cenário' : 'símbolo',
                    });
                }
            }
        }

        return possibleLexicons;
    };

    //   　　　　/)─―ヘ
    // 　　　＿／　　　　＼
    // 　 ／　　　　●　　　●丶
    // 　｜　　　　　　　▼　|
    // 　｜　　　　　　　▽ノ
    // 　 U￣U￣￣￣￣U￣U
    // aqui que a mágica acontece

    private findLexicons = (
        content: string,
        symbols: ISymbol[],
        scenarios: IScenario[],
        searchOtherScenarios: boolean,
    ) => {
        const foundLexicons: FoundLexicon[] = [];

        const possibleSymbols = this.findPossibleLexicons(content, symbols);
        let possibleScenarios: FoundLexicon[] = [];
        if (searchOtherScenarios) {
            possibleScenarios = this.findPossibleLexicons(content, scenarios);
        }

        // primeiro, o cenário compete com outros cenários dentro do text
        const scenariosFilter = (candidate: FoundLexicon) => {
            return !possibleScenarios.some((scenario) => {
                return (
                    scenario !== candidate &&
                    scenario.starts <= candidate.starts &&
                    scenario.ends >= candidate.ends
                );
            });
        };

        // depois, o símbolo compete com cenários (cenários tem prioridade) e depois com outros símbolos
        const symbolsFilter = (candidate: FoundLexicon) => {
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
                        outro.ends >= candidate.ends
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

    private normalize = (str: string) => {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };

    private orderByPosition = (a: FoundLexicon, b: FoundLexicon) => {
        if (a.starts > b.starts) {
            return 1;
        }
        if (b.starts > a.starts) {
            return -1;
        }
        return 0;
    };
}