import React from 'react';
import Container from './components/Container.js';
import './App.css';
import seedData from './seedData';

function App() {
  return (
    <React.Fragment>
      <Container title={seedData[0].title}
                 tasks={seedData[0].tasks}>
      </Container>
    </React.Fragment>
  );
}

export default App;