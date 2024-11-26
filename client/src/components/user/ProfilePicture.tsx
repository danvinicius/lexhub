import { IUser } from '../../shared/interfaces';
import './ProfilePicture.scss';

const getUsernameInitials = (name: string) => {
	return name.split(' ').map(word => word[0].toUpperCase()).slice(0, 2).join('');
};

const getRandomColorFromName = (name: string) => {
	function hashString(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
			hash = hash & hash;
		}
		return hash;
	}

	const hash = hashString(name.toLocaleLowerCase());
    
	const red = ((hash >> 16) & 0xFF) % 200;
	const green = ((hash >> 8) & 0xFF) % 100;
	const blue = (hash & 0xFF) % 200;

	const color = `#${red.toString(16).padStart(2, '0')}` +
                  `${green.toString(16).padStart(2, '0')}` +
                  `${blue.toString(16).padStart(2, '0')}`;

	return color;
};

interface ProfilePictureProps {
    user: IUser;
}

export const ProfilePicture = ({user}: ProfilePictureProps) => {
	return (
		user?.imageUrl ?
			<img src={user.imageUrl}/> :
			<div className="profilePicture"
				style={{backgroundColor: getRandomColorFromName(user.name)}}>
				<p>
					{getUsernameInitials(user.name)}

				</p>
			</div>
	);
};