import { useContext } from "react";
import { IImpact, ISynonym } from "../../shared/interfaces";
import "./SummaryWrapper.scss";
import { ProjectContext } from "../../context/ProjectContext";
import { ScenariosSummary } from "./ScenariosSummary";
import Arrow from "../../assets/icon/Arrow_Left_M.svg";

const SummaryWrapper = () => {
  const { symbol, setSymbol } = useContext(ProjectContext || {});
  return (
    <div className="summary-wrapper-container">
      {!symbol && <ScenariosSummary />}
      {symbol && (
        <div className="summary-wrapper slide-left">
          <div className="back-to-summary">
            <img
              src={Arrow}
              alt="Voltar ao sumário"
              title="Voltar ao sumário"
              onClick={() => setSymbol(null)}
            />
          </div>
          <div className="symbol-details">
            <div className="symbol-details-notion">
              <h3>{symbol.name}</h3>
              <p>{symbol.notion}</p>
            </div>
            <div className="symbol-details-synonyms">
              <h4>Sinônimos</h4>
              {symbol?.synonyms?.length ? (
                <ul>
                  {symbol.synonyms?.map((synonym: ISynonym) => {
                    return <li key={synonym.id}>{synonym.name}</li>;
                  })}
                </ul>
              ) : (
                <p>Ainda não há sinônimos cadastrados nesse símbolo</p>
              )}
            </div>
            <div className="symbol-details-impacts">
              <h4>Impactos</h4>
              {symbol?.impacts?.length ? (
                <ul>
                  {symbol.impacts?.map((impact: IImpact) => {
                    return <li key={impact.id}>{impact.description}</li>;
                  })}
                </ul>
              ) : (
                <p>Ainda não há impactos cadastrados nesse símbolo</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryWrapper;
