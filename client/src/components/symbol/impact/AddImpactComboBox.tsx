import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";

interface AddImpactComboBoxProps {
  symbolId?: string;
  impacts: string[];
  setImpacts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddImpactComboBox = ({
  symbolId,
  impacts,
  setImpacts,
}: AddImpactComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const updatedOptions = [
      ...new Set(
        projectContext.project?.symbols
          ?.filter((symbol) => symbol.id !== symbolId)
          .map((symbol) =>
            symbol.impacts
              ?.map((impact) => impact.description)
              .filter((impactName) => !impacts.includes(impactName))
          )
          .flat()
      ),
    ];

    setLocalOptions(updatedOptions);
  }, [impacts, symbolId, projectContext.project?.symbols]);

  const handleAddImpact = (newImpacts: string[]) => {
    setImpacts(newImpacts);
  };

  return (
    <div className="impacts">
      <p>Impactos</p>
      <Autocomplete
        multiple
        freeSolo
        options={localOptions}
        value={impacts}
        onChange={(_, newValue) => {
          handleAddImpact(newValue as string[]);
          const newOptions = newValue.filter(
            (value: any) => !localOptions.includes(value)
          );
          setLocalOptions([...localOptions, ...newOptions]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Cadastre ou remova impactos ('Enter' para adicionar outro)"
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
