import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import Image1 from '../../assets/images/casa.jpg'
import Image2 from '../../assets/images/predio.jpg'
import corretor1 from '../../assets/images/corretor1.jpg'
import corretor2 from '../../assets/images/corretor2.jpg'
import corretor3 from '../../assets/images/corretor3.jpg'
import {FiCheckCircle} from "react-icons/fi"
import "./about.css";


export function About() {
    return (
        <div className="About">
            <Navbar2 />
            <div className="topImageAbout">
                <div className="back">
            <h1>Nós somos a Imobiliária Rio Bonito!</h1>
                <h3>Temos as melhores opçoes de imóveis na região.</h3>
                </div>
            </div>

            <div className="aboutInfos">
                <div className="ImagesAbout">
                    <div className="imageAbout1">
                        <img src={Image1} alt="" />
                    </div>
                    <div className="imageAbout2">
                    <img src={Image2} alt="" />
                    </div>
                </div>
                <div className="TextAboutInfo">
                    <h2>Conheça nossa empresa</h2>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.</h5>
                        <div className="BlockInfosAbout">
                            <div className="svgInfo">
                                <FiCheckCircle />
                            </div>
                            <div className="BlockInfosText">
                                <h4>Nossa missão</h4>
                                <h5>A dor em si é importante para a principal elite adiposa. Ser repudiado pelo inventor e a existência dessas dores deve ser evitado. Ele o condena como se eles não o conhecessem, e como aquele a quem eles seguem; bem-vindo a grande coisa que é abençoada</h5>
                            </div>
                        </div>
                        <div className="BlockInfosAbout">
                            <div className="svgInfo">
                            <FiCheckCircle />
                            </div>
                            <div className="BlockInfosText">
                                <h4>Nossa visão</h4>
                                <h5>A dor em si é importante para a principal elite adiposa. Ser repudiado pelo inventor e a existência dessas dores deve ser evitado. Ele o condena como se eles não o conhecessem, e como aquele a quem eles seguem; bem-vindo a grande coisa que é abençoada</h5>
                            </div>
                        </div>
                        <div className="BlockInfosAbout">
                            <div className="svgInfo">
                            <FiCheckCircle />
                            </div>
                            <div className="BlockInfosText">
                                <h4>Nossos valores</h4>
                                <h5>A dor em si é importante para a principal elite adiposa. Ser repudiado pelo inventor e a existência dessas dores deve ser evitado. Ele o condena como se eles não o conhecessem, e como aquele a quem eles seguem; bem-vindo a grande coisa que é abençoada</h5>
                            </div>
                        </div>
                </div>
            </div>

            <div className="textTeam">
                        <h2>Nossa equipe</h2>
                    </div>
            <div className="team">
                <div className="teamUnic">
                    <div className="teamImage">
                        <img src={corretor1} alt="Corretor" />
                    </div>
                    <div className="teamInfos">
                        <h5>Funçao</h5>
                        <h4>Nome completo</h4>
                    </div>
                </div>
                <div className="teamUnic">
                    <div className="teamImage">
                        <img src={corretor2} alt="Corretor" />
                    </div>
                    <div className="teamInfos">
                        <h5>Funçao</h5>
                        <h4>Nome completo</h4>
                    </div>
                </div>
                <div className="teamUnic">
                    <div className="teamImage">
                        <img src={corretor3} alt="Corretor" />
                    </div>
                    <div className="teamInfos">
                        <h5>Funçao</h5>
                        <h4>Nome completo</h4>
                    </div>
                </div>
            </div>


                <Footer />
        </div>
    )
}