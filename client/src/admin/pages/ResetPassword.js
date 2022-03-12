import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Пароли не совпадают!");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );

      console.log(data);

      setSuccess(data.success);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <div className="resetpassword-screen__block">
        <h5>Новый пароль</h5>

        {error && <p className="error-message">{error}</p>}
        {success ? (
          <p className="success-message">
            Ваш пароль успешно изменен! Для входа перейдите
            <Link to="/admin/login">Вход</Link>
          </p>
        ) : (
          <form
            onSubmit={resetPasswordHandler}
            className="resetpassword-screen__form"
          >
            <div className="resetpassword-screen__form-control">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="email">Пароль</label>
            </div>
            <div className="resetpassword-screen__form-control">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="email">Подтвердите пароль</label>
            </div>
            <div className="resetpassword-screen__form-control">
              <button type="submit">Сохранить</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
