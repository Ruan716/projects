import React from 'react';


import {format, formatDistanceToNow}from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import {Avatar} from './Avatar';
import styles from './Post.module.css';
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author{
  name: string;
  role: string;
  avatarUrl: string;

}

interface Content{
  type: 'paragraph' | 'link';
  content: string;

}

export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps{
  post: PostType;

}
export function Post({post}:PostProps){
  const [comments,setComments] =useState([
    'Post muito bacana, hein?'
  ])

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted =  format(post.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {locale: ptBr})

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,{
    locale: ptBr,
    addSuffix: true

  });

  function handleCreateNewComment(event:FormEvent){
    event.preventDefault();
    setComments([...comments,newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment (commentToDelete: string){
    const commentsWithouDeletedOne = comments.filter(comment=>{
      return comment != commentToDelete;
    })


    setComments(commentsWithouDeletedOne);
  }
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  const isNewCommentEmpty = newCommentText.length===0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          
        <Avatar  src={post.author.avatarUrl} />
        
        </div>
        <div className={styles.authorInfo}>
        <strong>{post.author.name}</strong>
        <span>{post.author.role}</span>
        
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>


      </header>
      <div className={styles.content} > 
        {post.content.map(line =>{
          if (line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          } else if (line.type ==='link'){
            return <p key={line.content}><a href="">{line.content} </a>  </p>
          }
        })}
        
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
         name='comment' 
         placeholder='Deixe um comentario'
         value={newCommentText}
         onChange={handleNewCommentChange}
         onInvalid={handleNewCommentInvalid} 
         required 
        />

        <footer>
        <button type='submit' disabled={isNewCommentEmpty}>
          Publicar
        </button>
        </footer>

      </form>

      <div className={styles.commentList}>
        {comments.map(comments =>{
          return (
            <Comment 
              key={comments} 
              content={comments} 
              onDeleteComment={deleteComment}
            />  
          )
        })}
      </div>
    </article>

  )
}