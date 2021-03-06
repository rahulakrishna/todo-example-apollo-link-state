import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Client } from './Client';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
