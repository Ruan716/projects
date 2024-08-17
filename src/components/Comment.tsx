import React from 'react';


import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css'
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string)=> void;
}

export function Comment({content, onDeleteComment}:CommentProps){
  
  const [likeCount,setLikeCount] = useState(0);

  function handleDeleteComment(){ 
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount((state)=>{
      return state+1
    });
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/RuanVCLima.png" alt=''/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>

          <header>
            <div className={styles.authorAndTime}>

              <strong>Ruan Victor</strong>

              <time title='12 de agosto ás 07:23h' dateTime="2024-08-12 07:23:50">Cerca de 1h atrás</time> 

            </div>
            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
              
            </button> 
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span> {likeCount} </span>

          </button>

        </footer>
      </div>
      
    </div>
  );
}