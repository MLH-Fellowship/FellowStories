import React from 'react';
import Layout from '@theme/Layout';
import styles from './login.module.scss';

function Login() {
  return (
    <Layout title="Login">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/login.js</code>.
        </p>
      </div>
    </Layout>
  );
}

export default Login;
