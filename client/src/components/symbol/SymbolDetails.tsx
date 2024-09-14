import { CSSProperties } from "react";
import { ISynonym, IImpact, ISymbol } from "../../shared/interfaces";
import './SymbolDetails.scss'

interface SymbolDetailsProps {
  symbol: ISymbol;
  style?: CSSProperties;
}

const SymbolDetails = ({symbol, style}: SymbolDetailsProps) => {
  return (
    <div className="symbol-details" style={style}>
      <div className="symbol-details-notion">
        <div className="symbol-name">
        <h3>{symbol?.name}</h3>
        <div className="classification"><p>{symbol?.classification}</p></div>
        </div>
        <p>{symbol?.notion}</p>
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
  );
};

export default SymbolDetails;
