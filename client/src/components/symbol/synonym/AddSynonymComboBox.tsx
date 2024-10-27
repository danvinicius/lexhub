import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";

interface AddSynonymComboBoxProps {
  symbolId?: string;
  synonyms: string[];
  setSynonyms: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddSynonymComboBox = ({
  symbolId,
  synonyms,
  setSynonyms,
}: AddSynonymComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const updatedOptions = [
      ...new Set(
        projectContext.project?.symbols
          ?.filter((symbol) => symbol.id !== symbolId)
          .map((symbol) =>
            symbol.synonyms?.map((synonym) => synonym.name)
              .filter((synonymName) => !synonyms.includes(synonymName))
          )
          .flat()
      ),
    ];

    setLocalOptions(updatedOptions);
  }, [synonyms, symbolId, projectContext.project?.symbols]);

  const handleAddSynonym = (newSynonyms: string[]) => {
    setSynonyms(newSynonyms);
  };

  return (
    <div className="synonyms">
      <p>Sinônimos</p>
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
            placeholder="Cadastre ou remova sinônimos ('Enter' para salvar)"
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
