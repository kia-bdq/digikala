import { useState, useEffect } from "react";

const useFetch = (url) => {
    // console.log(url);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        window.scrollTo(0,0);
        console.log(url)

        fetch(url, {signal: abortCont.signal, 
                    headers: {token: 'mpfKW9ghVTCSuBZ7qTkSmEyvL38ShZxv'}})
            .then(res => {
                if(!res.ok){
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(data => { 
                setData(data);
                setIsPending(false);
                setError(null);
                
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


    return {data, isPending, error}

}
 
export default useFetch;