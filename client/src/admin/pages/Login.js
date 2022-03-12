import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPeopleCircle } from "react-icons/bs";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/admin");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/admin");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-screen__block">
        <div className="login-screen__avatar">
          <BsPeopleCircle className="icon" />
        </div>
        {error && <p className="login-screen__error-text">{error}</p>}
        <form
          id="login-form"
          className="login-screen__form"
          onSubmit={loginHandler}
        >
          <div className="login-screen__form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="login-screen__form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
          </div>
          <div className="login-screen__form-control">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
