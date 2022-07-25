/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function FormInput({ input, type, placeholder, value, onChange, ...extra }) {
    return (
        <div>
            {!input ? (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="formInput"
                    {...extra}
                />
            ) : (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="formInput"
                    {...extra}
                />
            )}
        </div>
    );
}

export default FormInput;
