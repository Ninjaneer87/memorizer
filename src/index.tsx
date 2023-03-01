import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PlayerContextProvider } from 'context/playerContext';
import { GameContextProvider } from 'context/gameContext';
import { CardContextProvider } from 'context/cardContext';
import { ScoreContextProvider } from 'context/scoreContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CardContextProvider>
      <PlayerContextProvider>
        <ScoreContextProvider>
          <GameContextProvider>
            <App />
          </GameContextProvider>
        </ScoreContextProvider>
      </PlayerContextProvider>
    </CardContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
