import React from 'react';

import { Header } from './components/Header';
import {Post,PostType }from './components/Post'
import { Sidebar } from './components/Sidebar';
import './global.css';


import styles from './App.module.css';
//author:{ avatar_url: "", role:""}
// publishedAt: Date
//content: String

const posts: PostType[] = [
  {
    id:1,
    author:{
      avatarUrl:'https://github.com/RuanVCLima.png',
      name: 'Ruan Victor',
      role: 'Sla',
    },
    content: [
            {type: 'paragraph',content: 'Fala galeraa 👋'},

            {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },


            {type: 'link', content:'jane.design/doctorcare'}            
            
            ],
    publishedAt: new Date("2024-08-13T20:00:00")
  },
  {
    id:2,
    author:{
    avatarUrl:'https://github.com/maykbrito.png',
    name: 'Mike Brito',
    role: 'Educator',
    },
    content: [
            {type: 'paragraph',content: 'Fala galeraa 👋'},

            {type: 'paragraph',content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },


            {type: 'link',content:'jane.design/doctorcare'},            
            
            ],
    publishedAt: new Date("2024-08-05T17:30:00")
  },
];

export function App() {


  return (
   <div>
    <Header />
      
    <div className={styles.wrapper} >
      <Sidebar />

      <main>
        {posts.map(post =>{
          return (
          <Post 
            key={post.id}
            post = {post}
            
          />)
        })}

      </main>

    </div>
   </div>
   
  )
}

