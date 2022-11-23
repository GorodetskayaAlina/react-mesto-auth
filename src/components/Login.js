import React from "react";
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login({ onLogin, handleInfoTooltipClick, isSuccess }) {
    const history = useHistory();
    const [userData, setUserData] = React.useState({ email: '', password: '' });

    function userDataHandleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        }
        auth.authorize(userData.email, userData.password)
            .then((data) => {
                if (data.token) {
                    setUserData({ email: '', password: '' });
                    onLogin();
                    history.push('/');
                }
            })
            .catch((err) => {
                isSuccess(false);
                handleInfoTooltipClick();
                console.log(`Ошибка: ${err}`);
            })
    }

    return (
        <div className="content authorization">
            <h2 className="authorization__title">Вход</h2>
            <form className="authorization__form" onSubmit={handleSubmit}>
                <fieldset className="authorization__fieldset" name="signin">
                    <input type="email" name="email" value={userData.email} onChange={userDataHandleChange}
                        className="authorization__form-item" placeholder="Email" required />
                    <input type="password" name="password" value={userData.password} onChange={userDataHandleChange}
                        className="authorization__form-item" placeholder="Пароль" required />
                </fieldset>
                <button className="authorization__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;