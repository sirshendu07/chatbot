import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Chat from './components/Chat';

function App() {
  // State to control which page is showing ('welcome' or 'chat')
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <>
      {currentPage === 'welcome' ? (
        <Welcome onNavigate={() => setCurrentPage('chat')} />
      ) : (
        <Chat onNavigate={() => setCurrentPage('welcome')} />
      )}
    </>
  );
}

export default App;