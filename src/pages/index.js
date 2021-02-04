import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const features = [
  {
    title: 'Write about the projects you made',
    imageUrl: 'img/illustrations/code-review.svg',
    description: (
      <>
        Let the others know what you built and what you learnt during the process. Write about your stuggles and experience collaborating with teammates.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/illustrations/remote-team.svg',
    description: (
      <>
        Share about the events you attended, the friends you made, and the tech you learnt.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={styles.feature}>
      {imgUrl && (
        <div className={styles.featureImageContainer}>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <div className={styles.featureTextContainer}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      description="Platform for MLH Fellows to share their stories and experiences">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.header__left}>
              <h1 className={clsx('hero__title', styles.header__title)}><span className="secondarytext">Stories</span> & <span className="secondarytext">Experiences</span><br /> of the MLH Fellowship</h1>
              <div className={styles.header__buttons}>
                <Link
                  className={clsx(
                    'fs-button fs-button-primary'
                  )}
                  to={useBaseUrl('stories/')}>
                  Read
                </Link>
                <Link
                  className={clsx(
                    'fs-button fs-button-secondary'
                  )}
                  to={useBaseUrl('register/')}>
                  <FontAwesomeIcon icon={faPen} /><span className="marginleft10">Write Yours</span>
                </Link>
              </div>
            </div>
            <div className={styles.header__right}>
              <img className={styles.header__image} src="./img/illustrations/blog-post.svg" alt="image" />
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
