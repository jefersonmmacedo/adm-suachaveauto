import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./newProposal.css";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { IoCheckmarkOutline, IoSearchOutline, IoStar, IoStarOutline, IoTrash} from "react-icons/io5";
import { mask as masker, unMask } from "remask";
import buscaCep from "../../services/api-buscaCep";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { NewClient } from "../../components/NewClient/NewClient";
import { NewGuarantor } from "../../components/NewGuarantor/NewGuarantor";
import { SelectAuto } from "../../components/SelectAuto/SelectAuto";
import { SelectClient } from "../../components/SelectClient/SelectClient";
import { SelectGuarantor } from "../../components/SelectGuarantor/SelectGuarantor";

export function NewProposal() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {newProposal, newFeature} = useContext(AuthContext);
    
    const [status, setStatus] = useState("Ativo");
    const [typeProposal, setTypeProposal] = useState("Ativo");
    const [id, setId] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [version, setVersion] = useState("");
    const [type, setType] = useState("");
    const [value, setValue] = useState("");
    const [valueFipe, setValueFipe] = useState("");
    const [nameClient, setNameClient] = useState("");
    const [cpfCnpjClient, setCpfCnpjClient] = useState("");
    const [emailClient, setEmailClient] = useState("");
    const [phoneClient, setPhoneClient] = useState("");
    const [whatsappClient, setWhatsappClient] = useState("");
    const [valueProposal, setValueProposal] = useState("");
    const [year, setYear] = useState("");
    const [yearModel, setYearModel] = useState("");
    const [ipva, setIpva] = useState("");
    const [plate, setPlate] = useState("");
    const [formOfpayment,setFormOfpayment] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [contactReminder, setContactReminder] = useState("");
    const [availabilityPropoerty, setAvailabilityPropoerty] = useState("");



    async function AutoInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/autos/unicauto/${data}`).then((res) => {
            console.log(data)
            setId(data)
            setBrand(res.data[0]?.brand)
            setModel(res.data[0]?.model)
            setVersion(res.data[0]?.version)
            setYear(res.data[0]?.year)
            setYearModel(res.data[0]?.yearModel)
            setIpva(res.data[0]?.ipva)
            setPlate(res.data[0]?.plate)
            setType(res.data[0]?.type)
            setValue(res.data[0]?.value)
            setValueFipe(res.data[0]?.value)
        }).catch((error) => {
            console.log(error)
        })
    }
    async function clientInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/clientCompany/unic/${data}`).then((res) => {
            console.log(data)
            setValueFipe(data)
            setNameClient(res.data[0]?.name)
            setCpfCnpjClient(res.data[0]?.cpf_Cnpj)
            setEmailClient(res.data[0]?.email)
            setPhoneClient(res.data[0]?.phone)
            setWhatsappClient(res.data[0]?.whatsapp)
        }).catch((error) => {
            console.log(error)
        })
    }


    function handleNewProposal() {
        newProposal({
            typeProposal, idAuto: id,brand, idCompany: user.id, type, value, year, ipva, plate,
            valueFipe, nameClient, cpfCnpjClient, email: emailClient, phone: phoneClient, whatsapp: whatsappClient,
            status, valueAuto: typeProposal === "Venda de imóvel" ? version : model, formOfpayment, expirationDate, contactReminder, 
        })
    }

        function handleStatus(e) {
            setStatus(e.target.value)
        }

        function handleTypeProposal(e) {
            setTypeProposal(e.target.value)
        }

        function handleContactReminder(e) {
            setContactReminder(e.target.value)
        }

        function handleExpirationDate(e) {
            setExpirationDate(e.target.value)
        }

        function handleFormOfpayment(e) {
            setFormOfpayment(e.target.value)
        }

        function handleAvailabilityPropoerty(e) {
            setAvailabilityPropoerty(e.target.value)
        }

          
    return (
        <div className="NewProposal">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Nova proposta</h3>
                <a className="link" href="/novoimovel">Voltar</a>
                </div>

                <div className="form">
                <div className="textHome">
                      <h4>Sobre a proopsta</h4>
                </div>
                <div className="data">
                <div className="dataInfo">
                    <span>Status da proposta</span>
                    <select value={status} onChange={handleStatus}>
                        <option value="">Escolha</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Pausado">Pausado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Tipo de proposta</span>
                    <select value={typeProposal} onChange={handleTypeProposal}>
                        <option value="">Escolha</option>
                        <option value="Venda de imóvel">Venda de imóvel</option>
                        <option value="Aluguel de imóvel">Aluguel de imóvel</option>
                    </select>
                    </div>
                    </div>



                <div className="textHome">
                      <h4>Dados do auto</h4>
                      <div className="newInfo">
                    <SelectAuto AutoInfoLoaded={AutoInfoLoaded}/>
                    </div>
                </div>
                <div className="data">
                <div className="dataInfo">
                    <span>Marca</span>
                    <input type="text" value={brand} />
                    </div>
                    <div className="dataInfo">
                    <span>Modelo</span>
                    <input type="text" className={model === "" ? "" : "select"} value={model}/>
                    </div>
                    <div className="dataInfo">
                    <span>Placa</span>
                    <input type="text" className={plate === "" ? "" : "select"} value={plate}/>
                    </div>
                    <div className="dataInfo2">
                    <span>Versão</span>
                    <input type="text" className={version === "" ? "" : "select"} value={version} />
                    </div>
                    <div className="dataInfo">
                    <span>Ano/Modelo</span>
                    <input type="text" className={plate === "" ? "" : "select"} value={`${year}/${yearModel}`}/>
                    </div>
                   
                    </div>


            <div className="textHome">
            <h4>Valores</h4>
                </div>

                    <div className="data">


                    <div className="dataInfo">
                    <span>Valor</span>
                    <input type="text" className={value === "" ? "" : "select"} value={value}/>
                    </div>
                    <div className="dataInfo">
                    <span>Fipe</span>
                    <input type="text" className={valueFipe === "" ? "" : "select"} value={valueFipe}/>
                    </div>
                    <div className="dataInfo">
                    <span>ipva</span>
                    <input type="text" className={ipva === "" ? "" : "select"} value={ipva} />
                    </div>
                    <div className="dataInfo">
                    <span>Valor da proposta</span>
                    <input type="text" className={valueProposal === "" ? "" : "select"} value={valueProposal}  onChange={e => setValueProposal(e.target.value)}/>
                    </div>
                    </div>
                  
  

            <div className="textHome">
            <h4>Cliente</h4>

            <div className="newInfo">
                    <SelectClient clientInfoLoaded={clientInfoLoaded}/>

                   
                    </div>
                </div>
                    <div className="data">
                        <div className="dataInfo">
                        <span>Cliente</span>
                        <input type="text" value={nameClient} />
                        </div>
                        <div className="dataInfo">
                        <span>CPF/CNPJ</span>
                        <input type="text" value={cpfCnpjClient} />
                        </div>
                        <div className="dataInfo">
                        <span>E-mail</span>
                        <input type="text" value={emailClient} />
                        </div>
                        <div className="dataInfo">
                        <span>Telefone</span>
                        <input type="text" value={phoneClient} />
                        </div>
                        <div className="dataInfo">
                        <span>Whatsapp</span>
                        <input type="text" value={whatsappClient} />
                        </div>

                    </div>


                    <div className="textHome">
                      <h4>Mais informações</h4>
                </div>
                <div className="data">
                <div className="dataInfo">
                    <span>Forma de pagamento</span>
                    <select value={formOfpayment} onChange={handleFormOfpayment}>
                        <option value="">Escolha</option>
                        <option value="Á Vista">Á Vista</option>
                        <option value="Financiamento">Financiamento</option>
                    </select>
                    </div>
                <div className="dataInfo">
                    <span>Entrada</span>
                    <input type="text" value={whatsappClient} />
                    </div>
                <div className="dataInfo">
                    <span>Nº Parcelas</span>
                    <input type="text" value={whatsappClient} />
                    </div>
                    <div className="dataInfo">
                    <span>Expiração de proposta</span>
                    <select value={expirationDate} onChange={handleExpirationDate}>
                        <option value="">Escolha</option>
                        <option value="5">5 Dias</option>
                        <option value="10">10 Dias</option>
                        <option value="15">15 Dias</option>
                        <option value="20">20 Dias</option>
                        <option value="25">25 Dias</option>
                        <option value="30">30 Dias</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Lembrete de contato</span>
                    <select value={contactReminder} onChange={handleContactReminder}>
                        <option value="">Escolha</option>
                        <option value="5">5 Dias</option>
                        <option value="10">10 Dias</option>
                        <option value="15">15 Dias</option>
                        <option value="20">20 Dias</option>
                        <option value="25">25 Dias</option>
                        <option value="30">30 Dias</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Disponibilidade do imóvel</span>
                    <select value={availabilityPropoerty} onChange={handleAvailabilityPropoerty}>
                        <option value="">Escolha</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Reservado">Reservado</option>
                    </select>
                    </div>
                    </div>
                  



                    <button className="btnSendProposal" onClick={handleNewProposal}>Cadastrar novo contrato</button>
                    </div>
            </div>
        </div>
    )
}