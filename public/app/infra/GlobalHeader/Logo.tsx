import React, { FC } from 'react';

import logo from '@img/logo_bg_transparent.png';
import { Link } from 'react-router-dom';

const Logo: FC = () => {
    return (
        <Link to="/">
            <div className="logo">
                <img style={{ height: 32, width: 41.2 }} src={logo} alt="logo" />
                <span style={{ marginLeft: 10, color: '#dcdcdc' }}>React Pro Boilerplate</span>
            </div>
        </Link>
    );
};
export default Logo;
