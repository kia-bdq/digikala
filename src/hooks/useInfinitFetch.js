import { useState, useEffect } from "react";

const useInfinitFetch = (url) => {
    
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsPending(true);
        const abortCont = new AbortController();
        console.log(url)

        fetch(url, {signal: abortCont.signal, 
                    headers: {token: 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv'}})
            .then(res => {
                if(!res.ok){
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(json => { 
                setData(old => [...new Set([...old, ...json.data.products])])
                setIsPending(false);
                setError(null);

                if(json.data.pager.total_Pages>=20 && json.data.pager.current_Page === 20)
                {
                    setHasMore(false);
                    console.log(1)
                } else if(json.data.pager.total_Pages === json.data.pager.current_Page){
                    setHasMore(false);
                    console.log(2)
                }
                // console.log(data);
                
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
    }, [url]);


    return {data, isPending, error, hasMore}

}
 
export default useInfinitFetch;