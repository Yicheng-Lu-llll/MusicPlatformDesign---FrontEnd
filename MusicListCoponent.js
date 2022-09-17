import { useState } from 'react';
import './iconrepo.css'
import MusicCard from './MusicCard'
const MusicListCoponent = (props) => {

    let cardContent = props.infoList.map((info) => {
        return (
            <MusicCard key={info.id} info={info} ></MusicCard>
        )
    })

    return (
        <div className="expenses">
            {cardContent}
        </div>
    )

}
export default MusicListCoponent