import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import ContextProvider from './Contex/ContextProvider';


if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // to provide all the user details
  <BrowserRouter>
    <Provider store={store}>
      <ContextProvider>
        
        <App />

      </ContextProvider>
    </Provider>
  </BrowserRouter>


);
