import { useState, useEffect } from "react";

const useInfinitFetch = (url,restart) => {
    
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const abortCont = new AbortController();

        setHasMore(true);
        setIsPending(true);
        if(restart === true){
            //Reset when filters change
            setData([]);
        }

        
        fetch(url, {signal: abortCont.signal, 
                    headers: {token: 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv'}})
            .then(res => {
                if(!res.ok){
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(json => { 
                setFilters(json.data.filters);

                // Query search results had duplicat values so we had to fix that 
                setData(old => [...new Map([...old, ...json.data.products]
                                            .map((item) => [item["id"], item])).values()])

                setIsPending(false);
                setError(null);


                // API just Allows to access 20 pages...
                if(json.data.pager.total_pages>=20 && json.data.pager.current_page === 20){
                    setHasMore(false);
                } else if(json.data.pager.total_pages === json.data.pager.current_page){
                    setHasMore(false);
                }
            })
            .catch(err =>{
                if( err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else{
                    setIsPending(false);
                    setError(err.message);
                }
            })
        return () => abortCont.abort();
    }, [url,restart]);


    return {data,filters, isPending, error, hasMore}

}
 
export default useInfinitFetch;