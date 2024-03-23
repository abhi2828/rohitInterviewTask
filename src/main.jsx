import React, {lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { Spinner } from 'reactstrap';

const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner text="Loading..." className="custom-spinner d-flex justify-content-center" />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
