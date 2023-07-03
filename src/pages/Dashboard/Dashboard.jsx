import { DownloadApp } from "../../components/DownloadApp/DownloadApp"
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./dashboard.css";
import { PropertiesCount } from "../../components/ItensDashboard/PropertiesCount";
import { useEffect, useState } from "react";
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
import api from "../../services/api";


export function Dashboard() {

    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const [myPayments, setMyPayments] = useState([])
    const [myPlain, setMyPlain] = useState([])
    const [daysPayments, setDaysPayments] = useState()

    useEffect(() => {
        async function verifyPaymentStatus() {
            //Dados de plano
            const plains =  await api.get(`/myplain/${user.id}`);
            
            if(plains.data.length === 0) {
                window.open("/escolher-plano", "_self");
                return;
            }

            setMyPlain(plains.data[0].namePlain)

            if(plains.data[0].namePlain === "Free") {
                return
            }
            //Dados de pagamentos
            const payment =  await api.get(`/payments/${user.id}`)
            setMyPayments(payment.data)

            const date1 = new Date(payment.data[0]?.created_at);
            const date2 = new Date();
            const timeDiffPayments = Math.abs(date2.getTime() - date1.getTime());
            const diffDaysPayments = Math.ceil(timeDiffPayments / (1000 * 3600 * 24)); 
            setDaysPayments(diffDaysPayments);
           
            if(payment.data[0]?.status === "Pendente" && diffDaysPayments >= 6 ) {
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


                {
            myPlain === "Free" ?
                ""
            : daysPayments - 15 && myPayments[0]?.status === "Aprovado" ?
            ""
            : new Date(myPayments[0]?.created_at).getMonth() === new Date().getMonth() && new Date(myPayments[0]?.created_at).getDate() === new Date().getDate() ?
            <div className="PlainDashboard">
                <div className="text">
                <h4>Seu plano, vence hoje. Não se preocupe, você pode pagar até 5 dias após o vencimento. </h4>
                <h5>Caso ja tenha pago. Desconsidere a mensagem</h5>
                </div>
                <a href="/meus-planos">Efetuar pagamento</a>
            </div>
            : new Date(myPayments[0]?.created_at) < new Date() && new Date(myPayments[0]?.created_at) < new Date()?
            <div className="PlainDashboard">
                <div className="text">
                <h4>Seu plano, venceu no último dia {new Date(myPayments[0]?.created_at).getDate()}. Não se preocupe, você pode pagar até 5 dias após o vencimento. </h4>
                <h5>Caso ja tenha pago. Desconsidere a mensagem</h5>
                </div>
                <a href="/meus-planos">Efetuar pagamento</a>
            </div>
            : daysPayments >= 25 ?
            <div className="PlainDashboard">
                <h4>Seu plano, vence no próximo dia {new Date(myPayments[0]?.created_at).getDate()}. Não se preocupe, você pode pagar até 5 dias após o vencimento. </h4>
                <a href="/meus-planos">Efetuar pagamento</a>
            </div>
            : myPlain.length > 0 && myPayments[0]?.status === "Pendente" ?
            <div className="PlainDashboard2">
                <h4>Seu plano, ainda está com pagamento {myPayments[0]?.status}. (Em caso de pagamento efetuado, desconsidere esta mensagem) </h4>
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
                                <h6>Anuncios disponíveis <PropertiesCountAvailability availability={"Disponível"} /></h6>
                            </div>
                            <div className="sale">
                                <h6>Anuncios indisponíveis <PropertiesCountAvailability availability={"Indisponível"} /></h6>
                            </div>
                        </div>
                       </div>
                       <div className="availability">
                        <h6>Disponíveis: <PropertiesCountAvailability availability={"Disponível"} /></h6>
                        <h6>Reservados: <PropertiesCountAvailability availability={"Reservado"} /></h6>
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

        

            {/* <DownloadApp /> */}
            </div>
        </div>
    )
}