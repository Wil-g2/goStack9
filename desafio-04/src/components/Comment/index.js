import React from 'react'; 
import './styles.css';

function Comment({ comments }){
  return (
   <ul className="comment"> {comments.map( c => 
      <li key={c.id}>        
          <img src={c.author.avatar} alt=""/>
          <div className="info">            
            <span> <strong>{c.author.name}</strong> {c.content}</span>
          </div>
      </li>
    )} </ul>
  );
}

export default Comment;