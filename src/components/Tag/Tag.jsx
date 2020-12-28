import React from 'react';
import './Tag.css'

export default function Tag(props) {
    return (
        <div className="tag">
            <span>{props.name}</span>
        </div>
    )
}