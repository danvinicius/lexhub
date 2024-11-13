import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { ReactNode, useState } from 'react';
import Button from '../components/forms/Button';
import './css/Overview.scss';
import CreateProject from './CreateProject';

export const OverView = (): ReactNode => {
	const [isCreateProject, setIsCreateProject] = useState(false);
	const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
		backgroundColor: theme.palette.action.hover,
		borderRadius: theme.shape.borderRadius,
		height,
		content: '" "',
	}));
	return (

		<div className="overview">
			<Button theme="primary" text="Criar projeto" onClick={() => setIsCreateProject(true)}></Button>
			{isCreateProject && <CreateProject/>}
			{!isCreateProject && 
			<Grid container spacing={1}>
				<br /><br /><br />
				<Grid size={5} />
				<Grid size={12}>
					<Skeleton height={14} />
				</Grid>
				<Grid size={12}>
					<Skeleton height={14} />
				</Grid>
				<Grid size={4}>
					<Skeleton height={100} />
				</Grid>
				<Grid size={8}>
					<Skeleton height={100} />
				</Grid>

				<Grid size={12}>
					<Skeleton height={150} />
				</Grid>
				<Grid size={12}>
					<Skeleton height={14} />
				</Grid>

				<Grid size={3}>
					<Skeleton height={100} />
				</Grid>
				<Grid size={3}>
					<Skeleton height={100} />
				</Grid>
				<Grid size={3}>
					<Skeleton height={100} />
				</Grid>
				<Grid size={3}>
					<Skeleton height={100} />
				</Grid>
			</Grid>
			}
		</div>
	);
};