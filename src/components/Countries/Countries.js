import React from 'react';

const Countries = props => {
    return (
        <p className='country-name' onClick={props.getInfo}>
            {props.name}
        </p>
    );
};

export default Countries;