import { DownloadApp } from "../../components/DownloadApp/DownloadApp"
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./dashboard.css";
import {IoHomeOutline, IoCalendarOutline, IoLogoWhatsapp, IoCallOutline,IoAlertCircle,
    IoHeartOutline, IoKeyOutline, IoRocketOutline, IoSearchOutline} from 'react-icons/io5'
import { PropertiesCount } from "../../components/ItensDashboard/PropertiesCount";
import { PropertiesCountSale } from "../../components/ItensDashboard/PropertiesCountSale";
import { PropertiesCountRent } from "../../components/ItensDashboard/PropertiesCountRent";
import { EvaluationCount } from "../../components/ItensDashboard/EvaluationCount";
import { SchedulingCount } from "../../components/ItensDashboard/SchedulingCount";
import { ContactWhatsappCount } from "../../components/ItensDashboard/ContactWhatsappCount";
import { ContactPhoneCount } from "../../components/ItensDashboard/ContactPhoneCount";
import { FavoriteCount } from "../../components/ItensDashboard/FavoriteCount";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { PropertiesCountAvailability } from "../../components/ItensDashboard/PropertiesCountAvailability";
import { ContactLeadCount } from "../../components/ItensDashboard/ContactLeadCount";
import { SchedulingAllCompleted } from "../../components/ItensDashboard/SchedulingAllCompleted";
import { SchedulingAll } from "../../components/ItensDashboard/SchedulingAll";
import { PropertiesCountRentSale } from "../../components/ItensDashboard/PropertiesCountRentSale";
import { ProposalsCounter } from "../../components/ItensDashboard/ProposalsCounter";
import { Commissions } from "../../components/ItensDashboard/Commissions";
import { SalesProperties } from "../../components/ItensDashboard/SalesProperties";
import { RentProperties } from "../../components/ItensDashboard/RentProperties";
import { TotalRevenue } from "../../components/ItensDashboard/TotalRevenue";


