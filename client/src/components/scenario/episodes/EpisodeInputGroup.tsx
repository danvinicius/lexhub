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

interface EpisodeInputGroupProps {
  episodes: IEpisode[];
  setEpisodes: React.Dispatch<React.SetStateAction<IEpisode[]>>;
}

const EpisodeInputGroup: React.FC<EpisodeInputGroupProps> = ({
	episodes,
	setEpisodes,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleEpisodeChange = useCallback(
		(index: number, field: keyof IEpisode, value: any) => {
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

interface EpisodeFormGroupProps {
  episode: IEpisode;
  index: number;
  onEpisodeChange: (index: number, field: keyof IEpisode, value: any) => void;
  episodesLength: number;
}

// Usando React.memo para evitar re-renderizações desnecessárias
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

export default EpisodeInputGroup;
