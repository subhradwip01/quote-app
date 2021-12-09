import QuoteList from "../components/quotes/QuoteList"
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import React, { useEffect } from 'react'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";



const AllQuotes = () => {
  console.log("renderes");
  const {sendRequest,status,data:loadedQuotes,error}=useHttp(getAllQuotes,true);
  useEffect(() => {
    console.log("effect");
     sendRequest();
  }, [sendRequest]);

  if(status==='pending'){
    return(
      <div className="centered">
        <LoadingSpinner/>
      </div>
    )
  }
  if(error){
    return <p className="centered focused">{error}</p>
  }

  if(status==="completed" && (!loadedQuotes || loadedQuotes.length===0)){
    return <NoQuotesFound/>
  }

  return <QuoteList quotes={loadedQuotes}/>
};

export default AllQuotes;