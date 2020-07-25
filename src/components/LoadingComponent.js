// if the isLoading in dish.js(reducer) is set to true, I may just want to display a loading spinner on the screen just to keep the user informed 
//about the fact that something is being loaded from somewhere.

import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};