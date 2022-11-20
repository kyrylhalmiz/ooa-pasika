import React from "react";

const Select = ({ name, label, options, ...rest }) => {
    return (
        <div style={ { marginBottom: '0.5rem' } }>
            <label htmlFor={ name }>{ label }</label>
            <select name={ name } id={ name } { ...rest } className="form-control">
                <option value="" disabled defaultValue hidden>choose...</option>
                { options.map(option => (
                    <option key={ option._id } value={ option._id }>
                        { option.name }
                    </option>
                )) }
            </select>
        </div>
    );
};

export default Select;
