import ProjectController from '../../application/http/controllers/project-controller';
import SymbolController from '../../application/http/controllers/symbol-controller';
import ScenarioController from '../../application/http/controllers/scenario-controller';
import { SymbolRepository } from '../../core/repositories/symbol-repository';
import { ScenarioRepository } from '../../core/repositories/scenario-repository';
import { ProjectRepository } from '../../core/repositories/project-repository';

import { GetProject } from '../../core/domain/use-cases/project/get-project';
import { GetAllProjects } from '../../core/domain/use-cases/project/get-all-projects';
import { CreateProject } from '../../core/domain/use-cases/project/create-project';
import { UpdateProject } from '../../core/domain/use-cases/project/update-project';
import { DeleteProject } from '../../core/domain/use-cases/project/delete-project';
import { GetSymbol } from '../../core/domain/use-cases/symbol/get-symbol';
import { GetAllSymbols } from '../../core/domain/use-cases/symbol/get-all-symbols';
import { CreateSymbol } from '../../core/domain/use-cases/symbol/create-symbol';
import { DeleteSymbol } from '../../core/domain/use-cases/symbol/delete-symbol';
import { CreateImpact } from '../../core/domain/use-cases/symbol/create-impact';
import { CreateSynonym } from '../../core/domain/use-cases/symbol/create-synonym';
import { DeleteImpact } from '../../core/domain/use-cases/symbol/delete-impact';
import { DeleteSynonym } from '../../core/domain/use-cases/symbol/delete-synonym';
import { UpdateSymbol } from '../../core/domain/use-cases/symbol/update-symbol';
import { CreateScenario } from '../../core/domain/use-cases/scenario/create-scenario';
import { DeleteScenario } from '../../core/domain/use-cases/scenario/delete-scenario';
import { GetAllScenarios } from '../../core/domain/use-cases/scenario/get-all-scenarios';
import { GetScenario } from '../../core/domain/use-cases/scenario/get-scenario';
import { UpdateScenario } from '../../core/domain/use-cases/scenario/update-scenario';
import { GetScenarioWithLexicons } from '../../core/domain/use-cases/scenario/get-scenario-with-lexicons';
import { CreateException } from '../../core/domain/use-cases/scenario/create-exception';
import { CreateContext } from '../../core/domain/use-cases/scenario/create-context';
import { CreateRestriction } from '../../core/domain/use-cases/scenario/create-restriction';
import { DeleteContext } from '../../core/domain/use-cases/scenario/delete-context';
import { DeleteException } from '../../core/domain/use-cases/scenario/delete-exception';
import { DeleteRestriction } from '../../core/domain/use-cases/scenario/delete-restriction';
import { CreateActor } from '../../core/domain/use-cases/scenario/create-actor';
import { AddActor } from '../../core/domain/use-cases/scenario/add-actor';
import { CreateEpisode } from '../../core/domain/use-cases/scenario/create-episode';
import { DeleteActor } from '../../core/domain/use-cases/scenario/delete-actor';
import { RemoveActor } from '../../core/domain/use-cases/scenario/remove-actor';
import { DeleteEpisode } from '../../core/domain/use-cases/scenario/delete-episode';
import { DeleteGroup } from '../../core/domain/use-cases/scenario/delete-group';

export class ControllerFactory {
    static createProjectController(projectRepository: ProjectRepository) {
        return ProjectController(new GetProject(projectRepository),
            new GetAllProjects(projectRepository),
            new CreateProject(projectRepository),
            new UpdateProject(projectRepository),
            new DeleteProject(projectRepository));
    }

    static createScenarioController(scenarioRepository: ScenarioRepository, symbolRepository: SymbolRepository) {
        return ScenarioController(
            new GetScenario(scenarioRepository),
            new GetScenarioWithLexicons(scenarioRepository, symbolRepository),
            new GetAllScenarios(scenarioRepository),
            new CreateScenario(scenarioRepository),
            new UpdateScenario(scenarioRepository),
            new DeleteScenario(scenarioRepository),
            new CreateException(scenarioRepository),
            new CreateContext(scenarioRepository),
            new CreateRestriction(scenarioRepository),
            new CreateActor(scenarioRepository),
            new AddActor(scenarioRepository),
            new CreateEpisode(scenarioRepository),
            new DeleteException(scenarioRepository),
            new DeleteContext(scenarioRepository),
            new DeleteRestriction(scenarioRepository),
            new DeleteActor(scenarioRepository),
            new RemoveActor(scenarioRepository),
            new DeleteEpisode(scenarioRepository),
            new DeleteGroup(scenarioRepository),
        );
    }

    static creatSymbolController(symbolRepository: SymbolRepository) {
        return SymbolController(
            new GetSymbol(symbolRepository),
            new GetAllSymbols(symbolRepository),
            new CreateSymbol(symbolRepository),
            new UpdateSymbol(symbolRepository),
            new DeleteSymbol(symbolRepository),
            new CreateImpact(symbolRepository),
            new CreateSynonym(symbolRepository),
            new DeleteImpact(symbolRepository),
            new DeleteSynonym(symbolRepository),
        );
    }
}