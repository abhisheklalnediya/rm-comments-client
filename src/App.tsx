import React from 'react';
import { Container } from './components';
import './App.scss';
import { CommentProvider, UserProvider } from './context'
const App: React.FC = () => {
  return (
    <div className="App">
      <UserProvider>
        <CommentProvider>
          <Container />
        </CommentProvider>
      </UserProvider>
    </div>
  );
}

export default App;
