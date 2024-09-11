import { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ProjectContext } from "../../../context/ProjectContext";
import { ILexiconScenario } from "../../../shared/interfaces";

interface AddExceptionComboBoxProps {
  exceptions: string[];
  setExceptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddExceptionComboBox = ({
  exceptions,
  setExceptions,
}: AddExceptionComboBoxProps) => {
  const projectContext = useContext(ProjectContext);

  const [localOptions, setLocalOptions] = useState([
    ...new Set(
      projectContext.project?.scenarios
        ?.map((scenario: ILexiconScenario) =>
          scenario.exceptions.map((exception) => exception.description.content)
        )
        .flat()
    ),
  ]);

  const handleAddException = (newExceptions: string[]) => {
    setExceptions(newExceptions);
  };

  return (
    <div className="exceptions">
      <p>Exceções do cenário</p>
      <br />
      <br />
      <br />
      <Autocomplete
        multiple
        freeSolo
        options={localOptions}
        value={exceptions}
        onChange={(_, newValue) => {
          handleAddException(newValue as string[]);
          const newOptions = newValue.filter(
            (value: any) => !localOptions.includes(value)
          );
          setLocalOptions([...localOptions, ...newOptions]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Exceções"
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
