import "./home.css";
import ProductCard from "../productCard/ProductCard";
import { useState, useCallback,useRef } from "react";
import useInfinitFetch from "../../hooks/useInfinitFetch";
import LoadingBubbles from "../loadingBubbles/LoadingBubbles";
import Filters from "../filters/filters";

const Home = () => {
    const observer = useRef();
    const [params, setParams] = useState({changed: false, page: 1, rows: 28});
    const {changed, ...rest} = params;
    
    const {data,filters,isPending, error, hasMore} = 
                useInfinitFetch(`https://www.digikala.com/front-end/search/?`+ new URLSearchParams(rest), 
                        changed);


    const lastItem = useCallback(
        (node) => {
        if (isPending) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                const paramsTemplate = {...params};
                paramsTemplate.page = paramsTemplate.page + 1;
                paramsTemplate.changed = false;
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
                    {filters && <Filters filterList={filters} params={params} setParams={setParams}/>}
                </div>

                <div className="pList">
                
                    {data && data.map((product, i) => 
                        {
                            if(data.length === i +1){
                                return <div ref={lastItem} key={product.id}>
                                <ProductCard id={product.id}
                                    image={product.images.main}
                                    title={product.title}
                                    price={product.price.selling_price} />
                                </div>
                            }else{
                                return <div key={product.id}>
                                <ProductCard id={product.id}
                                    image={product.images.main}
                                    title={product.title}
                                    price={product.price.selling_price} />
                                </div>
                            }
                        }
                    )}     
                    {isPending && <div className="loading"><LoadingBubbles /> </div> }         
                    {data.length===0 && !isPending && <div className="notFound">کالایی یافت نشد! </div> }         
                    {error && <p>{error}</p>}
                </div>
            </div>   
        </section>
     );
}
 
export default Home;