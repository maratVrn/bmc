import React from 'react';
import MainInfo from "../widgets/mainInfo";
import Training from "../widgets/Training";
import MainStrategy from "../widgets/MainStrategy";

import Subscription from "../widgets/Subscription";

const MainPage = () => {
    return (
        <div>
            <MainInfo/>
            <MainStrategy/>
            <Training/>
            <Subscription/>
        </div>
    );
};

export default MainPage;
