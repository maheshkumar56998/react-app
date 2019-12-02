import React from 'react';
import './App.css';
import './components/InstructorApp';
import InstructorApp from './components/InstructorApp';
import Layout from './components/layout';

function App() {

  return (
      <Layout className="Container">
        <InstructorApp/>
      </Layout> 
  );
}

export default App;
