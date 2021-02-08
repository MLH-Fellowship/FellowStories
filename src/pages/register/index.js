import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Layout from "@theme/Layout";
import Navbar from '../../theme/Navbar';
import styles from "./register.module.scss";
import axios from 'axios';
import PulseLoader from "react-spinners/PulseLoader";

import AppContext from '../../components/AppContext';

function Register() {
  const { userdata, setUserdata } = useContext(AppContext);
  const history = useHistory();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    // Handle API call
    axios
      .post(`${process.env.API_ENDPOINT}/auth/local/register`, {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        // Handle success.
        setLoading(false);
        console.log('Registered!');
        console.log('User Data', response.data);
        const newUserDataState = {
          loggedIn: true,
          userType: 'fellow',
          jwt: response.data.jwt,
          user: response.data.user,
        }
        localStorage.setItem('USER_DATA', JSON.stringify(newUserDataState));
        setUserdata(newUserDataState);
        history.push("/dashboard");
        setError('');
      })
      .catch(error => {
        // Handle error.
        setLoading(false);
        console.log('An error occurred:', error.response);
        setError(error.response?.data?.message[0]?.messages[0]?.message);
      });
  };
  return (
    <Layout
      title="Register">
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className={styles.title}>Register</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="fs-alert-error" style={{ minWidth: "100%", marginBottom: "20px", display: error ? "flex" : "none"}}>
            {error}
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputsRow}>
              <div className="fs-input-group">
                <label className="fs-label">
                  <strong>First Name</strong>
                </label>
                <input
                  className="fs-input"
                  type="text"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="fs-input-group">
                <label className="fs-label">
                  <strong>Last Name</strong>
                </label>
                <input
                  className="fs-input"
                  type="text"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="fs-input-group">
              <label className="fs-label">
                <strong>Username</strong>
              </label>
              <input
                className="fs-input"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ minWidth: "100%" }}
              />
            </div>
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
                style={{ minWidth: "100%" }}
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
                style={{ minWidth: "100%" }}
              />
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="fs-button fs-button-primary"
            style={{ width: "100%", marginTop: "10px", marginBottom: "60px" }}
          >
            {loading ?
              <PulseLoader color={'white'} size={10} />
              :
              'Register'
            }
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
