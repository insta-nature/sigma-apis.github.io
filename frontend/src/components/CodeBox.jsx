import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import coder from "./code/coder";

export const CodeBox = () => {
    // const text = JSON.stringify(ltext)
    return (
        <div className="container mx-auto p-4">
            <div className="demo">
                <CopyBlock
                    language={ "jsx" }
                    text={ coder.snapetCode }
                    showLineNumbers={false}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                />
            </div>
        </div>
    );
};