import { DocHeader } from "../components/doc/DocHeader";
import { GetStart } from "../components/doc/GetStart";
import { ApiUse } from "../components/doc/ApiUse";

export const APIDocPage = () => {

  return(
    <div className="warp" style={{margin: '0 auto', maxWidth: '56em'}}>
      <DocHeader />
      <hr />
      <GetStart />
      <hr />
      <ApiUse />
    </div>
  );
};
