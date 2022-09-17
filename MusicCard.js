import { useState } from 'react'
import './iconrepo.css'
import MusicPlayer from './MusicPlayer'
import TagList from './TagList'
import Image from './Image'
import ColumnChart from './ColumnChart'
const MusicCard = (props) => {
    const [isUnFold, setIsUnFold] = useState(false);
    let FolderHandler = () => {
        setIsUnFold((pre) => {
            return !pre;
        });
    }
    let unFoldContent = (
        <div className="card-box">

            <div className="card border-secondary mb-3" style={{ maxWidth: "20rem", align: "center" }}>
                <Image></Image>
                <div className="card-body">
                    <MusicPlayer musicURL={props.info.musicURL} ></MusicPlayer>
                </div>
            </div>
            
            <div >
              <ColumnChart info={props.info}></ColumnChart>
            </div>

        </div>

    );
    if (!isUnFold) {
        unFoldContent = (<div></div>)
    }

    return (
        <div>
            <div className='expense-item'>

                <div className='expense-item__description'>
                    <h2>{props.info.musicName}</h2>
                    <TagList tagList={props.info.tagList}></TagList>
                    <fieldset>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onClick={FolderHandler} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                        </div>
                    </fieldset>
                </div>

            </div>
            {unFoldContent}


        </div>


    )

}
export default MusicCard