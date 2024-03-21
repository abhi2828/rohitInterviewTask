import React, {lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import { Spinner } from 'reactstrap';

const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Suspense fallback={<Spinner text="Loading..." className="custom-spinner d-flex justify-content-center" />}>
      <App />
    </Suspense>
  </Provider>,
  </React.StrictMode>,
)
