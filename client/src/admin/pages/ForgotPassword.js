import React, { useState, useEffect } from "react";
import axios from "axios";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/admin");
    }
  }, [history]);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.success);

      history.push("/admin");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <div className="forgotpassword-screen__block">
        <h5>Забыли пароль?</h5>
        <p>
          Если вы забыли свой пароль к админ панели сайта введите свой
          привязанный <strong>Email</strong>
        </p>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Письмо с инструкциями отправлен на вашу почту!
          </p>
        )}
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotpassword-screen__form"
        >
          <div className="forgotpassword-screen__form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="forgotpassword-screen__form-control">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
