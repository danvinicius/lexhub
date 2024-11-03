import React, { useRef, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { IEpisode } from "../../../shared/interfaces";
import "./EpisodeInputGroup.scss";

interface EpisodeInputGroupsProps {
  episodes: IEpisode[];
  setEpisodes: React.Dispatch<React.SetStateAction<IEpisode[]>>;
}

const EpisodeInputGroups: React.FC<EpisodeInputGroupsProps> = ({
  episodes,
  setEpisodes,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEpisodeChange = useCallback(
    (index: number, field: keyof IEpisode, value: any) => {
      setEpisodes((prevEpisodes) => {
        const updatedEpisodes = [...prevEpisodes];
        const currentEpisode = updatedEpisodes[index];
  
        // Cria uma cópia do episódio atual
        const newEpisode = { ...currentEpisode };
  
        if (field === "position") {
          const newPosition = value;
          const conflictingEpisodeIndex = updatedEpisodes.findIndex(
            (ep) => ep.position === newPosition
          );
  
          if (conflictingEpisodeIndex !== -1 && conflictingEpisodeIndex !== index) {
            // Troca as posições entre o episódio atual e o episódio que já está na nova posição
            updatedEpisodes[conflictingEpisodeIndex] = {
              ...updatedEpisodes[conflictingEpisodeIndex],
              position: newEpisode.position, // Armazena a posição antiga do episódio que está sendo alterado
            };
          }
  
          // Atualiza a posição do episódio que está sendo editado
          newEpisode.position = newPosition;
        } else {
          // Atualiza outros campos (description, type, restriction) normalmente
          newEpisode[field] = value;
        }
  
        // Substitui o episódio atualizado na lista
        updatedEpisodes[index] = newEpisode;
  
        return updatedEpisodes;
      });
    },
    [setEpisodes]
  );
  

  const handleAddEpisode = () => {
    const newEpisode: IEpisode = {
      id: "",
      position: episodes.length + 1,
      description: "",
      type: "",
      restriction: "",
    };
    setEpisodes((prevEpisodes) => [...prevEpisodes, newEpisode]);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="episodes-form">
      <div className="episodes-form-wrapper" ref={scrollRef}>
        {episodes
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((episode, index) => (
            <EpisodeFormGroup
              key={index}
              episode={episode}
              index={index}
              onEpisodeChange={handleEpisodeChange}
              episodesLength={episodes?.length}
            />
          ))}
      </div>
      <Button onClick={handleAddEpisode} variant="outlined" color="primary">
        Adicionar Episódio
      </Button>
    </div>
  );
};

interface EpisodeFormGroupProps {
  episode: IEpisode;
  index: number;
  onEpisodeChange: (index: number, field: keyof IEpisode, value: any) => void;
  episodesLength: number;
}

const EpisodeFormGroup: React.FC<EpisodeFormGroupProps> = React.memo(
  ({ episode, index, onEpisodeChange, episodesLength }) => {
    return (
      <div className="episode-form-group">
        <div className="episode-position">
          <FormControl fullWidth>
            <InputLabel>Posição</InputLabel>
            <Select
              value={episode.position}
              label="Posição"
              onChange={(e) =>
                onEpisodeChange(index, "position", e.target.value)
              }
            >
              {[...Array(episodesLength)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="episode-description">
          <TextField
            label="Descrição"
            placeholder="Digite a descrição"
            multiline
            fullWidth
            value={episode.description}
            onChange={(e) =>
              onEpisodeChange(index, "description", e.target.value)
            }
          />
        </div>

        <div className="episode-type">
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={episode.type}
              label="Tipo"
              onChange={(e) => onEpisodeChange(index, "type", e.target.value)}
            >
              <MenuItem value="condicional">Condicional</MenuItem>
              <MenuItem value="opcional">Opcional</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="episode-restriction">
          <TextField
            label="Restrição"
            placeholder="Digite a restrição"
            multiline
            fullWidth
            value={episode.restriction}
            onChange={(e) =>
              onEpisodeChange(index, "restriction", e.target.value)
            }
          />
        </div>
      </div>
    );
  }
);

export default EpisodeInputGroups;
