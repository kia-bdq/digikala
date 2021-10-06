import "./home.css";
import ProductCard from "../productCard/ProductCard";
import { useState, useCallback,useRef } from "react";
import useInfinitFetch from "../../hooks/useInfinitFetch";
import LoadingBubbles from "../loadingBubbles/LoadingBubbles";

const Home = () => {
    const observer = useRef();
    const [params, setParams] = useState({page: 1, rows: 28});
    const {data,isPending, error, hasMore} = 
                useInfinitFetch(`https://www.digikala.com/front-end/search/?`+ new URLSearchParams(params));

    // const loadMore = () =>{
    //     const paramsTemplate = {...params};
    //     paramsTemplate.page = paramsTemplate.page + 1;
    //     setParams(paramsTemplate);
    //     console.log(params);
        
    // }

    const lastItem = useCallback(
        (node) => {
        if (isPending) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                const paramsTemplate = {...params};
                paramsTemplate.page = paramsTemplate.page + 1;
                setParams(paramsTemplate);  
            }
        });
        if (node) observer.current.observe(node);
        },
        [isPending, hasMore, params]
    );

    return ( 
        <section>
            <div className="mainContainer">
                <div className="filter">
                    
                </div>

                <div className="pList">
                
                    {data && data.map((product, i) => 
                        {
                            if(data.length === i +1){
                                return <div ref={lastItem} key={product.id}>
                                <ProductCard id={product.id}
                                    image={product.images.main}
                                    title={product.title}
                                    price={product.price.selling_price}  />
                                </div>
                            }else{
                                return <div key={product.id}>
                                <ProductCard id={product.id}
                                    image={product.images.main}
                                    title={product.title}
                                    price={product.price.selling_price}  />
                                </div>
                            }
                        }
                    )}               
                    {isPending && <div className="loading"><LoadingBubbles /> </div>}
                    {error && <p>{error}</p>}
                </div>
            </div>   
        </section>
     );
}
 
export default Home;