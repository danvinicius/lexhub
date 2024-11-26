import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { IEpisode } from '../../../shared/interfaces';
import { FC, memo } from 'react';
import { EpisodeFormGroup } from './EpisodeFormGroup';

interface NonSequentialEpisodeFormGroupProps {
    episode: IEpisode;
    index: number;
    onEpisodeChange: (index: number, field: keyof IEpisode, value: string | number | { id: string; type: string; description: string; restriction: string; }[], nestedIndex?: number) => void;
    episodesLength: number;
	onDeleteEpisode: (index: number, nestedIndex?: number) => void;
  }

// Usando memo para evitar re-renderizações desnecessárias
const NonSequentialEpisodeFormGroup: FC<NonSequentialEpisodeFormGroupProps> = memo(
	({ episode, index, onEpisodeChange, episodesLength, onDeleteEpisode }: NonSequentialEpisodeFormGroupProps) => {

		const handleAddNonSequentialEpisode = () => {
			const newEpisode = {
				id: '',
				description: '',
				type: '',
				restriction: '',
			};
			onEpisodeChange(
				index,
				'nonSequentialEpisodes',
				[...(episode.nonSequentialEpisodes || []), newEpisode]
			);
		};

		const handleDelete = (nestedIndex: number) => {
			onDeleteEpisode(index, nestedIndex);
		};

		
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
				<div className="non-sequential-episode-form-group">
					{episode.nonSequentialEpisodes?.map((nonSequantialEpisode, nestedIndex) => (
						<EpisodeFormGroup
							key={nestedIndex}
							episode={nonSequantialEpisode}
							index={nestedIndex}
							onEpisodeChange={(nestedIndex, field, value) =>
								onEpisodeChange(index, field, value, nestedIndex)
							}
							onDeleteEpisode={() => handleDelete(nestedIndex)}
							episodesLength={episode.nonSequentialEpisodes?.length || 0}
						/>
					))}
					<Button onClick={handleAddNonSequentialEpisode} variant="outlined" color="primary">
		Adicionar episódio não sequencial
					</Button>
				</div>
				
			</div>
		);
	}
);

NonSequentialEpisodeFormGroup.displayName = 'NonSequentialEpisodeFormGroup';

export {
	NonSequentialEpisodeFormGroup
};