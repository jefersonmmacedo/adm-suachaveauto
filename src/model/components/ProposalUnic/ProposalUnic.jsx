import { IoCaretForwardOutline } from "react-icons/io5";
import Profile from "../../assets/images/profile.png";
import "./proposalUnic.css";

export function ProposalUnic() {
    return (
        <div className="ProposalUnic">
        <div className="block1">
        <h3><IoCaretForwardOutline />CONSTRUÇÃO DE MURO</h3>
        <h5>Construção de muro em volta de terreno, tamanho 12x30.</h5>
        <p>Válida até: 31/12/2022</p>
        </div>
        <div className="block3">
            <p>Enviado por:</p>
            <div className="infos">
        <div className="image">
        <img src={Profile} alt="" />
        </div>
            <p>Nome Usuário</p>
            </div>
        </div>
    </div>
    )
}