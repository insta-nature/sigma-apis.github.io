import { BasicPage } from "../components/BasicPage";
import { TitlePage }  from "../components/HomePage";
import Home from "@mui/icons-material/Home";

export const HomePage = () => {
  return (
    <div> 
      {/* <BasicPage title="Home Page" direction={'column'} align={'center'} icon={<Home />} /> 
      <hr /> */}
      <TitlePage />
  </div>
  );
};
