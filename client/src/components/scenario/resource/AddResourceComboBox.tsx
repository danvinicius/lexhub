import { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";
import { ILexiconScenario } from "../../../shared/interfaces";

interface AddResourceComboBoxProps {
  resources: string[];
  setResources: React.Dispatch<React.SetStateAction<string[]>>;
  currentScenarioId: string
}

export const AddResourceComboBox = ({
  resources,
  setResources,
  currentScenarioId
}: AddResourceComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState([
    ...new Set(
      projectContext.project?.scenarios?.filter(scenario => scenario.id !== currentScenarioId)
        ?.map((scenario: ILexiconScenario) =>
          scenario.resources.map((resource) => resource.name.content)
        )
        .flat()
    ),
  ]);

  const handleAddResource = (newResources: string[]) => {
    setResources(newResources);
  };

  return (
    <div className="resources">
      <Autocomplete
        multiple
        freeSolo
        options={localOptions}
        value={resources}
        onChange={(_, newValue) => {
          handleAddResource(newValue as string[]);
          const newOptions = newValue.filter(
            (value: any) => !localOptions.includes(value)
          );
          setLocalOptions([...localOptions, ...newOptions]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Recursos"
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
                '& input': {
                  padding: '0.5rem 1rem',
                },
              },
              '& .MuiInputLabel-outlined': {
                color: 'var(--primary-text-color)',
              },
              '& .MuiInputLabel-outlined.Mui-focused': {
                color: 'var(--primary-text-color)',
              },
            }}
          />
        )}
      />
    </div>
  );
};
