import "./pricing.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Plains } from "../../components/Plains/Plains";
import {IoCheckmarkCircleOutline, IoCheckmarkOutline} from "react-icons/io5"

export function Pricing() {
    return (
        <div className="Pricing">
            {/* <Navbar2 /> */}
            <h2>Escolha o <span>plano ideal</span> para o seu negócio</h2>
            <h4>Cada plano atende a uma necessidade, de acordo com as ferramentas oferecidas. <br/>Você poderá alterar a qualquer momento.</h4>

            <Plains />

            <div className="content">
                <h4><span>Todos</span> os <span>planos</span> também incluem:</h4>
                <div className="itensContent">
                <h5><IoCheckmarkCircleOutline /> Todos os imóveis no portal Sua Chave</h5>
                <h5><IoCheckmarkCircleOutline /> Chat único por anúncio</h5>
                <h5><IoCheckmarkCircleOutline /> Agendamento de visitas</h5>
                <h5><IoCheckmarkCircleOutline /> Cadastro de clientes, proprietários e fiadores</h5>
                <h5><IoCheckmarkCircleOutline /> Contato via ligação e whatsapp</h5>
                <h5><IoCheckmarkCircleOutline /> Área administrativa - CRM</h5>
                <h5><IoCheckmarkCircleOutline /> Gestão financeira<span>*</span></h5>
                <h5><IoCheckmarkCircleOutline /> Acesso a busca de imóveis dos clientes<span>*</span></h5>
                <h5><IoCheckmarkCircleOutline /> Solicitação para avaliação de imóveis<span>*</span></h5>
                <h5><IoCheckmarkCircleOutline /> Captação de leads</h5>
                <h5><IoCheckmarkCircleOutline /> Página/perfil com seus dados e imóveis</h5>
                <h5><IoCheckmarkCircleOutline /> Taxa de adesão gratuita</h5>
                </div>
                <div className="infosContent">
                    <h5>* Apartir do plano Lite</h5>
                </div>
            </div>

        </div>
    )
}