import { useState } from 'react'
import EcgTable from './EcgTable';
import './iconrepo.css'
let fileName = "";
const EcgUploadForm = (props) => {
    const [error, setError] = useState(null);
    const [uploadFile, setUploadFile] = useState();
    const [isSuccessContent, setIsSuccessContent] = useState(false);

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
            const response = await fetch(
                'http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/ECGs',
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
        setIsSuccessContent(true);

    }
    const submitHandler = (event) => {
        event.preventDefault();
        sendFile();

    }
    let successContentHandler = () => {
        setIsSuccessContent(false);
    }
    let successContent = (
        <div className="alert alert-dismissible alert-secondary">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={successContentHandler}></button>
            <strong>Upload success!</strong> You can download this ECG File through <a href={"http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/ECGs/" + fileName} className="alert-link">this Link</a>.
        </div>

    )
    if (!isSuccessContent) {
        successContent = (<div></div>);
    }
    return (
        <div>
            {successContent}
            <form onSubmit={submitHandler}>
                <fieldset>
                    <legend>ECG REPO</legend>

                    <div className="form-group">
                        <label htmlFor="formFile" className="form-label mt-4"></label>
                        <input className="form-control" type="file" onChange={FileHandler} />
                    </div>

                    <p>Diffcult to choose music? Let your heart help! Upload you own ECG file</p>
                    <div className="btn-group-vertical">
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </div>
                </fieldset>
            </form>


        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        
     
        <EcgTable></EcgTable>
        </div>

    );

}
export default EcgUploadForm;