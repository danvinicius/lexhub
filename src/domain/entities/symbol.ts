export interface Symbol {
    id?: string;
    name: string;
    classification: string;
    notion?: string;
    synonyms?: Synonym[];
    impacts?: Impact[];
}

export interface Synonym {
    name: string;
}

export interface Impact {
    description: string;
}