import "./ratingStars.css"
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RatingStars = ({rate}) => {
    return ( 
        <div className="rating">
            <div className="rating-upper" style={{width: `${rate}%`}}>
                <span><FaStar /></span>
                <span><FaStar /></span>
                <span><FaStar /></span>
                <span><FaStar /></span>
                <span><FaStar /></span>
            </div>
            <div className="rating-lower">
                <span><FaRegStar /></span>
                <span><FaRegStar /></span>
                <span><FaRegStar /></span>
                <span><FaRegStar /></span>
                <span><FaRegStar /></span>
            </div>
        </div>
     );
}
 
export default RatingStars;