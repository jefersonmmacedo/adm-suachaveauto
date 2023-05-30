import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./newRegisterSale.css";
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
import { SelectProperty } from "../../components/SelectProperty/SelectProperty";
import { SelectClient } from "../../components/SelectClient/SelectClient";
import { SelectGuarantor } from "../../components/SelectGuarantor/SelectGuarantor";

export function NewRegisterSale() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newRegisterSale, newFeature} = useContext(AuthContext);
    
    const [status, setStatus] = useState("Ativo");
    const [typeProposal, setTypeProposal] = useState("Ativo");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [priceRent, setPriceRent] = useState("");
    const [priceSale, setPriceSale] = useState("");
    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");
    const [idClient, setIdClient] = useState("");
    const [nameClient, setNameClient] = useState("");
    const [cpfCnpjClient, setCpfCnpjClient] = useState("");
    const [emailClient, setEmailClient] = useState("");
    const [phoneClient, setPhoneClient] = useState("");
    const [whatsappClient, setWhatsappClient] = useState("");
    const [valueProposal, setValueProposal] = useState("");
    const [condominium, setCondominium] = useState("");
    const [iptu, setIptu] = useState("");
    const [otherPrices, setOtherPrices] = useState("");
    const [fireInsurance, setFireInsurance] = useState("");
    const [formOfpayment,setFormOfpayment] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [contactReminder, setContactReminder] = useState("");
    const [availabilityPropoerty, setAvailabilityPropoerty] = useState("");



    async function propertyInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/property/${data}`).then((res) => {
            console.log(data)
            setId(data)
            setTitle(res.data[0]?.title)
            setPriceRent(res.data[0]?.priceRent)
            setPriceSale(res.data[0]?.priceSale)
            setCondominium(res.data[0]?.condominium)
            setIptu(res.data[0]?.iptu)
            setOtherPrices(res.data[0]?.otherPrices)
            setType(res.data[0]?.type)
            setSubType(res.data[0]?.subType)
        }).catch((error) => {
            console.log(error)
        })
    }
    async function clientInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/clientCompany/unic/${data}`).then((res) => {
            console.log(data)
            setIdClient(data)
            setNameClient(res.data[0]?.name)
            setCpfCnpjClient(res.data[0]?.cpf_Cnpj)
            setEmailClient(res.data[0]?.email)
            setPhoneClient(res.data[0]?.phone)
            setWhatsappClient(res.data[0]?.whatsapp)
        }).catch((error) => {
            console.log(error)
        })
    }


    function handleNewRegisterSale() {
        newRegisterSale({
            typeProposal, idProperty: id,title, idCompany: user.id, type, subType, condominium, iptu, otherPrices,
            idClient, nameClient, cpfCnpjClient, email: emailClient, phone: phoneClient, whatsapp: whatsappClient,
            status, valueProperty: typeProposal === "Venda de imóvel" ? priceSale : priceRent, formOfpayment, expirationDate, contactReminder, 
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
        <div className="NewRegisterSale">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Nova venda</h3>
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
                      <h4>Imóvel / Proprietário</h4>
                      <div className="newInfo">
                    <SelectProperty propertyInfoLoaded={propertyInfoLoaded}/>
                    </div>
                </div>
                <div className="data">
                <div className="dataInfo">
                    <span>Imóvel</span>
                    <input type="text" value={id == "" ? "" : `${id} - ${title}`} />
                    </div>
                    <div className="dataInfo">
                    <span>Tipo do Imóvel</span>
                    <input type="text" className={type === "" ? "" : "select"} value={type}/>
                    </div>
                    <div className="dataInfo">
                    <span>Subtipo do imóvel</span>
                    <input type="text" className={subType === "" ? "" : "select"} value={subType}/>
                    </div>
                    <div className="dataInfo">
                    <span>Valor proposta</span>
                    <input type="text" className={valueProposal === "" ? "" : "select"} value={typeProposal === "Venda de imóvel" ? priceSale : priceRent} />
                    </div>
                   
                    </div>


            <div className="textHome">
            <h4>Encargos</h4>
                </div>

                    <div className="data">


                    <div className="dataInfo">
                    <span>IPTU</span>
                    <input type="text" className={iptu === "" ? "" : "select"} value={iptu} />
                    </div>
                    <div className="dataInfo">
                    <span>Condomínio</span>
                    <input type="text" className={condominium === "" ? "" : "select"} value={condominium}/>
                    </div>
                    <div className="dataInfo">
                    <span>Outros Encargos</span>
                    <input type="text" className={otherPrices === "" ? "" : "select"} value={otherPrices}/>
                    </div>
                          <div className="dataInfo">
                        <span>Valor Seguro incêncio</span>
                        <input type="text" className={fireInsurance === "" ? "" : "select"} value={fireInsurance} onChange={e => setFireInsurance(e.target.value)}/>
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
                    {formOfpayment === "Á Vista" ? "" :
                    <>
                    <div className="dataInfo">
                    <span>Banco do financiamento</span>
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
                    <span>Valor de entrada</span>
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
                    <span>Nº parcelas</span>
                    <select value={availabilityPropoerty} onChange={handleAvailabilityPropoerty}>
                        <option value="">Escolha</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Reservado">Reservado</option>
                    </select>
                    </div>
                    </>
                    }
                    </div>
                  



                    <button className="btnSendProposal" onClick={handleNewRegisterSale}>Cadastrar nova venda</button>
                    </div>
            </div>
        </div>
    )
}