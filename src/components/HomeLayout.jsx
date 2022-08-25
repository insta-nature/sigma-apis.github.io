import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <div>
      {/* adds speech, api doc, info about */}
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "API DOC", path: "apidoc" },
          { label: "Login", path: "/login" },
          { label: "Sing Up", path: "/register"},
        ]}
      />
      {outlet}
    </div>
  );
};
