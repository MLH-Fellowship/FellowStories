import React from 'react';
import styles from './Overview.module.scss';

function Overview({ data }) {
  return (
      <div className={styles.overviews} style={{
        gridTemplateColumns: `${'1fr '.repeat(data.length)}`
      }}>
        {data.map(item => (
          <div key={item.id} className={styles.overview}>
            <div className={styles.overviewText}>{item.value}</div>
            <div className={styles.overviewValue}>{item.text}</div>
          </div>
        ))}
      </div>
  );
}

export default Overview;
