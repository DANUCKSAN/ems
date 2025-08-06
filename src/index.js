import 'antd/dist/reset.css'; // or 'antd/dist/antd.css' for older versions
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // You can customize your theme here if needed
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
