import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../components/AppContext';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Navbar from '../../theme/Navbar';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './dashboard.module.scss';
import Overview from '../../components/Overview/Overview';
import StoryItem from '../../components/StoryItem/StoryItem';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import PulseLoader from "react-spinners/PulseLoader";

function Dashboard() {
  const { userdata } = useContext(AppContext);

  const [fellowStories, setFellowStories] = useState([]);
  const [fellowStoriesLoading, setFellowStoriesLoading] = useState(false);
  
  const overviewData = [
    {
      id: '1',
      text: 'Stories written',
      value: fellowStories.length,
    },
    {
      id: '2',
      text: 'Total views',
      value: 0,
    },
  ]

  const fetchFellowStories = () => {
    setFellowStoriesLoading(true);
    axios
      .get(`${process.env.API_ENDPOINT}/stories`, {
        headers: {
          Authorization: `Bearer ${userdata.jwt}`,
        },
      })
      .then(response => {
        // Handle success
        setFellowStoriesLoading(false);
        console.log('Fellow stories', response.data);
        setFellowStories(response.data);
      })
      .catch(error => {
        // Handle error
        setFellowStoriesLoading(false);
        console.log('An error occurred:', error.response);
      });
  }

  useEffect(() => {
    fetchFellowStories();
  }, []);

  return (
    <Layout 
      title="Fellow Dashboard">
      <Navbar />

      <div className="container">
        <div className={styles.dashboardContainer}>

          <div className={styles.header}>
            <h1 className={styles.title}>Hey {userdata && userdata.loggedIn ? userdata.user.username : 'fellow'}!</h1>
            <div className={styles.actionButtons}>
              <Link
                className={clsx(
                  'fs-button fs-button-secondary'
                )}
                to={useBaseUrl('dashboard/new-story/')}>
                New Story
              </Link>
            </div>
          </div>

          <div className={styles.overview}>
            <Overview data={overviewData} />
          </div>

          <div className={styles.main}>
            <Tabs>
              <TabList>
                <Tab>
                  <div>My Stories</div>
                </Tab>
                <Tab>
                  <div>Settings</div>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="panel-content">
                  <div className={styles.fellowStoriesContainer}>
                    {fellowStoriesLoading ?
                      <PulseLoader color={'#1D539F'} size={10} />
                      :
                      fellowStories.map(item => <StoryItem key={item.id} data={item} />)
                    }
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

export default Dashboard;
