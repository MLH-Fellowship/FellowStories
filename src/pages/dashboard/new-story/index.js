import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Navbar from '../../../theme/Navbar';
import styles from './new-story.module.scss';
import MDEditor from '@uiw/react-md-editor';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

import AppContext from '../../../components/AppContext';

function NewStory() {
  const { userdata } = useContext(AppContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = React.useState("**Hello world!!!**");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    // Add markdown header
    // const markdown = `
    //   ---
    //   title: ${title}
    //   author: Anonymous
    //   author_title: MLH Fellow
    //   ---

    //   ${content}
    // `

    // Handle API call
    axios
      .post(`${process.env.API_ENDPOINT}/stories`,
      {
        title: title,
        author: userdata.user.id,
        content: content,
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
        history.push('/dashboard');
        // setError('');
      })
      .catch(error => {
        // Handle error
        setLoading(false);
        console.log('An error occurred:', error.response);
        // setError(error.response?.data?.message[0]?.messages[0]?.message);
      });
  }

  return (
    <Layout 
      title="New Story">
      <Navbar />
      <div className="container">
        <div className={styles.newStoryContainer}>

          <div className={styles.header}>
            <h1 className={styles.title}>New Story</h1>
            <div className={styles.actionButtons}>
              <Link
                className={clsx(
                  `fs-button fs-button-primary ${loading ? 'fs-button-disabled' : ''}`
                )}
                to={useBaseUrl('dashboard/')}>
                Cancel
              </Link>
              <button 
                disabled={loading}
                type="submit" 
                className="fs-button fs-button-secondary marginleft10" 
                form="newStory">
                {loading ?
                  <PulseLoader color={'#333'} size={10} />
                  :
                  'Publish'
                }
              </button>
            </div>
          </div>

          <div>Write a new story</div>

          <form id="newStory" className={styles.newStoryForm} onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <div className="fs-input-group">
                <label className="fs-label">Title</label>
                <input className="fs-input" type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="fs-input-group">
                <label className="fs-label">Content</label>
                <MDEditor
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  );
}

export default NewStory;
