import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './new-story.module.scss';
import MDEditor from '@uiw/react-md-editor';

function NewStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = React.useState("**Hello world!!!**");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Add markdown header
    const markdown = `
      ---
      title: ${title}
      author: Anonymous
      author_title: MLH Fellow
      ---

      ${content}
    `

    // Handle API call
    alert(markdown)
  }

  return (
    <Layout title="New Story">
      <div className="container">
        <div className={styles.newStoryContainer}>

          <div className={styles.header}>
            <h1 className={styles.title}>New Story</h1>
            <div className={styles.actionButtons}>
              <button type="submit" className="fs-button fs-button-secondary" form="newStory">Publish</button>
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
