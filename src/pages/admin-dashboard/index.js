import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './admin-dashboard.module.scss';
import Overview from '../../components/Overview/Overview';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const overviewData = [
  {
    id: '1',
    text: 'Fellows registered',
    value: '392',
  },
  {
    id: '2',
    text: 'Fellows authorized',
    value: '425',
  },
]

const approvedFellowList = [
  'contact@pawankolhe.com',
  'example@gmail.com',
  'example2@gmail.com',
  'example3@gmail.com',
]

function AdminDashboard() {
  const [email, setEmail] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Handle API call
  }

  return (
    <Layout title="Admin Dashboard">
      <div className="container">
        <div className={styles.dashboardContainer}>

          <div className={styles.header}>
            <h1 className={styles.title}>Admin Dashboard</h1>
          </div>

          <div className={styles.overview}>
            <Overview data={overviewData} />
          </div>

          <div className={styles.main}>
            <Tabs>
              <TabList>
                <Tab>
                  <div>Add Fellows</div>
                </Tab>
                <Tab>
                  <div>Authorized Fellows List</div>
                </Tab>
                <Tab>
                  <div>Settings</div>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="panel-content">
                  <h2 className="tab-title">Add Fellows</h2>
                  <form className={styles.addFellows} onSubmit={handleSubmit}>
                    <div className={styles.inputs}>
                      <div className="fs-input-group">
                        <label className="fs-label">Email Address</label>
                        <input className="fs-input" type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <button type="submit" className="fs-button fs-button-primary">Add</button>
                  </form>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="panel-content">
                  <h2 className="tab-title">Authorized Fellows List</h2>
                  <div className={styles.fellowsEmailList}>
                    {approvedFellowList.map(item => (
                      <div className={styles.fellowDetail}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="panel-content">
                  <h2 className="tab-title">Settings</h2>
                </div>
              </TabPanel>
            </Tabs>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
