import React, { useState } from 'react';
import AppContext from '../components/AppContext';

// Default implementation, that you can customize
function Root({children}) {
  const [userdata, setUserdata] = useState({ loggedIn: false });

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
