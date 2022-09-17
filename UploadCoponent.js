import { useState } from 'react';
import './iconrepo.css'
import UploadForm from './UploadForm';
const UploadCoponent = (props) => {
    const [isUploadContent, setIsUploadContent] = useState(false);
    const ContentChangeHandler = () => {
        setIsUploadContent(true);
    }
    let content = (
        <div>
            <img
                src="http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/pictures/test.jpg"
                // src="https://img.zcool.cn/community/0192455b8dfa89a80120245ccbdbaa.gif"
                alt="MUSIC">
            </img>
            <fieldset>
                <legend className="mt-4">We Music</legend>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" onClick={ContentChangeHandler} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                </div>
            </fieldset>
        </div>
    )
    if (isUploadContent) { content = (<UploadForm addMsuicItem={props.addMsuicItem}></UploadForm>); }

    return (

        <div className='new-expense'>
            {content}
        </div>






    )
}
export default UploadCoponent