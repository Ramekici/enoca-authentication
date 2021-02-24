import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AuthHeader from './common/AuthHeader';
import './Auth.css';

const AuthPage = () => {

    const [toggle, setToggle] = useState(true);

    const toggleHandler = (pos) => setToggle(prevState => {
        if(pos){
            return setToggle(true)
        }
        return setToggle(false);
    });

    return (
        <section className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <AuthHeader
                        title="Giriş Yap"
                        toggleHandler={() => toggleHandler(true)}
                        openPos={toggle}
                    />
                    <AuthHeader
                        title="Üye Ol"
                        toggleHandler={() => toggleHandler(false)}
                        openPos={!toggle}
                    />
                </div>
                <div className="auth-content">
                    {toggle ?
                        <LoginPage />
                        : <RegisterPage />}
                </div>
            </div>
        </section>
    )
}
export default AuthPage;
