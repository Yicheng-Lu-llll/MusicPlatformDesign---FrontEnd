import { useState } from 'react';
import './iconrepo.css'
const TagList = (props) => {
    const [isTagContent, setIsTagContent] = useState(false);
    let tagContent = (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '25%' }}></div>
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}></div>
        </div>

    );
    const tagHandler = () => {
        setIsTagContent((pre) => {
            return !pre;
        });
       
    }
    let style = ["badge rounded-pill bg-primary",
        "badge rounded-pill bg-success",
        "badge rounded-pill bg-danger",
        "badge rounded-pill bg-warning",
        "badge rounded-pill bg-secondary"
    ];
    let styleIndex = -1;
    let key = 0
    let smallTagContent = (

        <div>
            {props.tagList.map((tagName) => {
                styleIndex = (styleIndex + 1) % 5;
                key = key + 1
                return (<span key={key} className={style[styleIndex]} onClick={tagHandler}>{tagName}</span>);

            })}

            {/* <span className="badge rounded-pill bg-primary" onClick={tagHandler}>{props.tagList[0]}</span> */}
            {/* {props.tagList[1]===1 &&  <span className="badge rounded-pill bg-secondary" onClick={tagHandler}>Rock</span>}
                {props.tagList[2]===1 &&  <span className="badge rounded-pill bg-success" onClick={tagHandler}>Country</span>}
                {props.tagList[3]===1 &&  <span className="badge rounded-pill bg-danger" onClick={tagHandler}>Pop</span>}
                {props.tagList[4]===1 &&  <span className="badge rounded-pill bg-warning" onClick={tagHandler}>blues</span>} */}
        </div>

    )


    if (!isTagContent) {
        tagContent = (<div></div>);
    }


    return (
        <div>

            <div className="card-body">

                {smallTagContent}
                {/* <span className="badge rounded-pill bg-info">Info</span>
    <span className="badge rounded-pill bg-light">Light</span>
    <span className="badge rounded-pill bg-dark">Dark</span> */}
                {tagContent}
            </div>






        </div>
    )
}
export default TagList