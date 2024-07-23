import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import RootNavigation from './navigation/RootNavigation';
import { store } from './redux/store';
import { getAllData } from './redux/dataSlice';
import { Loading } from './components';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, isSaved } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getAllData());
  }, [isSaved]);

  if (isLoading) return <Loading />;

  return <RootNavigation />;
};

export default AppWrapper;
