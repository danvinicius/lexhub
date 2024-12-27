import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { ILexiconSymbol, IProject, IScenario } from '../shared/interfaces';

type ProjectContextType = {
  project: IProject | null;
  symbol: ILexiconSymbol | null;
  setProject: Dispatch<SetStateAction<IProject | null>>;
  setSymbol: Dispatch<SetStateAction<ILexiconSymbol | null>>;
  chosenType: 'symbol' | 'scenario' | null;
  setChosenType: Dispatch<SetStateAction<'symbol' | 'scenario' | null>>;
  scenario: IScenario | null;
  setScenario: Dispatch<SetStateAction<IScenario | null>>;
  currentTab: number,
  setCurrentTab: Dispatch<SetStateAction<number>>;
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
	currentTab: 0,
	setCurrentTab: () => null
});

type ProjectStorageProps = {
  children: ReactNode;
};

export const ProjectStorage: FC<ProjectStorageProps> = ({ children }: ProjectStorageProps): JSX.Element => {
	const [project, setProject] = useState<IProject | null>(null);
	const [symbol, setSymbol] = useState<ILexiconSymbol | null>(null);
	const [scenario, setScenario] = useState<IScenario | null>(null);
	const [currentTab, setCurrentTab] = useState(0);
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
				currentTab,
				setCurrentTab,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};
