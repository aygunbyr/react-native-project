import React from 'react';
import { Provider } from 'react-redux';

import RootNavigation from './navigation/RootNavigation';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
