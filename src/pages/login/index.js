import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./login.module.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Handle API call
  };
  return (
    <Layout title="Login">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className={styles.title}>Login</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className="fs-input-group">
              <label className="fs-label">
                <strong>Email</strong>
              </label>
              <input
                className="fs-input"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="fs-input-group">
              <label className="fs-label">
                <strong>Password</strong>
              </label>
              <input
                className="fs-input"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="fs-button fs-button-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
