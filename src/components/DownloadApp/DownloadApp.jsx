import "./downloadApp.css";
import {IoLogoGooglePlaystore, IoLogoApple} from 'react-icons/io5';
import iphone from '../../assets/images/iphone.png'
import iphone2 from '../../assets/images/iphone2.png'

export function DownloadApp() {
    return (
        <div className="DownloadApp">
            <div className="back">
            <div className="textSession">
                <h1>Seus imóveis na palma da sua mão!</h1>
                <h4>Aplicativo para controle e gestão em breve.</h4>
                <div className="Apps">
                <div className="buttonsApps">
                    <div className="iconApp">
                        <IoLogoGooglePlaystore />
                    </div>
                    <div className="TextApp">
                        <h6>Em breve na</h6>
                        <h4>Play Store</h4>
                    </div>
                </div>
                <div className="buttonsApps">
                    <div className="iconApp">
                        <IoLogoApple />
                    </div>
                    <div className="TextApp">
                        <h6>Em breve na</h6>
                        <h4>Apple Store</h4>
                    </div>
                </div>
                </div>
            </div>
            <div className="imageApp">
                <img src={iphone2} alt="iPhone" />
            </div>
            </div>
        </div>
    )
}