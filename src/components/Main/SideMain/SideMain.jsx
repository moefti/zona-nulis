import React from 'react';
import SideUser from './SideUser/SideUser';
import './SideMain.css'
import Tag from '../../Tag/Tag';

export default function SideMain() {
    return (
        <div className="side">
            <h3 className="side__header">Mengikuti</h3>
            <div className="side__main">
                <SideUser name="Siti Maryam" img="siti"/>
                <SideUser name="Emile Mile"img="emile"/>
                <SideUser name="Benjamin"img="obeng"/>
            </div>
            <hr/>
            <div className="side__tags">
                <h3>Topik Untukmu</h3>
                <div className="side__tags--item">
                    <Tag name="programming"/>
                    <Tag name="nature"/>
                    <Tag name="music"/>
                    <Tag name="travel"/>
                    <Tag name="technologies"/>
                    <Tag name="design"/>
                    <Tag name="film"/>
                </div>
            </div>
        </div>
    )
}