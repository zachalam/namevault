import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/structure/App';
//import registerServiceWorker from './registerServiceWorker';

// iphone fix, https://github.com/Semantic-Org/Semantic-UI-React/pull/1833#issuecomment-313713611
if ('ontouchstart' in document.documentElement) {
  document.body.style.cursor = 'pointer';
}

ReactDOM.render(
    <App />,
  document.getElementById('root'));

//registerServiceWorker();
