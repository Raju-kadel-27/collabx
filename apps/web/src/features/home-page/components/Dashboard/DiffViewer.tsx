import React from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import Prism from "prismjs";
// import 'prismjs/components/prism-json';

// const oldJSON = require("./data/old.json");
// const newJSON = require("./data/new.json");

// let previous = 'We live in the city of birtamode near manakamana college.I am currently learning full stack developement.';
let previous = 'The bustling cityscape comes alive as the sun sets, casting a warm hue over the urban landscape. People fill the streets, heading towards comes alive as the sun vibrant cafes and lively markets.  vibrant cafes and lively markets. The citys energy is infectious, creating a lively atmosphere that captivates everyone who wanders through its diverse neighborhoods.';

// const newer = 'We live in the city of birtamode near manakamana school.I am currently learning half stack developement course.';

// const newer = 'As the sun descends, the dynamic cityscape awakens, bathed in the hues of the setting sun. Crowds populate the streets, making their way to lively coffee shops and bustling markets. The citys vitality is contagious, generating a spirited ambiance that enchants all those exploring its various districts.';
let newer = 'The bustling city comes alive creating a lively atmosphere as the moon sets, casting a heat hue over the urban landscape. People fill the streets, heading towards vibrant cafes and lively markets. The towns energy is infectious, creating a lively atmosphere that maintains everyone who wanders creating a lively atmosphere through its different neighborhoods.';


import 'react-diff-view/style/index.css'

import './index.css'
export default function DiffViewer() {
    console.log('rendered');

    // const highlightSyntax = (str) => (
    //   <pre
    //     style={{ display: "inline" }}
    //     class="foo"
    //     dangerouslySetInnerHTML={{
    //       // __html: Prism.highlight(str, Prism.languages.javascript)
    //       __html: Prism.highlight(str, Prism.languages.json, "json")
    //       // __html: str
    //     }}
    //   />
    // );



    const newStyles = {
        // variables: {
        //     light: {
        //         codeFoldGutterBackground: "#D3D3D3",
        //         codeFoldBackground: "#D3D3D3"
        //         // codeFoldGutterBackground: "#6F767E",
        //         // codeFoldBackground: "#E2E4E5"
        //     }
        // },
        diff: {
            backgroundColor: 'grey',
        },
        deleted: {
            backgroundColor: 'grey',
        },
        unchanged: {},
    };

    return (
        <div className="App px-6 diff">
            <ReactDiffViewer
                oldValue={previous}
                newValue={newer}
                splitView={true}
                compareMethod={DiffMethod.WORDS}
                styles={newStyles}

                leftTitle="Previous Version"
                rightTitle="Next Version"
            // renderContent={highlightSyntax}
            />
        </div>
    );
}