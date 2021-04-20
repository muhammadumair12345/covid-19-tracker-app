import React from 'react';
import Container from './components/Container';
import { CovidDataProvider } from './context/CovidDataContext';

function App() {
  return (
    <CovidDataProvider>
      <Container/>
    </CovidDataProvider>
  )
}

export default App
