import React from 'react';
import ReactDOM from 'react-dom/client';
import UserForm from './modules/user/UserForm';
import 'antd/dist/reset.css';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <UserForm />
  </React.StrictMode>
);
