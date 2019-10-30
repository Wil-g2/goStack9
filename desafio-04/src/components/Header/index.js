import React, { Component } from 'react'
import './styles.css';
import logo from '../../assets/img/logo.svg';

class Header extends Component {
  render(){
    return(
      <header>      
          <img src={logo} alt="logo"/>
          <div className="profile">
            <span>Meu Perfil</span>
            <i className="material-icons">account_circle</i>
          </div>
      </header>      
    );
  }
}

export default Header;