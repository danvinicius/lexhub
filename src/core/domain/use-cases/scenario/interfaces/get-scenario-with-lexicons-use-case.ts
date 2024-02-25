export interface FoundLexicon {
    resource: string;
    name: string;
    starts: number;
    ends: number;
    type: string;
};

export interface GetScenarioWithLexiconsUseCase {
    execute(id: number | string): Promise<{
        title: {
            content: string;
            foundLexicons: FoundLexicon[];
        };
        goal: {
            content: string;
            foundLexicons: FoundLexicon[];
        };
        context: {
            geographicLocation: {
                content: string;
                foundLexicons: FoundLexicon[];
            };
            temporalLocation: {
                content: string;
                foundLexicons: FoundLexicon[];
            };
            preCondition: {
                content: string;
                foundLexicons: FoundLexicon[];
            };
            restrictions: {
                content: string;
                foundLexicons: FoundLexicon[];
            }[];
        };
        exceptions: {
            content: string;
            foundLexicons: FoundLexicon[];
        }[];
        actors: {
            content: string;
            foundLexicons: FoundLexicon[];
        }[];
        resources: {
            content: string;
            foundLexicons: FoundLexicon[];
        }[];
    }>;
}
