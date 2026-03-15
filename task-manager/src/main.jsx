import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_IIJ6iZgrd', // Replace with your User Pool ID
      userPoolClientId: '3suffmq5plc60nt0jm22kf1bpo', // Replace with your App Client ID
      signUpAttributes: ['email']
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>
);