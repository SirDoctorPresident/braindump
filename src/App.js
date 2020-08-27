import React from 'react';
import Container from './components/Container.js';
import './App.css';
import seedData from './seedData';

function App() {
  return (
    <React.Fragment>
      <Container title={seedData[0].text}
                 tasks={seedData[0].subtasks}>
      </Container>
    </React.Fragment>
  );
}

export default App;