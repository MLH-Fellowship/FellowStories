import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Layout from "@theme/Layout";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Navbar from '../../theme/Navbar';
import styles from "./login.module.scss";

import AppContext from '../../components/AppContext';

function Login() {
  const { userdata, setUserdata } = useContext(AppContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("fellow");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Handle API call
    if(type === "admin") {
      setUserdata({loggedIn: true});
      history.push("/admin-dashboard");
    } else {
      setUserdata({loggedIn: true});
      history.push("/dashboard");
    }
  };
  return (
    <Layout
      title="Login">
      <Navbar userdata={userdata} />

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
                style={{ minWidth: "350px" }}
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
                style={{ minWidth: "350px" }}
              />
            </div>
            <div className="fs-input-group">
              <label className="fs-label">
                <strong>User Type</strong>
              </label>
              <select
                className="fs-input"
                value={type}
                onChange={(e) => setType(e.target.value)}>
                <option value="fellow">Fellow</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="fs-button fs-button-primary"
            style={{ minWidth: "350px", marginTop: "10px", marginBottom: "60px" }}
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
