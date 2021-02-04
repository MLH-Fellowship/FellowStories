import React from 'react';
import Layout from '@theme/Layout';
import styles from './dashboard.module.scss';

function Dashboard() {
  return (
    <Layout title="Fellow Dashboard">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/dashboard/index.js</code>.
        </p>
      </div>
    </Layout>
  );
}

export default Dashboard;
