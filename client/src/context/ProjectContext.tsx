import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { IProject, IScenario, ISymbol } from '../shared/interfaces';

type ProjectContextType = {
  project: IProject | null;
  symbol: ISymbol | null;
  setProject: Dispatch<SetStateAction<IProject | null>>;
  setSymbol: Dispatch<SetStateAction<ISymbol | null>>;
  chosenType: 'symbol' | 'scenario' | null;
  setChosenType: Dispatch<SetStateAction<'symbol' | 'scenario' | null>>;
  scenario: IScenario | null;
  setScenario: Dispatch<SetStateAction<IScenario | null>>;
};

export const ProjectContext = createContext<ProjectContextType>({
	project: null,
	symbol: null,
	chosenType: null,
	scenario: null,
	setProject: () => null,
	setSymbol: () => null,
	setChosenType: () => null,
	setScenario: () => null,
});

type ProjectStorageProps = {
  children: ReactNode;
};

export const ProjectStorage: FC<ProjectStorageProps> = ({ children }: ProjectStorageProps): JSX.Element => {
	const [project, setProject] = useState<IProject | null>(null);
	const [symbol, setSymbol] = useState<ISymbol | null>(null);
	const [scenario, setScenario] = useState<IScenario | null>(null);
	const [chosenType, setChosenType] = useState<'symbol' | 'scenario' | null>(
		null
	);

	return (
		<ProjectContext.Provider
			value={{
				project,
				setProject,
				symbol,
				setSymbol,
				chosenType,
				setChosenType,
				scenario,
				setScenario,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};
