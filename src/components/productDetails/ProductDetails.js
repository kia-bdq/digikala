import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";

const ProductDetails = () => {
    const id = useParams();
    const {data, isPending, error} = useFetch(`https://www.digikala.com/front-end/product/${id.id}/`);
    console.log(data);

    return (
        <div>
            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            {data && 
            <div>
                <img src={data.data.product.images.main} alt={data.data.product.title} />
                <h3>{data.data.product.title}</h3>
                <p>{data.data.product.price.selling_price}</p>
            </div>}
        </div>
    );
}
 
export default ProductDetails;