import { ReactNode, useEffect, useState } from 'react';
import './Banner.scss';

const Banner = (): ReactNode => {
	const [image, setImage] = useState('');
	const currentHour = new Date().getHours();
	let time;
	if (currentHour > 6 && currentHour <= 12)
		time = 'morning';
	else if (currentHour > 12 && currentHour <= 18)
		time = 'afternoon';
	else if (currentHour > 18 || currentHour <= 6)
		time = 'evening';
	else
		time = 'night';

	useEffect(() => {
		const fetchImage = async () => {
			const response = await import(`../../assets/img/header_bg_${time}.jpeg`); // change relative path to suit your needs
			setImage(response.default);
		};

		fetchImage();
	}, [time]);
	return <div className="banner" style={{ backgroundImage: `url(${image})`, color: 'red' }}></div>;
};

export default Banner;
