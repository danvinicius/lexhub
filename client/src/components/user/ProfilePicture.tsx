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
    
    // Gera cores dentro de um intervalo específico que evita rosa/roxo
    let red = ((hash >> 16) & 0xFF) % 200;  // Reduz o máximo
    let green = ((hash >> 8) & 0xFF) % 200; // Ajuste do limite superior
    let blue = (hash & 0xFF) % 200;         // Ajuste do limite superior

    // Evitar tons com vermelho e azul elevados, mas verde baixo
    if (red > 150 && blue > 150 && green < 100) {
        green += 100; // Aumenta o verde para equilibrar
    }

    // Converter para string de cor hexadecimal
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