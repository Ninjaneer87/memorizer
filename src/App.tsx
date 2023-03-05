import React, { Suspense } from "react";
import Layout from "components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { usePlayerContext } from "context/playerContext";
import ProtectedRoutes from "components/ProtectedRoutes";

const Home = React.lazy(() => import("pages/Home"));
const Game = React.lazy(() => import("pages/Game"));
const ScoreBoard = React.lazy(() => import("components/ScoreBoard"));

function App() {
  const { player, playerLoaded } = usePlayerContext();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Not authenticated ONLY*/}
          <Route element={<ProtectedRoutes denied={!!player && playerLoaded} redirectTo='/game' />} >
            <Route path='/' element={<Suspense><Home /></Suspense>} />
          </Route>

          {/* Authenticated ONLY*/}
          <Route element={<ProtectedRoutes denied={!player && playerLoaded} redirectTo='/' />} >
            <Route path='game' element={<Suspense><Game /></Suspense>}>
              <Route path="scores" element={<Suspense><ScoreBoard /></Suspense>} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
