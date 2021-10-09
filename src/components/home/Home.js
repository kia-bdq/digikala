import "./home.css";
import ProductCard from "../productCard/ProductCard";
import { useState, useCallback,useRef } from "react";
import useInfinitFetch from "../../hooks/useInfinitFetch";
import LoadingBubbles from "../loadingBubbles/LoadingBubbles";
import Filters from "../filters/filters";
import {FaSearch} from 'react-icons/fa';

const Home = () => {
    const observer = useRef();
    const [params, setParams] = useState({changed: false, page: 1, rows: 28});
    const {changed, ...rest} = params;
    const [q, setQ] = useState("")
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

    const search = (e) =>{
        e.preventDefault();

        if(q.length > 0){
            const paramsTemplate = {...params};
            paramsTemplate.page = 1;
            paramsTemplate.q = q;
            paramsTemplate.changed = true;
            setParams(paramsTemplate); 
        } else{
            const paramsTemplate = {...params};
            paramsTemplate.page = 1;
            delete paramsTemplate.q;
            paramsTemplate.changed = true;
            setParams(paramsTemplate); 
        }
    }

    return ( 
        <section>
            <div className="mainContainer">
                <div className="filter">
                    <h2 className="fTitle">فیلترها</h2>
                    <div className="filtersDiv">
                        {filters && <Filters filterList={filters} params={params} setParams={setParams}/>}
                    </div>
                    <div className="searchDiv">
                        <form className="searchForm">
                            <input
                                type="text"
                                id="header-search"
                                placeholder="جستجو در کالاها"
                                name="s" 
                                onChange={(e)=>setQ(e.target.value)}
                            />
                            <button type="submit" onClick={search}><FaSearch/></button>
                        </form>
                    </div>
                </div>

                <div className="pList">
                {data && <h2 className="pTitle">کالاها</h2>}
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