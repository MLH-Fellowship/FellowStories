import React, { useContext } from 'react';
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

const overviewData = [
  {
    id: '1',
    text: 'Stories written',
    value: '12',
  },
  {
    id: '2',
    text: 'Total views',
    value: '3205',
  },
]

const fellowStories = [
  {
    id: '1',
    title: 'First Day as a Fellow',
    published: 'Feb 1, 2021',
    edited: 'Feb 2, 2021',
    views: '2304',
  },
  {
    id: '2',
    title: 'Orientation Hackathon Experience',
    published: 'Feb 2, 2021',
    edited: 'Feb 3, 2021',
    views: '733',
  },
  {
    id: '3',
    title: 'Meeting new friends',
    published: 'Feb 3, 2021',
    edited: 'Feb 4, 2021',
    views: '60',
  },
]

function Dashboard() {
  const { userdata } = useContext(AppContext);

  return (
    <Layout 
      title="Fellow Dashboard">
      <Navbar />

      <div className="container">
        <div className={styles.dashboardContainer}>

          <div className={styles.header}>
            <h1 className={styles.title}>Hey Pawan!</h1>
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
                    {fellowStories.map(item => <StoryItem key={item.id} data={item} />)}
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
