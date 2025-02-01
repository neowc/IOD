import { useEffect, useState } from 'react'
import "./App.css";
import "./components/ProfileCard.css";
import PropTypes from 'prop-types';
import reactLogo from './assets/react.svg'

import ThemeProvider from './components/ThemeProvider';

function App() {


  return (
    <>
      <div>
        <hr />
        <ThemeProvider>
            <TestHook />
        </ThemeProvider>

      </div>
    </>
  );
}


Comment.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
};

export default App;
