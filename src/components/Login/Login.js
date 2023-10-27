import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from './Login.module.css';

const isEmpty = value => value.trim() === '';
const isLessThenEight = value => value.trim().length < 8;

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [isSubmit, setIsSubmit] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const [formValidity, setFormValidity] = useState({
        userName: true,
        password: true,
    });

    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);

    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }



    const loginFormhandler = (event) => {
        event.preventDefault();
        setIsSubmit(true);

        const formData = {
            username: userName,
            password: password,
        };
        console.log(formData);

        const nameIsValid = isEmpty(userName);
        const passwordIsValid = !isLessThenEight(password);

        const formIsValid = nameIsValid && passwordIsValid;

        setFormValidity({
            username: userName,
            password: password
        })
        if (formIsValid) {
            return;
        }
        props.onSave({
            username:userName,
            password:password,
        });
        

        setUserName('');
        setPassword('');
        setDidSubmit(false);
        setDidSubmit(true);
    }

    const nameControlClasses = `${classes.control} ${formValidity.userName ? '' : classes.invalid
        }`

    const passwordControlClasses = `${classes.control} ${formValidity.password ? '' : classes.invalid
        }`

    

    const myFormData = <React.Fragment>

        <form onSubmit={loginFormhandler} >
            <h2>Sign in</h2>

            <div className={nameControlClasses}>
                <label htmlFor="username"  >Username</label>
                <input type="text" value={userName} required onChange={userNameChangeHandler} />
                {!formValidity.userName && <p>please enter username !</p>}
            </div>

            <div className={passwordControlClasses}>
                <label htmlFor="password" >Password</label>
                <input type="text" min="8" value={password} required onChange={passwordChangeHandler} />
                {!formValidity.password && <p>please enter password !</p>}
            </div>

            <div className={classes.actions}>
                <button type="submit" >sign in</button>
                {<button type="close" onClick={props.onClose}  >Close</button>}
            </div>


        </form>

    </React.Fragment>

     const isformLogin = <p>Succesfully login!</p>

    return (
        <Modal onClose={props.onClose} >

            {!isSubmit && !didSubmit && myFormData}
            {isSubmit && isformLogin}
            

        </Modal>
    );
};

export default Login;