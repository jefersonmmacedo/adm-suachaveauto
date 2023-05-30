import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import Zap from '../../assets/images/zap.png'
import "./avaluation.css";
import {BiCheckDouble} from "react-icons/bi";

export function Avaluation() {
    return (
        <div className="Avaluation">
            <Navbar2 />
            <div className="topImageAvaluation">
                <div className="back">
            <h1>Nós temos o imóvel dos seus sonhos!</h1>
                <h3>E também as melhores oções de financiamento.</h3>
                </div>
            </div>

            <div className="financer">
            <h2>Porque <span>avaliar</span> meu imóvel?</h2>
                <h4>Veja 6 vantagens de realizar uma avaliação de imóvel.</h4>

                <div className="benefits">
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                         <div className="text">
                        <h5>Cobrar o valor justo pela casa, apartamento ou terreno.</h5>
                        </div>
                    </div>
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                         <div className="text">
                        <h5>Avaliar melhorias a serem feitas antes colocar o imóvel no mercado.</h5>
                        </div>
                    </div>
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                         <div className="text">
                        <h5>Checar se a documentação está em dia antes de uma possível negociação.</h5>
                        </div>
                    </div>
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                         <div className="text">
                        <h5>Avaliar as condições estruturais do imóvel antes de uma possível negociação.</h5>
                        </div>
                    </div>
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                         <div className="text">
                        <h5>A localização é um ponto-chave na avaliação de imóveis.</h5>
                        </div>
                    </div>
                    <div className="benefitUnic">
                        <BiCheckDouble/>
                        <div className="text">
                        <h5>Quanto mais segurança, mais atrativo se torna o imóvel. </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stepesFinances">
                            <h2>Avalie  <span>seu imóvel</span> com a gente</h2>
                <h4>Facilite seu processo de negociação com uma avaliação profissional.</h4>

                <button> <img src={Zap} alt="Imagem logo whatsapp" /> Entre em contato com a gente</button>

                {/* <div className="stepesList">
                <div className="stepeUnic">
                    <h1>1</h1>
                    <div className="textStepe">
                        <h4>Simulação e aprovação de crédito </h4>
                        <h5>Preencha os seus dados e os do imóvel para simular e solicitar a análise de crédito. </h5>
                    </div>
                </div>
                <div className="stepeUnic2">
                    <div className="textStepe2">
                        <h4>Cadastro e documentação</h4>
                        <h5>Cadastre as informações da proposta e envie os documentos solicitados. </h5>
                    </div>
                    <h1>2</h1>
                </div>
                <div className="stepeUnic">
                    <h1>3</h1>
                    <div className="textStepe">
                        <h4>Análise de documentos e vistoria do imóvel</h4>
                        <h5>Após enviar seus documentos, é hora de acompanhar a análise técnica e marcar a vistoria. </h5>
                    </div>
                </div>
                <div className="stepeUnic2">
                    <div className="textStepe2">
                        <h4>Contrato</h4>
                        <h5>Após a conclusão das análises, você irá até a agência assinar o contrato.</h5>
                    </div>
                    <h1>4</h1>
                </div>
                <div className="stepeUnic">
                    <h1>5</h1>
                    <div className="textStepe">
                        <h4>Liberação de crédito</h4>
                        <h5>Após a entrega ao Santander do contrato registrado e matrícula atualizada, o crédito será liberado ao vendedor.</h5>
                    </div>
                </div>
                </div> */}
            </div>

                <Footer />
        </div>
    )
}