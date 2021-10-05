import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({id, title, image, price}) => {
    return ( 
        <div className="cardContainer">
            <Link to={`product/${id}`} className="card">
                <img src={image} alt={title}/>
               { /*<div className="cardDetails">
                    <p className="cardTitle">{title}</p>
                    <p className="price">{price}</p>    
                </div>*/}
            </Link>
        </div>
        
    );
}
 
export default ProductCard; 