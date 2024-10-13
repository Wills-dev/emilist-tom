import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i === Math.ceil(rating)) {
      const decimal = rating % 1;
      if (decimal > 0.8) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (decimal > 0.4) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex-c gap-1 text-xl">{stars}</div>;
};

export default StarRating;
