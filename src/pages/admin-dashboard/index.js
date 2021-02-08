import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../components/AppContext';
import Layout from '@theme/Layout';
import Navbar from '../../theme/Navbar';
import styles from './admin-dashboard.module.scss';
import Overview from '../../components/Overview/Overview';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import PulseLoader from "react-spinners/PulseLoader";

function AdminDashboard() {
  const { userdata } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fellowsCount, setFellowsCount] = useState(0);
  const [fellowList, setFellowList] = useState([]);
  const [fellowListLoading, setFellowListLoading] = useState(false);

  const overviewData = [
    {
      id: '1',
      text: 'Fellows registered',
      value: fellowsCount,
    },
    {
      id: '2',
      text: 'Fellows authorized',
      value: fellowList.length,
    },
  ]

  const fetchAuthorizedFellows = () => {
    setFellowListLoading(true);
    axios
      .get(`${process.env.API_ENDPOINT}/authorized-fellows`, {
        headers: {
          Authorization: `Bearer ${userdata.jwt}`,
        },
      })
      .then(response => {
        // Handle success
        setFellowListLoading(false);
        console.log('Fellows emails', response.data);
        setFellowList(response.data.map(item => item.email));
      })
      .catch(error => {
        // Handle error
        setFellowListLoading(false);
        console.log('An error occurred:', error.response);
      });
  }

  const fetchFellowsCount = () => {
    axios
      .get(`${process.env.API_ENDPOINT}/users/count`, {
        headers: {
          Authorization: `Bearer ${userdata.jwt}`,
        },
      })
      .then(response => {
        // Handle success
        console.log('Fellows count', response.data);
        setFellowsCount(response.data);
      })
      .catch(error => {
        // Handle error
        console.log('An error occurred:', error.response);
      });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    // Handle API call
    axios
      .post(`${process.env.API_ENDPOINT}/authorized-fellows`,
      {
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${userdata.jwt}`,
        },
      })
      .then(response => {
        // Handle success
        setLoading(false);
        console.log('Form Response', response.data);
        setFellowList([...fellowList, email]);
        setError('');
      })
      .catch(error => {
        // Handle error
        setLoading(false);
        console.log('An error occurred:', error.response);
        setError(error.response?.data?.message[0]?.messages[0]?.message);
      });
  }

  useEffect(() => {
    fetchAuthorizedFellows();
    fetchFellowsCount();
  }, []);

  return (
    <Layout
      title="Admin Dashboard">
      <Navbar />

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
                  <div className="fs-alert-error" style={{ maxWidth: "350px", marginBottom: "20px", display: error ? "flex" : "none"}}>
                    {error}
                  </div>
                  <form className={styles.addFellows} onSubmit={handleSubmit}>
                    <div className={styles.inputs}>
                      <div className="fs-input-group">
                        <label className="fs-label">Email Address</label>
                        <input className="fs-input" type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                      </div>
                    </div>
                    <button disabled={loading} type="submit" className="fs-button fs-button-primary">
                    {loading ?
                      <PulseLoader color={'white'} size={10} />
                      :
                      'Add'
                    }
                    </button>
                  </form>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="panel-content">
                  <h2 className="tab-title">Authorized Fellows List</h2>
                  <div className={styles.fellowsEmailList}>
                    {fellowListLoading ? 
                    <div className={styles.fellowDetail}>
                      Loading...
                    </div>
                    : fellowList.map(item => (
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
