import React from "react";

const Card = ({ name, label1, label2, label2a, label2b, label2c, label2d, label3, label4, label5, attribute1, attribute2, attribute2a, attribute2b, attribute2c, attribute2d, attribute3, attribute4, attribute5, radioButton}) => {
    
    if(!(name && attribute2)){
        return (
            <div className="cardbg dib br3 pa3 ma2 grow bw2 shadow-5 tc">
                <div>
                    <h2>Processing...</h2>
                    <p>Downloading data from Star Wars API.</p>
                    <p><a href="https://swapi.co" target="blank">www.swapi.com</a></p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="cardbg dib br3 pa3 ma2 grow bw2 shadow-5 tl">
                <div>
                    <h2>{name}</h2>
                    <p className="capitalize">{label1}{attribute1}</p>
                    <p className="capitalize">{label2}{attribute2}</p>
                    <p className="capitalize">{label2a}{attribute2a}</p>
                    <p className="capitalize">{label2b}{attribute2b}</p>
                    <p className="capitalize">{label2c}{attribute2c}</p>
                    <p className="capitalize">{label2d}{attribute2d}</p>
                    <div className="films">
                        <div>
                            <p className="m-inherit whitespace-nowrap capitalize">{label3}</p>
                        </div>
                        <div className="titles">
                            <p className="m-inherit capitalize">{attribute3}</p>
                        </div>
                    </div>

                    <div className="films mt">
                        <div>
                            <p className="m-inherit">{label4}</p>
                        </div>
                        <div className="titles">
                            <p className="m-inherit">{attribute4}</p>
                        </div>
                    </div>

                    <div className="films mt">
                        <div>
                            <p className="m-inherit whitespace-nowrap">{label5}</p>
                        </div>
                        <div className="titles">
                            <p className=" i m-inherit">{attribute5}</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    } 
}

export default Card; 