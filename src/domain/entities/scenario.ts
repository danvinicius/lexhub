export interface Scenario {
  readonly id?: string;
  title: string;
  goal: string;
  exceptions?: Exception[];
  resources?: Resource[];
  actors?: Actor[];
  context?: Context;
  episodes?: Episode[];
  groups?: Group[];
}

export interface Exception {
  description: string;
}

export interface Actor {
  name: string;
}

export interface Resource {
  name: string;
  restrictions?: Restriction[];
}

export interface Restriction {
  description: string;
}

export interface Context {
  geographicLocation: string;
  temporalLocation: string;
  precondition: string;
  restrictions?: Restriction[];
}

export interface Episode {
  position: number;
  description: string;
  type: string;
  restriction?: Restriction;
}

export interface Group {
  position: number;
}

export interface NonSequentialEpisode extends Episode {
  group: Group;
}
