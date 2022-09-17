import { useState } from "react";
import MusicListCoponent from "./MusicListCoponent";
let idChecker = 0;
let show_id = 0;
let EcgTable = (props) => {
    const [infoList, setinfoList] = useState([])
    let key = -1;
    let [tableItemList, settableItemList] = useState([])
    let colorIconList = [
        "table-active",
        "table-primary",
        "table-secondary",
        "table-success",
        "table-danger",
        "table-warning",
        "table-info",
        "table-light",
        "table-dark"
    ]
    const addMsuicItem = (item) => {
        item.id = idChecker;
        setinfoList((oldList) => {
            return [item, ...oldList];
        });
        idChecker = idChecker + 1;
    }

    let getAllEcg = async () => {
        settableItemList([]);
        show_id = 0;
        let response = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/ECGs');
        if (!response.ok) { }//fake throw error,im too lazy. use try catch if want to throw real error later
        let data = await response.json();
        let fileNameList = data;

        // console.log(fileNameList);
        for (const fileName of fileNameList) {
            let simplifieFileName = fileName.replace(".csv", ".json");
            // console.log(simplifieFileName);
            let oderResponse = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/orderedmusics/' + simplifieFileName);
            if (!oderResponse.ok) { }//fake throw error,im too lazy. use try catch if want to throw real error later
            let oderData = await oderResponse.json();
            console.log("oderData");
            console.log(oderData);
            let newItem = {
                EcgName: simplifieFileName.replace(".json", ""),
                oderFileList: oderData[0],
                emoList : oderData[1]

            }
            settableItemList((preList) => {
                return [...preList, newItem]
            })
        }

    }

    let clickHandler = async (event) => {
        console.log(show_id);
        setinfoList([]);
        let tableItem = tableItemList[show_id];
        show_id = (show_id + 1)%tableItemList.length;
        // for (const tempTableItem of tableItemList) {
        //     if (tableItem.EcgName === EcgName) {
        //         tableItem = tempTableItem;
        //     }

        // }
        let oderFileList = tableItem.oderFileList;
        for (const fileName of oderFileList) {

            let labelResponse = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musicTags/' + fileName);
            if (!labelResponse.ok) { }
            let labelData = await labelResponse.json();
            let item =
            {
                id: idChecker,
                musicName: fileName,
                tagList: labelData[0],
                percentageList: labelData[1],
                musicScoreList: labelData[2],
                musicURL: "http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/" + fileName + ".WAV"

            }
            addMsuicItem(item);

        }





    }





    return (
        <div>
            <div className="btn-group-vertical">
                <button type="submit" className="btn btn-primary" onClick={getAllEcg}>refresh</button>
            </div>
            <p></p>
            

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ECG signal</th>
                        <th scope="col">recommand music list</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItemList.map((item) => {
                        key = key + 1
                        return (
                            <tr onClick={ clickHandler } key={key} className={colorIconList[key % 9]}>
                                <th scope="row">{item.EcgName}</th>
                                <td>{item.emoList[0]+" "+item.emoList[1] + " "+item.emoList[2]}</td>
                            </tr>
                        )

                    })}


                </tbody>
            </table>
            <MusicListCoponent infoList={infoList} ></MusicListCoponent>
        </div>
    )


}
export default EcgTable