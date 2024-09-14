import React from 'react'

function Profilepic({ pp, firstname }) {
    return (
        pp ? (
            <img className='con-icon' src={pp} alt={firstname} />
        ) : (
            <div className='con-icon'>{firstname}</div>
        )
    );
}
export default Profilepic