import './iconrepo.css'
import 'react-h5-audio-player/lib/styles.css';
import MusicListCoponent from './MusicListCoponent';
import UploadCoponent from './UploadCoponent';
import Bar from './Bar';
import EcgUploadForm from './EcgUploadForm'
import { useCallback, useEffect, useState } from 'react';
let idChecker = 0;
function App() {
  const [infoList, setinfoList] = useState([
    // {  
    //   id: 1,
    //   musicName : "Spy * Family",
    //   tagList : [1,0,1,0,1],
    //   musicURL: "http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/spyFamily.mp3"

    // },
    // { 
    //   id: 2,
    //   musicName : "Lemon",
    //   tagList:  [0,1,0,0,1],
    //   musicURL: "http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/lemon.mp3"
    //  }
  ]);
  const addMsuicItem = (item) => {
    item.id = idChecker;
    setinfoList((oldList) => {
      return [item, ...oldList];
    });
    idChecker = idChecker + 1;
  }

  let initialize = useCallback(
    async () => {
      let response = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics');
      if (!response.ok) { }//fake throw error,im too lazy. use try catch if want to throw real error later
      let data = await response.json();
      for (const musicInfo of data) {
        // console.log(musicInfo);
        let fileName = musicInfo.name;
        if (fileName.includes('.mp3') || fileName.includes('.WAV')) {
          // console.log(fileName);
          let simpleFileName = fileName.replace('.mp3', '')
          simpleFileName = simpleFileName.replace('.WAV', '')

          let labelResponse = await fetch('http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musicTags/' + simpleFileName);
          if (!labelResponse.ok) {}
          let labelData = await labelResponse.json();
          // console.log(labelData);
          let item =
          {
            id: idChecker,
            musicName: simpleFileName,
            tagList: labelData[0],
            percentageList:labelData[1],
            musicScoreList:labelData[2],
            musicURL: "http://ec2-54-65-141-177.ap-northeast-1.compute.amazonaws.com:8080/music-repo/musics/" + fileName

          }
          addMsuicItem(item);
        }

      }

    }
    , []
  )
  useEffect(() => {
    initialize();

  }, [initialize]);

  let [isEcgContent, setIsEcgContent] = useState(false);
  let content;
  let homeContent = (
    <div>
      <Bar setIsEcgContent={setIsEcgContent} ></Bar>
      <UploadCoponent addMsuicItem={addMsuicItem}></UploadCoponent>
      <MusicListCoponent infoList={infoList}></MusicListCoponent>
    </div>
  )
  let EcgContent = (
    <div>
      <Bar setIsEcgContent={setIsEcgContent} ></Bar>
      <div className='new-expense'>
        <EcgUploadForm></EcgUploadForm>
      </div>

    </div>
  )
  content = homeContent;
  if (isEcgContent) {
    content = EcgContent;
  }

  // isEcgContent && (content = EcgContent);


  return (
    <div>
      {content}
    </div>
  );
}

export default App;




