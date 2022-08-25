import "../styles/home.scss";

export const TitlePage = () => {
    return(
  <div style={{background: `url('https://www.w3schools.com/w3images/forestbridge.jpg')`}}>
            <div className="bgimg w3-animate-opacity w3-text-white">
                <div className="display-middle">
                    <h1 className=" w3-animate-top w3-h1" style={{width:'80%'}}>SIGMA APIs</h1>
                    <hr className="w3-border-grey" style={{margin:'2em', width:'40%'}} />
                </div>
                <div className="display-bottomleft w3-padding-large">
                    <a target="_blank" rel="noreferrer" href="https://github.com/kengarshridhar">
                        <div className="main">
                            <span className="dev">Devloped By</span>
                            <span className="name">Shridhar Kengar</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
)}