import { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";
import { ILexiconScenario } from "../../../shared/interfaces";

// Supondo que o contexto das opções seja algo como o contexto abaixo:

interface AddActorComboBoxProps {
  actors: string[];
  setActors: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddActorComboBox = ({
  actors,
  setActors,
}: AddActorComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState([
    ...new Set(
      projectContext.project?.scenarios
        ?.map((scenario: ILexiconScenario) =>
          scenario.actors.map((actor) => actor.name.content)
        )
        .flat()
    ),
  ]);

  const handleAddActor = (newActors: string[]) => {
    setActors(newActors);
  };

  return (
    <div className="actors">
      <p>Atores do cenário</p>
      <br />
      <br />
      <br />
      <Autocomplete
        multiple
        freeSolo
        options={localOptions}
        value={actors}
        onChange={(_, newValue) => {
          handleAddActor(newValue as string[]);
          const newOptions = newValue.filter(
            (value: any) => !localOptions.includes(value)
          );
          setLocalOptions([...localOptions, ...newOptions]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Atores"
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
