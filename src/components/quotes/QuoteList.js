import { Fragment } from 'react';
import {useHistory,useLocation} from "react-router-dom"

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes=(quotes,sorting)=>{
  return quotes.sort((quoteA,quoteB)=>{
      if(sorting==="asc"){
        return quoteA.id>quoteB.id?1:-1;
      }
      if(sorting==="dsc"){
        return quoteB.id>quoteA.id?1:-1;
      }
  })
}


const QuoteList = (props) => {
  const history=useHistory();
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const sorting=(queryParams.get("sorting"));
  const sortedQuotes=sortQuotes(props.quotes, sorting);
  const changeSortingHanlder=()=>{
    const query = sorting === "asc" ? "dsc" : "asc";
    history.push({
      pathname:location.pathname,
      search:`?sorting=${query}`
    })

    
    // history.push(`${location.pathname}?sorting=${query}`)
     
 }
  


  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHanlder}>Sort {sorting==="asc"? "Descending" : "Assecnding"}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
