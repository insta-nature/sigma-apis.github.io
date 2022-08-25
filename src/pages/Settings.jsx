import { BasicPage } from "../components/BasicPage";
import Settings from "@mui/icons-material/Settings";
import ApiGen from "../components/Api-gan";

export const SettingsPage = () => {
  return(
    <div>
       <BasicPage title="Settings Page" icon={<Settings />} />
       <hr />
       <p className="sub-heading" style={{margin: '10px'}}> API Configraction</p>
       <br />
      <ApiGen />
    </div>
  );
};
