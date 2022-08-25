import { Routes, Route } from "react-router-dom";

import { ProtectedLayout } from "./components/ProtectedLayout";
// import { ProfilePage } from "./pages/Profile";
import { SettingsPage } from "./pages/Settings";
import { SpeechRecon } from './pages/speech-recon';
import { CodeSnippet } from './components/code/codeSnippet'

import { HomeLayout } from "./components/HomeLayout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { InfoPage } from "./pages/info-project";
import { APIDocPage } from "./pages/Api-Doc";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="infoproject" element={<InfoPage />} />
        <Route path="apidoc" element={<APIDocPage />} />
      </Route>
      
      <Route path="/dashboard/" element={<ProtectedLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="speechrecon" element={<SpeechRecon />} />
        <Route path="codesnipet" element={<CodeSnippet />} />
        <Route path="apidoc" element={<APIDocPage />} />
      </Route>
    </Routes>
  );
}
