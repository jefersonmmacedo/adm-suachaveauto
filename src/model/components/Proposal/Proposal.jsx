import "./proposal.css";
import Profile from "../../assets/images/profile.png";
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5"

export function Proposal() {
    return (
        <div className="Proposal">
            <div className="proposalItens">
                <div className="proposalList">
                    <div className="proposalUnic">                      
                            <div className="data">
                            {/* 56 por linha */}
                                <h3><IoDocumentTextOutline />CONTRUÇÃO DE MURO</h3> 
                                <h5>Construção de muro em volta de terreno, tamanho 12x30</h5>
                                <div className="professionals">
                                    <p>Profissão</p>
                                    <p>Profissão</p>
                                </div>
                                <p><IoLocationOutline/>Cidade - RJ</p>
                            </div>

                            <div className="status">
                                <h4>Aberto</h4>
                                <p>Válida até: 31/12/2022</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}