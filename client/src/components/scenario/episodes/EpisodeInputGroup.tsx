import { useRef, useCallback, SetStateAction, Dispatch, FC } from 'react';
import { Button } from '@mui/material';
import { IEpisode } from '../../../shared/interfaces';
import './EpisodeInputGroup.scss';
import { EpisodeFormGroup } from './EpisodeFormGroup';
import { NonSequentialEpisodeFormGroup } from './NonSequentialEpisodeFormGroup';

interface EpisodeInputGroupProps {
    episodes: IEpisode[];
    setEpisodes: Dispatch<SetStateAction<IEpisode[]>>;
}

const EpisodeInputGroup: FC<EpisodeInputGroupProps> = ({ episodes, setEpisodes }) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleEpisodeChange = useCallback(
		(index: number, field: keyof IEpisode, value: string | number | { id: string; type: string; description: string; restriction: string; }[], nestedIndex?: number) => {
			setEpisodes((prevEpisodes) =>
				prevEpisodes.map((episode, i) => {
					if (i === index) {
						if (nestedIndex !== undefined && episode.nonSequentialEpisodes) {
							// Atualizando um episódio não sequencial
							const updatedNonSequentialEpisodes = episode.nonSequentialEpisodes.map(
								(nonSeqEpisode, j) =>
									j === nestedIndex ? { ...nonSeqEpisode, [field]: value } : nonSeqEpisode
							);
							return { ...episode, nonSequentialEpisodes: updatedNonSequentialEpisodes };
						}
						// Atualizando o episódio principal
						return { ...episode, [field]: value };
					}
					return episode;
				})
			);
		},
		[setEpisodes]
	);

	const handleAddEpisode = () => {
		const newEpisode: IEpisode = {
			id: '',
			position: episodes.length + 1,
			description: '',
			type: '',
			restriction: '',
		};
		setEpisodes((prevEpisodes) => [...prevEpisodes, newEpisode]);

		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	};

	const handleAddNonSequentialEpisodesGroup = () => {
		const newGroup: IEpisode = {
			id: '',
			position: episodes.length + 1,
			nonSequentialEpisodes: [
				{
					id: '',
					description: '',
					type: '',
					restriction: '',
				},
			],
		};
		setEpisodes((prevEpisodes) => [...prevEpisodes, newGroup]);

		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	};

	const handleDeleteEpisode = useCallback(
		(index: number, nestedIndex?: number) => {
			setEpisodes((prevEpisodes) => {
				if (nestedIndex !== undefined) {
					// Removendo um episódio não sequencial
					return prevEpisodes.flatMap((episode, i) => {
						if (i === index && episode.nonSequentialEpisodes) {
							const updatedNonSequentialEpisodes = episode.nonSequentialEpisodes.filter((_, j) => j !== nestedIndex);
	
							// Se não houver mais episódios no grupo, remova o grupo
							if (updatedNonSequentialEpisodes.length === 0) {
								return [];
							}
	
							return [{ ...episode, nonSequentialEpisodes: updatedNonSequentialEpisodes }];
						}
						return [episode];
					});
				} else {
					// Removendo um episódio principal
					return prevEpisodes
						.filter((_, i) => i !== index)
						.map((episode, i) => ({
							...episode,
							position: i + 1, // Atualiza posições após remoção
						}));
				}
			});
		},
		[setEpisodes]
	);
	
	

	return (
		<div className='episodes-form'>
			<div className='episodes-form-wrapper' ref={scrollRef}>
				{episodes
					.sort((a, b) => {
						if (a.position > b.position) return 1;
						return -1;
					})
					.map((episode, index) =>
						episode.nonSequentialEpisodes ? (
							<NonSequentialEpisodeFormGroup
								key={index}
								episode={episode}
								index={index}
								onEpisodeChange={handleEpisodeChange}
								episodesLength={episodes.length}
								onDeleteEpisode={handleDeleteEpisode}
							/>
						) : (
							<EpisodeFormGroup
								key={index}
								episode={episode}
								index={index}
								onEpisodeChange={handleEpisodeChange}
								episodesLength={episodes?.length}
								onDeleteEpisode={handleDeleteEpisode}
							/>
						)
					)}
			</div>
			<div className='flex gap-5'>
				<Button onClick={handleAddEpisode} variant='outlined' color='primary'>
                    Adicionar episódio
				</Button>
				<Button onClick={handleAddNonSequentialEpisodesGroup} variant='outlined' color='primary'>
                    Adicionar grupo de episódios não sequenciais
				</Button>
			</div>
		</div>
	);
};

export default EpisodeInputGroup;
