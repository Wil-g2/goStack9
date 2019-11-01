import React, { Component } from 'react'
import './styles.css';
import Post from '../Post';
class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [
        {
          id: 1,
          author: {
            name: 'Willian Gaudencio',
            avatar: 'https://avatars1.githubusercontent.com/u/26700193?s=40&v=4'
          },
          date: '31 Out 2019',
          content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
          comments: [
            {
              id: 2,
              author: {
                name: 'Diego Fernandes',
                avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4'
              },
              date: '04 Jun 2019',
              content:
                'A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)'
            }
          ]
        },
        {
          id: 3,
          author: {
            name: 'Wesley',
            avatar: 'https://i.pravatar.cc/150?img=56'
          },
          date: '31 Out 2019',
          content:
            'Fala galera, beleza?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
          comments: [
            {
              id: 4,
              author: {
                name: 'Carlos Lisboa',
                avatar: 'https://i.pravatar.cc/150?img=54'
              },
              date: '31 Out 2019',
              content:
                'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!'
            },
            {
              id: 5,
              author: {
                name: 'Felipe Silva',
                avatar: 'https://i.pravatar.cc/150?img=11'
              },
              date: '31 Out 2019',
              content:
                'Que maaaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes'
            }
          ]
        },
        {
          id: 6,
          author: {
            name: 'Bruno Costa',
            avatar: 'https://i.pravatar.cc/150?img=69'
          },
          date: '31 Out 2019',
          content:
            'Fala galera, beleza?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
          comments: [
            {
              id: 4,
              author: {
                name: 'Daniela Rezende',
                avatar: 'https://i.pravatar.cc/150?img=5'
              },
              date: '04 Jun 2019',
              content:
                'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!'
            },
            {
              id: 5,
              author: {
                name: 'Leandro Almeida',
                avatar: 'https://i.pravatar.cc/150?img=11'
              },
              date: '31 Out 2019',
              content:
                'Que maaaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes'
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
           <Post key={post.id} post={post}  />
          )}                 
      </section>    
    );
  }
}
export default PostList;