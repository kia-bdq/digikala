import "./productDetails.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch} from "react-redux";
import { addToCart} from "../../redux/cartSlice";
import RatingStars from "../ratingStars/RatingStars";
import { useState } from "react";
import LoadingBubbles from "../loadingBubbles/LoadingBubbles";

const ProductDetails = () => {
    const id = useParams();
    const {data, isPending, error} = useFetch(`https://www.digikala.com/front-end/product/${id.id}/`);
    const dispatch = useDispatch();
    const [wasAdded, setWasAdded] = useState(false);
    

    const add = ()=>{
        dispatch(addToCart({id: data.data.product.id, 
            name:data.data.product.title, picture:data.data.product.images.main,
            price: data.data.product.price.selling_price, count: 1}));
        setWasAdded(true);
        console.log(wasAdded)
        setTimeout(()=> setWasAdded(false),7000);
        // setTouched(true);
        // setTimeout(()=> setAdded(false), 2000);
    }


    return (
        <div className="productContainer">
            {error && <p>{error}</p>}
            {isPending && <div className="loading"><LoadingBubbles /> </div> } 
            {data && 
            <div className="wrapper">
                <div className="popUpDiv">
                    <p className="pop">به سبد خرید افزوده شد</p>
                </div>
                <div className="productPic">
                    <img src={data.data.product.images.main} alt={data.data.product.title} />
                </div>
                <div className="detailsSide">
                    <h3>{data.data.product.title}</h3>
                    <div className="rateDetails">
                        <RatingStars rate={data.data.product.rating.rate} id="ratingSt"/>
                        <p className="votes">({data.data.product.rating.count} رأی)</p>
                    </div>
                    <div className="priceDiv">
                        {data.data.product.price.selling_price !== data.data.product.price.rrp_price && 
                            <p className="rrp">
                            {data.data.product.price.rrp_price.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>}

                        <p className="offPrice">
                            {data.data.product.price.selling_price.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                        </p>
                    </div>
                    
                    <button onClick={ add } className="addToCartBtn"> افزودن به سبد خرید</button>
                </div>
                <div id="blob"></div>
            </div>}

            


        </div>
    );
}
 
export default ProductDetails;