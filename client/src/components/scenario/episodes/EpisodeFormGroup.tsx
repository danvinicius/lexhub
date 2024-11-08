import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { IEpisode } from '../../../shared/interfaces';
import { FC, memo } from 'react';

interface EpisodeFormGroupProps {
    episode: IEpisode;
    index: number;
    onEpisodeChange: (index: number, field: keyof IEpisode, value: string | number) => void;
    episodesLength: number;
  }

// Usando memo para evitar re-renderizações desnecessárias
const EpisodeFormGroup: FC<EpisodeFormGroupProps> = memo(
	({ episode, index, onEpisodeChange, episodesLength }: EpisodeFormGroupProps) => {
		return (
			<div className="episode-form-group">
				<div className="episode-position">
					<FormControl fullWidth>
						<InputLabel>Posição</InputLabel>
						<Select
							value={episode.position}
							label="Posição"
							onChange={(e) =>
								onEpisodeChange(index, 'position', e.target.value)
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
							onEpisodeChange(index, 'description', e.target.value)
						}
					/>
				</div>

				<div className="episode-type">
					<FormControl fullWidth>
						<InputLabel>Tipo</InputLabel>
						<Select
							value={episode.type}
							label="Tipo"
							onChange={(e) => onEpisodeChange(index, 'type', e.target.value)}
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
							onEpisodeChange(index, 'restriction', e.target.value)
						}
					/>
				</div>
			</div>
		);
	}
);

EpisodeFormGroup.displayName = 'EpisodeFormGroup';

export {
	EpisodeFormGroup
};