import React from 'react';
import './SideUser.css'

const imgStyle = {
    borderRadius: '50%',
    width: '100%',
}

const btn = {
    padding: '10px 15px',
    backgroundColor: '#758B9A',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, .10)'
}

export default function SideUser(props) {
    return (
        <>
            <div className="side__user">
                <div className="side__user--text">
                    <div className="side__user--img">
                        <img src={`/users/${props.img}.png`} alt="users" style={imgStyle}/>
                    </div>
                    <p>{props.name}</p>
                </div>
                <div className="side__user--btn">
                <button style={btn}>Ikuti</button>
                </div>
            </div>
        </>
    )
}