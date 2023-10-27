import React, { useState } from "react";
import "./LoginBtn.css"; // Import your CSS file
import Login from "./Login";

const LoginBtn = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const cancelLoginHandler = () => {
    setIsLogin(false);
  };

  const userDatahandler = async (userData)=>{
   await  fetch('https://react-http-ba874-default-rtdb.firebaseio.com/users.json',{
      method: 'POST',
      body: JSON.stringify({
        user:userData,
        
      })
    });

  }
  
  return (
    <React.Fragment>
      {isLogin && <Login onClose={cancelLoginHandler} onSave={userDatahandler} />}
      <button type="button" onClick={loginHandler} className="login-link">
        Sign In
      </button>
    </React.Fragment>
  );
};

export default LoginBtn;
