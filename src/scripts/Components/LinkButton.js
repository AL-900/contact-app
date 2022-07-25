/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Link } from 'react-router-dom';

function LinkButton({ to, text, type = 'submit', ...extra }) {
    if (!to) {
        return (
            // eslint-disable-next-line react/button-has-type
            <button type={type} className="bbtn" {...extra}>
                {text}
            </button>
        );
    }

    return (
        <Link to={to} className="linkButton " {...extra}>
            {text}
        </Link>
    );
}

export default LinkButton;
