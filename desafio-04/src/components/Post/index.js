import React from 'react'; 
import './styles.css';
import Comment from '../Comment';

function Post ({ post }){
  console.log(post);
  return(    
      <div className="content">
      <ul className="post">
        <li>
          <div className="info">
            <img src={post.author.avatar} alt="profile image"/>
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.date}</span>
            </div>
          </div>
          <p>{post.content}</p>
          <Comment comments={post.comments} />                  
        </li>            
      </ul>              
    </div>
    )
}

export default Post;