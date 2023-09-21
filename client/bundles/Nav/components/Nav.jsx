import React, { useEffect, useState } from 'react';
import style from './Nav.module.css';
import UserSignature from './UserSignature';
import SideMenu from './SideMenu';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('quoted-session')) {
      setLoggedIn(true);
    }
  }, []);


  const handleSignOut = () => {
    localStorage.removeItem('quoted-session');
    setLoggedIn(false);
  };

  return (
      <div className={style.nav}>
        <UserSignature setLoggedIn={setLoggedIn}/>
        <SideMenu setLoggedIn={setLoggedIn}/> 
      </div>
  );
};

export default Nav;