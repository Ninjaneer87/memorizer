import React, { Suspense } from "react";
import Layout from "components/Layout";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { usePlayerContext } from "context/playerContext";
import ProtectedRoutes from "components/ProtectedRoutes";

const Home = React.lazy(() => import("pages/Home"));
const Game = React.lazy(() => import("pages/Game"));
const ScoreBoard = React.lazy(() => import("components/ScoreBoard"));

function App() {
  const { player, playerLoaded } = usePlayerContext();

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          {/* Not authenticated ONLY*/}
          <Route element={<ProtectedRoutes denied={!!player && playerLoaded} redirectTo='/game' />} >
            {/* Home */}
            <Route
              path='/'
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
          </Route>

          {/* Authenticated ONLY*/}
          <Route element={<ProtectedRoutes denied={!player && playerLoaded} redirectTo='/' />} >
            {/* Game */}
            <Route
              path='game'
              element={
                <Suspense>
                  <Game />
                </Suspense>
              }
            >
              {/* Score board */}
              <Route
                path="scores"
                element={
                  <Suspense>
                    <ScoreBoard />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
