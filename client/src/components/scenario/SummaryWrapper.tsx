import { useContext } from "react";
import "./SummaryWrapper.scss";
import { ProjectContext } from "../../context/ProjectContext";
import { ScenariosSummary } from "./ScenariosSummary";
import Arrow from "../../assets/icon/Arrow_Left_M.svg";
import SymbolDetails from "../symbol/SymbolDetails";

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
          <SymbolDetails></SymbolDetails>
        </div>
      )}
    </div>
  );
};

export default SummaryWrapper;
