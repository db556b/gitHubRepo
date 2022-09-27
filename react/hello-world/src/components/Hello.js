import React, { createElement } from "react";

const Hello = () => {
    // return (
    //     <div>
    //         <h1> Hello David</h1>
    //     </div>
    // )
    return React.createElement(
        'div', 
        {id : 'hello', className: 'thisIsWeird'}, 
        React.createElement('h1', null, 'Hello David'))
}

export default Hello