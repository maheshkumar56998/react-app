import React from 'react';
const Layout = (props) => {
    return (
        <div>
            <h1>header</h1>
            {props.children}
            <h1>Footer</h1>
        </div>
    )
}

export default Layout;