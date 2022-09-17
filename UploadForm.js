import { useState } from 'react'
import './iconrepo.css'
let fileName = "";
const UploadForm = (props) => {
    const [error, setError] = useState(null);
    const [uploadFile, setUploadFile] = useState();
    const [isSuccessContent, setIsSuccessContent] = useState(false);
    const [isWaitingContent, setIsWaitingContent] = useState(false);

    const sleep = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout)
        })
    }
    const FileHandler = (event) => {
        // console.log(event.target.files[0]["name"]);
        fileName = event.target.files[0]["name"];
        let temp = new FormData();
        temp.append('uploadFile', event.target.files[0])
        setUploadFile(temp);
    }

    const sendFile = async () => {
        setError(null);
        try {
            setIsWaitingContent(true);
            const response = await fetch(
                'http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics',
                {
                    method: 'POST',
                    body: uploadFile
                }

            );
            if (!response.ok) {
                console.log("Failed");
                throw new Error('Wrong Input File');
            }

        } catch (error) {
            setError(error.message);
        }

        let simpleFileName = fileName.replace('.mp3', '')
        simpleFileName = simpleFileName.replace('.WAV', '')


        await sleep(15000);
        let labelResponse = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musicTags/' + simpleFileName);
        while (!labelResponse.ok) {}
        let labelData = await labelResponse.json();


        let item = {
            id: -1,
            musicName: simpleFileName,
            tagList: labelData[0],
            percentageList: labelData[1],
            musicScoreList: labelData[2],
            musicURL: "http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/" + fileName
        }
        props.addMsuicItem(item);
        setIsWaitingContent(false);
        setIsSuccessContent(true);


    }
    const submitHandler = (event) => {
        event.preventDefault();
        sendFile();

    }
    let successContentHandler = () => {
        setIsSuccessContent(false);
    }
    let waitingContent = (
        <div>
            <div className="alert alert-dismissible alert-info">
                <button type="button" className="btn-close" data-bs-dismiss="alert" ></button>
                <strong>assigning tags to your MUSIC! waiting......</strong>
            </div>
            <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fbf77e4b5a711c10fafe1d00ab54d1425cd23ae23.gif&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655090882&t=543080c43745da40a178169a101ec99d"
                alt="Loading">
            </img>
        </div>

    )
    let successContent = (
        <div className="alert alert-dismissible alert-success">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={successContentHandler}></button>
            <strong>success!</strong> You can also download this music through <a href={"http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/" + fileName} className="alert-link">this Link</a>.
        </div>

    )
    if (!isSuccessContent) {
        successContent = (<div></div>);
    }
    if (!isWaitingContent) {
        waitingContent = (<div></div>);
    }
    return (
        <div>
            {waitingContent}
            {successContent}
            <form onSubmit={submitHandler}>
                <fieldset>
                    <legend>We Music</legend>

                    <div className="form-group">
                        <label htmlFor="formFile" className="form-label mt-4">Upload You Own Music File</label>
                        <input className="form-control" type="file" onChange={FileHandler} />
                    </div>

                    <fieldset className="form-group">
                        <legend className="mt-4">Choose Label</legend>
                        <label className="form-label">tag</label>
                        <input type="range" className="form-range" />
                    </fieldset>

                    <div className="btn-group-vertical">
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </div>
                </fieldset>
            </form>




        </div>

    );

}
export default UploadForm;