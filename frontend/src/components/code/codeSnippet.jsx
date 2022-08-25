import { CodeBox } from "../CodeBox";
import { BasicPage } from "../BasicPage";
import { CopyBlock, dracula } from "react-code-blocks";
import code from "./coder"
import TerminalIcon from '@mui/icons-material/Terminal';

const styles = {
  contJust: {
    margin: '3em 20em'
  },
  CodeJust: {
    margin: '3em 20em'
  },
}

export function CodeSnippet() {
    return(
      <div>
          <h1>
            <BasicPage title="Snippet Code" direction={'row'} icon={<TerminalIcon />} /> 
          </h1>
        <hr />
        <div style={styles.contJust}>
          <p className="sub-heading" style={{margin: '10px'}}> API Snippet Code</p>
          <p className="sub-heading" style={{margin: '10px'}}> Full Snippet Code</p>
          <CodeBox ltext={ code.snapetCode } />
          <p className="sub-heading" style={{margin: '10px'}}> Sample Code</p>
            <div className="container mx-auto p-4">
              <div className="demo">
                  <CopyBlock
                      language={ "jsx" }
                      text={ code.singleQury }
                      showLineNumbers={false}
                      theme={dracula}
                      wrapLines={true}
                      codeBlock
                  />
              </div>
          </div>
        </div>
      </div>
    )
}
