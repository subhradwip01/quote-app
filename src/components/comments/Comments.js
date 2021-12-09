import { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from "./CommentsList"
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params=useParams();
  const {quoteId}=params
  const {sendRequest,status,data:loadedComments,error}=useHttp(getAllComments);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest]);
  let comments;
  if(status==="pending"){
     comments=(
       <div className="centered">
         <LoadingSpinner></LoadingSpinner>
       </div>
     )
  }

  if(error){
    return (
      <p>Unable to fetch comment</p>
    )
  }
  if(status==="completed" && loadedComments){
    console.log(loadedComments);
    comments=<CommentsList comments={loadedComments}/>
  }
  if(status==="comleted" && (!loadedComments || loadedComments.length===0)){
    comments=<p>No Comments yet...</p>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedCommentHandler=()=>{
     
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params.quoteId} onAddComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
