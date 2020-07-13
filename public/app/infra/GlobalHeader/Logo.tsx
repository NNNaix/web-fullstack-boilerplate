import React, { FC } from 'react';

import logo from '@img/logo.png';

const Logo: FC = () => {
    return (
        <div className="logo">
            <img style={{ height: 34, width: 120 }} src={logo} alt="logo" />
        </div>
    );
};
export default Logo;
