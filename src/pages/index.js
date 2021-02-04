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
    title: 'Easy to Use',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
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
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
