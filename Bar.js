import './iconrepo.css'
const Bar = (props) => {
  const Ecghandler = () => {
    // console.log("waaaa!!!!!!");
    props.setIsEcgContent(true);
  }
  const Homeandler = () => {
    props.setIsEcgContent(false);
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">We Music</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/#" onClick={Homeandler} >Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#" onClick={Ecghandler} >ECG</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">GitHubRepo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">About</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="text" placeholder="Search" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>


    </div>
  )
}
export default Bar