import { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";
import { ISymbol } from "../../../shared/interfaces";

// Supondo que o contexto das opções seja algo como o contexto abaixo:

interface AddSynonymComboBoxProps {
  synonyms: string[];
  setSynonyms: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddSynonymComboBox = ({
  synonyms,
  setSynonyms,
}: AddSynonymComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState([
    ...new Set(
      projectContext.project?.symbols
        ?.map((symbol: ISymbol) =>
          symbol.synonyms?.map((synonym) => synonym.name)
        )
        .flat()
    ),
  ]);

  const handleAddSynonym = (newSynonyms: string[]) => {
    setSynonyms(newSynonyms);
  };

  return (
    <div className="synonyms">
      <p>Sinônimos do símbolo</p>
      <br />
      <br />
      <br />
      <Autocomplete
        multiple
        freeSolo
        options={localOptions}
        value={synonyms}
        onChange={(_, newValue) => {
          handleAddSynonym(newValue as string[]);
          const newOptions = newValue.filter(
            (value: any) => !localOptions.includes(value)
          );
          setLocalOptions([...localOptions, ...newOptions]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sinônimos"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid var(--secondary-text-color)",
                },
                "&:hover fieldset": {
                  border: "1px solid var(--secondary-text-color)",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid var(--primary-color)",
                },
                "& input": {
                  padding: "0.5rem 1rem",
                },
              },
              "& .MuiInputLabel-outlined": {
                color: "var(--primary-text-color)",
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "var(--primary-text-color)",
              },
            }}
          />
        )}
      />
    </div>
  );
};
