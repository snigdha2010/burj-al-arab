import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);;
const Login = () => {
const [logedInUser,setLoggedInUser] = useContext(UserContext)
const history = useHistory();
const location = useLocation();
const {from} = location.state || {from:{pathname: "/"}}

    const googleSignIn = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const{displayName,email} = result.user;
            const signedInUser = {name:displayName, email:email}
            setLoggedInUser(signedInUser)
            storeAuthToken();
            history.replace(from);
            

          }).catch(function(error) {
            var errorCode = error.code;
           
            // ...
          });
        }
        const storeAuthToken = () =>{
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
                sessionStorage.setItem('token',idToken);
                console.log(idToken)
                history.replace(from);
              }).catch(function(error) {
                // Handle error
              });
        }
        

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={googleSignIn} >GoogleSignin</button>

        </div>
    );
};

export default Login;