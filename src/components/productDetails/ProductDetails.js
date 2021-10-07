import "./productDetails.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch} from "react-redux";
import { addToCart} from "../../redux/cartSlice";

const ProductDetails = () => {
    const id = useParams();
    const {data, isPending, error} = useFetch(`https://www.digikala.com/front-end/product/${id.id}/`);
    const dispatch = useDispatch();


    const add = ()=>{
        dispatch(addToCart({id: data.data.product.id, name:data.data.product.title, picture:data.data.product.images.main,
        price: data.data.product.price.selling_price, count: 1}));
        // setAdded(true);
        // setTouched(true);
        // setTimeout(()=> setAdded(false), 2000);
    }


    return (
        <div className="productContainer">
            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            {data && 
            <div className="wrapper">
                <div className="productPic">
                    <img src={data.data.product.images.main} alt={data.data.product.title} />
                </div>
                <div className="detailsSide">
                    <h3>{data.data.product.title}</h3>
                    <p>{data.data.product.price.rrp_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                    <p>{data.data.product.price.selling_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                    <button onClick={ add } className="addToCartBtn"> افزودن به سبد خرید</button>
                </div>
            </div>}

            


        </div>
    );
}
 
export default ProductDetails;