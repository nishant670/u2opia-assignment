import React, { Component } from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'


import './Login.css'

const firebaseConfig = {
    apiKey: "AIzaSyBN0vfpj65TbVkDIPAh3L_sj8m4dDjVnmU",
    authDomain: "u2opia-assignment-app.firebaseapp.com",
    databaseURL: "https://u2opia-assignment-app.firebaseio.com",
    projectId: "u2opia-assignment-app",
    storageBucket: "u2opia-assignment-app.appspot.com",
    messagingSenderId: "795580806192",
    appId: "1:795580806192:web:a1e45e8ca3964947d6a9f5"
}

firebase.initializeApp(firebaseConfig);

class Login extends Component {

    state = {
        loginStatus: false
    }

    componentDidMount(){
        if(sessionStorage.getItem('token')){
            this.redirect();
        }
    }

    redirect = () => {
        this.props.history.push(`${process.env.PUBLIC_URL + '/'}`)
    }
    
    logout = () => {
        firebase.auth().signOut()
            .then(function () {
                sessionStorage.removeItem('token');
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    loginClick = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(result);
            const token = result.credential.accessToken;
            const user = result.user.displayName;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', user);
            // this.props.history.push(`${process.env.PUBLIC_URL + '/'}`)
            // this.redirect()
            window.location = "/";
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
        });
    }
    render() {
        console.log(this.props)
        console.log(this.state.loginStatus)
        let screen;
        if (sessionStorage.getItem('token')) {
            screen = <Redirect to={`${process.env.PUBLIC_URL + '/'}`} />
        }
        return (
            <div className="login-wrapper">
                {/* {screen} */}
                <button className="btn-google-login" onClick={this.loginClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                        <g fill="none">
                            <path fill="#FBBD00" d="M6.094 13c0-1.288.355-2.495.971-3.528V5.089H2.682C.942 7.349 0 10.102 0 13c0 2.898.943 5.652 2.682 7.911h4.383v-4.383c-.616-1.033-.971-2.24-.971-3.528z" />
                            <path fill="#0F9D58" d="M13 19.906l-3.047 3.047L13 26c2.899 0 5.652-.943 7.911-2.682v-4.379h-4.378c-1.042.62-2.254.967-3.533.967z" />
                            <path fill="#31AA52" d="M7.065 16.528l-4.383 4.383c.345.447.72.876 1.126 1.281C6.263 24.648 9.528 26 13 26v-6.094c-2.52 0-4.729-1.357-5.935-3.378z" />
                            <path fill="#3C79E6" d="M26 13c0-.79-.072-1.583-.213-2.355l-.114-.625H13v6.094h6.167c-.598 1.191-1.52 2.163-2.634 2.825l4.378 4.379c.447-.345.876-.72 1.281-1.126C24.648 19.737 26 16.472 26 13z" />
                            <path fill="#CF2D48" d="M17.883 8.117l.54.538 4.308-4.309-.539-.538C19.737 1.352 16.472 0 13 0L9.953 3.047 13 6.094c1.845 0 3.579.718 4.883 2.023z" />
                            <path fill="#EB4132" d="M13 6.094V0C9.528 0 6.263 1.352 3.808 3.808c-.406.405-.781.834-1.126 1.281l4.383 4.383C8.271 7.45 10.48 6.094 13 6.094z" />
                        </g>
                    </svg>
                    Continue with Google</button>
            </div>
        )
    }
}

export default Login
