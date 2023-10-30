import React from "react";

import MiddleContainer from "./MiddleContainer";
import RightContainer from "./RightComponent";


function WorkBar() {
    return (
        <>
            <div class="col middle-container">
                <MiddleContainer />
            </div>

            <div class="col right-container">
                <RightContainer />
            </div>
        </>
    );
}

export default WorkBar;
