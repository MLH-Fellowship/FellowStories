import React, { useState, useEffect } from 'react';
import AppContext from '../components/AppContext';

// Default implementation, that you can customize
function Root({children}) {
  const [userdata, setUserdata] = useState(localStorage.getItem('USER_DATA') ? JSON.parse(localStorage.getItem('USER_DATA')) : { loggedIn: false });

  const store = {
    userdata, setUserdata,
  };

  return (
    <>
      <AppContext.Provider value={store}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export default Root;
