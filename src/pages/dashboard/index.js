import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './dashboard.module.scss';
import Overview from '../../components/Overview/Overview';
import StoryItem from '../../components/StoryItem/StoryItem';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const overviewData = [
  {
    text: 'Stories written',
    value: '12',
  },
  {
    text: 'Total views',
    value: '3205',
  },
]

const fellowStories = [
  {
    title: 'First Day as a Fellow',
    published: 'Feb 1, 2021',
    edited: 'Feb 2, 2021',
    views: '2304',
  },
  {
    title: 'Orientation Hackathon Experience',
    published: 'Feb 2, 2021',
    edited: 'Feb 3, 2021',
    views: '733',
  },
  {
    title: 'Meeting new friends',
    published: 'Feb 3, 2021',
    edited: 'Feb 4, 2021',
    views: '60',
  },
]

function Dashboard() {
  return (
    <Layout title="Fellow Dashboard">
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
                    {fellowStories.map(item => <StoryItem data={item} />)}
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
