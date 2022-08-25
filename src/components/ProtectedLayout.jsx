// eslint-disable-next-line
import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";



export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "home" },
          { label: "Speech Recon", path: "speechrecon" },
          { label: "Settings", path: "settings" },
          { label:"snipet Code", path: "codesnipet"},
          { label: "API DOC", path: "apidoc" },
        ]}
      />
      {/* </AppBar> */}
      {outlet}
    </div>
  );
};
