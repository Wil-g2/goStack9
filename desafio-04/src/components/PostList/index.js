import React, { Component } from 'react'
import './styles.css';

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [
        {
          id: 1,
          author: {
            name: "Julio Alcantara",
            avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
          },
          date: "04 Jun 2019",
          content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
          comments: [
            {
              id: 1,
              author: {
                name: "Diego Fernandes",
                avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
              },
              content: "Conteúdo do comentário"
            }
          ]
        },
        {
          id: 2,
          author: {
            name: "Julio Alcantara",
            avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
          },
          date: "04 Jun 2019",
          content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
          comments: [
            {
              id: 1,
              author: {
                name: "Diego Fernandes",
                avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
              },
              content: "Conteúdo do comentário"
            }
          ]
        },
        {
          id: 3,
          author: {
            name: "Julio Alcantara",
            avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
          },
          date: "04 Jun 2019",
          content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
          comments: [
            {
              id: 1,
              author: {
                name: "Diego Fernandes",
                avatar: "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
              },
              content: "Conteúdo do comentário"
            }
          ]
        }
      ]
    }
  }

  render(){    
    return(
      <section>
          {this.state.posts.map(post => 
            <div className="content">
              <ul className="post">
                <li key={post.id}>
                  <div className="info">
                    <img src={post.author.avatar} alt="profile image"/>
                    <div>
                      <strong>{post.author.name}</strong>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <p>{post.content}</p>
                  
                </li>            
              </ul>              
            </div>
          )}           
      </section>
    );
  }
}
export default PostList;