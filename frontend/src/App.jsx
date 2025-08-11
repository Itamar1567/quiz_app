import { useState } from 'react'
import './App.css'
import {Layout} from "./Layout/Layout.jsx"
import {HistoryPanel} from "./History/HistoryPanel.jsx"
import {ChallengeGenerator} from "./Challenge/ChallengeGenerator.jsx"
import {Routes, Route} from "react-router-dom";
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx"
import {AuthenticationPage} from "./auth/AuthenticationPage.jsx"

function App() {
  return <ClerkProviderWithRoutes>
      <Routes>
          {/*go to auth page if in route "/sign-in"*/}
            <Route path = "/sign-in/*" element={<AuthenticationPage />}/>
            <Route path = "/sign-up/*" element={<AuthenticationPage />}/>
            <Route element={<Layout/>}>
                {/*This will show when the user is signed in, due to <Outlet />}*/}
                <Route path={"/"} element={<ChallengeGenerator />} />
                <Route path={"/history"} element={<HistoryPanel/>}/>
            </Route>
      </Routes>
  </ClerkProviderWithRoutes>

}

export default App
