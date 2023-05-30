import "./cancelAccount.css";
import Logo from "../../../assets/images/Logo.png";
import sad from "../../../assets/images/svg/sad.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth";
import { IoCloseCircle, IoLogOutOutline } from "react-icons/io5";
import api from "../../../services/api";

export function CancelAccount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);   
    
    const { logout } = useContext(AuthContext);

    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [properties, setProperties] = useState("");
    const [plain, setPlain] = useState("");
    const [payment, setPayment] = useState("");
    const [messages, setMessages] = useState("");
    const [leads, setLeads] = useState("");
    const [contracts, setContracts] = useState("");
    const [financers, setFinancers] = useState("");
    const [charges, setCherges] = useState("");
    const [schedules, setSchedules] = useState("");
    const [clients, setClients] = useState("");
    const [locators, setLocators] = useState("");
    const [guarantors, setGuarantors] = useState("");

    useEffect(() => {
        async function loadProperties() {
            await api.get(`/property/company/${user.id}`).then((res) => {
                setProperties(res.data.length)
            }).catch((err) => {
                console.error(err)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadProperties();


        async function loadPlain() {
            await api.get(`/myplain/${user.id}`).then((res) => {
                setPlain(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadPlain();


        async function loadPayment() {
            await api.get(`/payments/${user.id}`).then((res) => {
                setPayment(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadPayment();


        async function loadMessages() {
            await api.get(`/rooms/company/${user.id}`).then((res) => {
                setMessages(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadMessages();


        async function loadLeads() {
            await api.get(`/contact/company/${user.id}`).then((res) => {
                setLeads(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadLeads();


        async function loadContracts() {
            await api.get(`/contracts/company/${user.id}`).then((res) => {
                setContracts(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadContracts();


        async function loadFinancers() {
            await api.get(`/financer/company/${user.id}`).then((res) => {
                setFinancers(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadFinancers();


        async function loadCherges() {
            await api.get(`/propertyCharges/company/${user.id}`).then((res) => {
                setCherges(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadCherges();


        async function loadSchedules() {
            await api.get(`/scheduling/${user.id}`).then((res) => {
                setSchedules(res.data.length)
            })
        }

        loadSchedules();


        async function loadClients() {
            await api.get(`/clientCompany/company/${user.id}`).then((res) => {
                setClients(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadClients();


        async function loadLocators() {
            await api.get(`/locator/company/${user.id}`).then((res) => {
                setLocators(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        loadLocators();


        async function leadGuarantors() {
            await api.get(`/guarantorCompany/company/${user.id}`).then((res) => {
                setGuarantors(res.data.length)
            }).catch((err) => {
                console.error(err)
            })
        }

        leadGuarantors();


    }, [])

    function handleLogOut() {
      logout()
    }

    function handleDeleteAccount() {
        console.log({idCompany: user.id, reason, description, properties, messages, leads, contracts, financers, charges, schedules,
            clients, locators, guarantors, initialDate: user.date, lastPlan: plain, lastPayment: payment, reconciliation: "", resultReconciliation: "", })
    }

    function handleSelectReason(e){
        setReason(e.target.value)
    }


    return (
        
        <div className="CancelAccount">

            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Olá, {user.fantasyName}</h2>
            <h4>Deseja realmente cancelar sua conta?</h4>
            <h6>Saiba que ao cancelar sua conta todos os seus: Imóveis, agendamentos, leads, mensagens, registros de contrato e financeiro serão apagados!</h6>
          

            <img src={sad} alt="Carinha triste" />

            <div className="coming">
            <h5>Informe o motivo para o cancelamento se sua conta:</h5>

            <div className="selections">
                <select value={reason} onChange={handleSelectReason}>
                    <option value="">Escolha</option>
                    <option value="Problemas com serviço prestado">Problemas com serviço prestado</option>
                    <option value="Não entrega o que oferece">Não entrega o que oferece</option>
                    <option value="Valor alto">Valor alto</option>
                    <option value="Encontrei serviço melhor">Encontrei serviço melhor</option>
                    <option value="Meu antigo serviço era melhor. Vou retornar">Meu antigo serviço era melhor. Vou retornar</option>
                    <option value="Problemas com atendimento">Problemas com atendimento</option>
                    <option value="Outros">Outros</option>
                </select>

                <textarea cols="30" rows="5" placeholder="Descreva os problemas encontrados" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <br />
            <div className="buttons">
                <a href="/home" className="btn">Voltar ao painel</a>
                <button  onClick={handleDeleteAccount}> <IoCloseCircle /> Cancelar minha conta</button>
                <button  className="logout" onClick={handleLogOut}> <IoLogOutOutline/> Sair</button>
            </div>
            </div>
          
        </div>
    )
}