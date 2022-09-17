import './iconrepo.css'
import AudioPlayer from 'react-h5-audio-player';
const MusicPlayer = (props) => {
  return (
    <div className="card-body">
      <AudioPlayer
        src={props.musicURL}
        showJumpControls={false}
        customAdditionalControls={[]}
      />
    </div>

  )

}
export default MusicPlayer