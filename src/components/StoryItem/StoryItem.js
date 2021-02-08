import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './StoryItem.module.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function StoryItem({ data }) {
  return (
      <div className={styles.storyItem}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.date}><span className={styles.semibold}>Published:</span> {new Date(data.createdAt).toDateString()}・<span className={styles.semibold}>Edited:</span> {new Date(data.updatedAt).toDateString()}</div>
        <div className={styles.views}><FontAwesomeIcon icon={faEye} /><span className="marginleft5">{data.views}</span></div>
        <div className={styles.editButton}>
          <Link
            className={clsx(
              'fs-button-small fs-button-primary'
            )}
            to={useBaseUrl('dashboard/edit-story/')}>
            Edit
          </Link>
        </div>
      </div>
  );
}

export default StoryItem;
