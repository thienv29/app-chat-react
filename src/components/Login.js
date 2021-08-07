import React from 'react';
import {GoogleOutlined,FacebookOutlined} from '@ant-design/icons';
import 'firebase/app';
import { auth } from './Firebase';
import firebase from 'firebase/app';

export default function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Chat app</h2>
                <div className="login-button google"
                    onClick={() => {
                      auth.signInWithRedirect(new   firebase.auth.GoogleAuthProvider())
                    }}
                >
                    <GoogleOutlined/> Login with google
                </div>
                <br/>
                <div className="login-button facebook"
                 onClick={() => {
                    auth.signInWithRedirect(new   firebase.auth.FacebookAuthProvider())
                  }}
                >
                    <FacebookOutlined/> Login with facebook
                </div>
            </div>
        </div>
    )
}
