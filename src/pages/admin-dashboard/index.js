import React from 'react';
import Layout from '@theme/Layout';
import styles from './admin-dashboard.module.scss';

function AdminDashboard() {
  return (
    <Layout title="Admin Dashboard">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/admin-dashboard/index.js</code>.
        </p>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
