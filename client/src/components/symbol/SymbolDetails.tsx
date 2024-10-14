import { CSSProperties, useState } from "react";
import { ISynonym, IImpact, ISymbol } from "../../shared/interfaces";
import "./SymbolDetails.scss";
import KebabVertical from "../../assets/icon/Kebab_Vertical.svg";
import { SymbolActionsOptionsMenu } from "./SymbolActionsOptionsMenu";
import { Modal } from "@mui/material";
import EditSymbolForm from "./EditSymbolForm";
import DeleteSymbolForm from "./DeleteSymbolForm";

interface SymbolDetailsProps {
  symbol: ISymbol;
  style?: CSSProperties;
}

const SymbolDetails = ({ symbol, style }: SymbolDetailsProps) => {
  const [isSymbolActionsOptionsMenuOpen, setIsSymbolActionsOptionsMenuOpen] =
    useState(false);
  const [isEditSymbolModalOpen, setIsEditSymbolModalOpen] = useState(false);
  const [isDeleteSymbolModalOpen, setIsDeleteSymbolModalOpen] = useState(false);
  const handleOpenEditSymbolModal = () => setIsEditSymbolModalOpen(true);
  const handleCloseEditSymbolModal = () => setIsEditSymbolModalOpen(false);
  const handleOpenDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(true);
  const handleCloseDeleteSymbolModal = () => setIsDeleteSymbolModalOpen(false);
  return (
    <div className="symbol-details" style={style}>
      <div className="symbol-details-notion">
        <div className="symbol-name">
          <h3>{symbol?.name}</h3>
          <div className="classification">
            <p>{symbol?.classification}</p>
          </div>
          <img
            src={KebabVertical}
            alt=""
            className="symbol-options-button"
            onClick={() => setIsSymbolActionsOptionsMenuOpen(true)}
          />
          <div className="symbol-options">
            {isSymbolActionsOptionsMenuOpen && (
              <SymbolActionsOptionsMenu
                handleOpenEditSymbolModal={handleOpenEditSymbolModal}
                handleCloseEditSymbolModal={handleCloseEditSymbolModal}
                setIsSymbolActionsOptionsMenuOpen={
                  setIsSymbolActionsOptionsMenuOpen
                }
                isSymbolActionsOptionsMenuOpen={isSymbolActionsOptionsMenuOpen}
                handleOpenDeleteSymbolModal={handleOpenDeleteSymbolModal}
              />
            )}
          </div>
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
      <Modal
        open={isEditSymbolModalOpen}
        onClose={handleCloseEditSymbolModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditSymbolForm
          onClose={handleCloseEditSymbolModal}
          symbol={symbol ? symbol : ({} as ISymbol)}
          projectId={symbol.project || ''}
        />
      </Modal>
      <Modal
        open={isDeleteSymbolModalOpen}
        onClose={handleCloseDeleteSymbolModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteSymbolForm
          onClose={handleCloseDeleteSymbolModal}
          symbol={symbol ? symbol : ({} as ISymbol)}
          projectId={symbol.project}
        />
      </Modal>
    </div>
  );
};

export default SymbolDetails;