export function Dashboard() {

    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [myPayments, setMyPayments] = useState([])
    const [myPlain, setMyPlain] = useState([])
    const [daysPayments, setDaysPayments] = useState()

    const [days, setDays] = useState()

    useEffect(() => {
        async function verifyPaymentStatus() {
            //Criação de conta e período de testes
            const d1  = new Date(user.date);
            const d2 = new Date();
            const diffInMs   = new Date(d2) - new Date(d1)
            const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));
            setDays(diffInDays)

            //Dados de plano
            const plains =  await api.get(`/myplain/${user.id}`)
            console.log(plains.data)
            setMyPlain(plains.data)
            //Dados de pagamentos
            const payment =  await api.get(`/payments/${user.id}`)
            console.log(payment.data)
            setMyPayments(payment.data)



            const paymentd1  = new Date(payment.data[0]?.created_at);
            const paymentd2 = new Date();
            const paymentdiffInMs   = new Date(paymentd2) - new Date(paymentd1);
            const paymentdiffInDays = parseInt(paymentdiffInMs / (1000 * 60 * 60 * 24));
            setDaysPayments(paymentdiffInDays)

            if(diffInDays < 8) {
                return;
            }
            if(payment.data.length > 0) {
                return;
            }
            if(payment.data.length === 0) {
                window.open("/fim-periodo-teste", "_self");
                return;
            }

            if(payment.data[0]?.status === "Pendente" && paymentdiffInDays >= 6) {
                window.open("/pagamento-pendente", "_self");
                return;
            }
        }

        verifyPaymentStatus()
    },[])



    return (
        <div className="Dashboard">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <div className="textHome">
                <h3>Olá, {user.fantasyName}.</h3>
                <h5>Última atualização: 02/05/2023. <a href="/atualizacoes">Veja as atualizações</a></h5>
                </div>

                {days < 8 && myPlain?.length === 0 ?
            <div className="PlainDashboard2">
                <h4>Período de testes: Faltam {7 - days} dias para finalizar seu teste. Aproveite da melhor maneira!</h4>
                {/* <a href="/planos">Renovar agora</a> */}
            </div>
            : myPlain.length > 0 && myPayments[0]?.status === "Pendente" ?
            <div className="PlainDashboard2">
                <h4>Seu plano: {myPlain[0]?.namePlain}, ainda está com pagamento {myPayments[0]?.status}. (Em caso de pagamento efetuado, desconsidere esta mensagem) </h4>
                <a href="/meus-planos">Efetuar pagamento</a>
            </div>
            : ""
            }


                <div className="topInfomations">
                    <div className="properties">
                       <div className="infosProperty">
                        <div className="totalProperties">
                            <h5>Imóveis publicados</h5>
                            <h2><PropertiesCount /></h2>
                        </div>
                        <div className="qtdProperties">
                            <h5>Mais informações</h5>
                            <div className="rent">
                                <h6><PropertiesCountRent /> Imóveis para aluguel</h6>
                            </div>
                            <div className="sale">
                                <h6><PropertiesCountSale /> Imóveis à venda</h6>
                            </div>
                        </div>
                       </div>
                       <div className="availability">
                        <h6>Disponíveis: <PropertiesCountAvailability availability={"Disponível"} /></h6>
                        <h6>Alugados: <PropertiesCountAvailability availability={"Alugado"} /></h6>
                        <h6>Vendidos: <PropertiesCountAvailability availability={"Vendido"} /></h6>
                        <h6>Indisponíveis: <PropertiesCountAvailability availability={"Indisponível"} /></h6>
                       </div>
                       <div className="buttonsProperty">
                        <a href="/imoveis">Ver Imóveis</a>
                        <a href="/novoimovel">Novo Imóvel</a>
                       </div>
                    </div>

                    <div className="funel">
                        <div className="infosFunel">
                        <h5>Funil de vendas</h5>
                            <div className="typefunel">
                                    <div className="funelUnic">
                                        <div className="lead">
                                        </div>
                                        <div className="lead-text">
                                            <h5>Leads</h5>
                                        <h5><ContactLeadCount /></h5>
                                        </div>
                                    </div>
                                    <div className="funelUnic">
                                        <div className="sheduling">
                                        </div>
                                        <div className="sheduling-text">
                                        <h5>Agendamentos</h5>
                                        <h5><SchedulingAll /></h5>
                                        </div>
                                    </div>
                                    <div className="funelUnic">
                                    <div className="completed">
                                        </div>
                                        <div className="completed-text">
                                    <h5>Visitas</h5>
                                        <h5><SchedulingAllCompleted /></h5>
                                        </div>
                                    </div>
                                    <div className="funelUnic">
                                    <div className="proposals">
                                        </div>
                                        <div className="proposals-text">
                                    <h5>Propostas</h5>
                                        <h5><ProposalsCounter /></h5>
                                        </div>
                                    </div>
                                    <div className="funelUnic">
                                    <div className="status">
                                        </div>
                                        <div className="status-text">
                                    <h5>Fechamentos</h5>
                                        <h5><PropertiesCountRentSale /></h5>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoicing">
                        <div className="infosInvoicing">
                        <h5>Faturamento</h5>
                        <div className="valuesInvoicing">
                            <div className="sales">
                                <h5>Vendas</h5>
                                <h4><SalesProperties /></h4>
                            </div>
                            <div className="rents">
                                <h5>Locações</h5>
                                <h4><RentProperties /></h4>
                            </div>
                            <div className="total">
                                <h5>Faturamento total</h5>
                                <h4><TotalRevenue /></h4>
                            </div>
                            <div className="futures">
                                <h5>Previsão</h5>
                                <h4>R$ 00,00</h4>
                            </div>
                            <div className="commissions">
                                <h5>Comissões</h5>
                                <h4><Commissions /></h4>
                            </div>
                            <div className="business">
                                <h5>Negócios ativos</h5>
                                <h4><ProposalsCounter /></h4>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

            {/* <div className="informations">

            <div className="dataSheduling">
                <div className="shedulingInfo">
                        <IoCalendarOutline />
                        <h3><SchedulingCount /></h3>
                    </div>
                    <h5>Agendamentos de hoje</h5>
                </div>
 
                <div className="infoData">
                <div className="topInfo">
                        <IoSearchOutline />
                        <h3><EvaluationCount /></h3>
                    </div>
                    <h5>Imóveis para avaliar</h5>
                </div>

                <div className="infoData">
                <div className="topInfo">
                        <IoLogoWhatsapp />
                        <h3><ContactWhatsappCount /></h3>
                    </div>
                    <h5>Contatos de Whatsapp</h5>
                </div>
                <div className="infoData">
                <div className="topInfo">
                        <IoCallOutline />
                        <h3><ContactPhoneCount /></h3>
                    </div>
                    <h5>Contatos via ligação</h5>
                </div>
                <div className="infoData">
                <div className="topInfo">
                        <IoHeartOutline />
                        <h3><FavoriteCount /></h3>
                    </div>
                    <h5>Salvos no favoritos</h5>
                </div>

            </div> */}
            {/* <div className="PlainDashboard2">
                <h4><IoAlertCircle /> Serviço de upload de imagens reestabelecido.</h4>
                <a href="/planos">Renovar agora</a>
            </div> */}


            <DownloadApp />
            </div>
        </div>
    )
}