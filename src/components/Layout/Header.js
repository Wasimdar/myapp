import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import LoginBtn from '../Login/LoginBtn';


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FoodFleet</h1>
        <HeaderCartButton onClick={props.onShowCart} />
       <LoginBtn />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
