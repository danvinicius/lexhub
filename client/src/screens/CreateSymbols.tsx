import { FC } from "react";
import { Navbar } from "../components/navbar/Navbar";
import CreateSymbolForm from "../components/symbol/CreateSymbolForm";

const CreateSymbols: FC = () => {
  return (
    <>
      <Navbar navBg={true} />
      <div className="create-project">
        <div className="container">
          <h1>Adicione os símbolos do seu projeto</h1>
          <hr />
          <CreateSymbolForm/>
        </div>
      </div>
    </>
  );
};

export default CreateSymbols;
