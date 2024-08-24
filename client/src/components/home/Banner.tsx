import { useEffect, useState } from "react";
import './Banner.scss';

const Banner = () => {
  const [image, setImage] = useState('');
  const currentHour = new Date().getHours();
  const time =
    currentHour > 6 && currentHour <= 12
      ? "morning"
      : currentHour > 12 && currentHour <= 18
      ? "afternoon"
      : currentHour > 18 || currentHour <= 6
      ? "evening"
      : "night";

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
