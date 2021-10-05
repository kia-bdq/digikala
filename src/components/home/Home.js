import "./home.css";
import ProductCard from "../productCard/ProductCard";
import { useState } from "react";
import useInfinitFetch from "../../hooks/useInfinitFetch";

const Home = () => {
    // const [pageNo, setPageNo] = useState(1);
    const [params, setParams] = useState({page: 1, rows: 28});
    const {data,isPending, error, hasMore} = useInfinitFetch(`https://www.digikala.com/front-end/search/?`+ new URLSearchParams(params));

    const changePage = () =>{
        const paramsTemplate = {...params};
        paramsTemplate.page = paramsTemplate.page + 1;
        setParams(paramsTemplate);
        console.log(params);
    }

    return ( 
        <section>
            <div className="mainContainer">
                <div className="filter">
                    
                </div>

                <div className="pList">
                    

                    {data && data.map((product) => 
                                <ProductCard  key={product.id} id={product.id}
                                image={product.images.main}
                                title={product.title}
                                price={product.price.selling_price}  />
                        )}               

                    {error && <p>{error}</p>}
                    {isPending && <p>Loading...</p>}
                </div>
            </div>
            <div>
                <button onClick={changePage}>بعدی</button>
            </div>
    
        </section>
       
     );
}
 
export default Home;