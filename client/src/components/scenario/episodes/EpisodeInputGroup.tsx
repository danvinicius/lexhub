import React, { useRef, useCallback } from 'react';
import {
	Button,
} from '@mui/material';
import { IEpisode } from '../../../shared/interfaces';
import './EpisodeInputGroup.scss';
import { EpisodeFormGroup } from './EpisodeFormGroup';

interface EpisodeInputGroupProps {
  episodes: IEpisode[];
  setEpisodes: Dispatch<SetStateAction<IEpisode[]>>;
}

const EpisodeInputGroup: FC<EpisodeInputGroupProps> = ({
	episodes,
	setEpisodes,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleEpisodeChange = useCallback(
		(index: number, field: keyof IEpisode, value: string | number) => {
			setEpisodes((prevEpisodes) =>
				prevEpisodes.map((episode, i) =>
					i === index ? { ...episode, [field]: value } : episode
				)
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

	return (
		<div className="episodes-form">
			<div className="episodes-form-wrapper" ref={scrollRef}>
				{episodes
					.sort((a, b) => {
						if (a.position > b.position) return 1;
						return -1;
					})
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

export default EpisodeInputGroup;
