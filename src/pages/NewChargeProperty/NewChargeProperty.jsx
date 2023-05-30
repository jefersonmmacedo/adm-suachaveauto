import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./newChargeProperty.css";
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

export function NewChargeProperty() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {NewChargeProperty, newFeature} = useContext(AuthContext);
    

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");
    const [idLocator, setIdLocator] = useState("");
    const [nameLocator, setNameLocator] = useState("");
    const [cpfCnpjLocator, setCpfCnpjLocator] = useState("");
    const [idGuarantor, setIdGuarantor] = useState("");
    const [nameGuarantor, setNameGuarantor] = useState("");
    const [cpfCnpjGuarantor, setCpfCnpjGuarantor] = useState("");
    const [idClient, setIdClient] = useState("");
    const [nameClient, setNameClient] = useState("");
    const [cpfCnpjClient, setCpfCnpjClient] = useState("");
    const [valueContract, setValueContract] = useState("");
    const [contractNew, setContractNew] = useState("");
    const [condominium, setCondominium] = useState("");
    const [iptu, setIptu] = useState("");
    const [otherPrices, setOtherPrices] = useState("");
    const [assurance, setAssurance] = useState("");
    const [securityDeposit, setSecurityDeposit] = useState("");
    const [startContract, setStartContract] = useState(new Date());
    const [parcels, setParcels] = useState(0);
    const [adjustment, setAdjustment] = useState(1);
    const [proportionalRent, setProportionalRent] = useState(1);
    const [daysProportional, setDaysProportional] = useState(1);
    const [transfer, setTransfer] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [fireInsurance, setFireInsurance] = useState("");
    const [valueFireInsurance, setValueFireInsurance] = useState("");
    const [percentage, setPercentage] = useState("");

    const date = new Date(startContract)
    const endContract = new Date(date.setMonth(date.getMonth() + parseInt(parcels)));

    const date2 = new Date(startContract)
    const readjustedRentDate = new Date(date2.setFullYear(date2.getFullYear() + 1))


    async function propertyInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/property/${data}`).then((res) => {
            console.log(data)
            setId(data)
            setTitle(res.data[0]?.title)
            setIdLocator(res.data[0]?.idLocator)
            setValueContract(res.data[0]?.priceRent)
            setCondominium(res.data[0]?.condominium)
            setIptu(res.data[0]?.iptu)
            setOtherPrices(res.data[0]?.otherPrices)
            loadLocator(res.data[0]?.idLocator)
            setType(res.data[0]?.type)
            setSubType(res.data[0]?.subType)
        }).catch((error) => {
            console.log(error)
        })

        async function loadLocator(data) {
            await api.get(`/locator/unic/${data}`).then((res) => {
                loadLocator(data)
                setNameLocator(res.data[0]?.name)
                setCpfCnpjLocator(res.data[0]?.cpf_Cnpj)
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    async function clientInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/clientCompany/unic/${data}`).then((res) => {
            console.log(data)
            setIdClient(data)
            setNameClient(res.data[0]?.name)
            setCpfCnpjClient(res.data[0]?.cpf_Cnpj)
        }).catch((error) => {
            console.log(error)
        })
    }

    async function guarantorInfoLoaded(data) {
        console.log(data);
       
        await api.get(`/guarantorCompany/unic/${data}`).then((res) => {
            console.log(data)
            setIdGuarantor(data)
            setNameGuarantor(res.data[0]?.name)
            setCpfCnpjGuarantor(res.data[0]?.cpf_Cnpj)
        }).catch((error) => {
            console.log(error)
        })
    }

    // Valor de reajuste
    // const valor = 2500
    // const calculo = valor * 0.30 + valor
    //console.log(calculo)

    const valorReajuste = valueContract
    const ValorRepassePercentage = valorReajuste * parseInt(percentage) + valorReajuste



    console.log(valueContract?.replace(/[^0-9]/gi, "") )
    const valueContractRent = parseInt(valueContract?.replace(/[^0-9]/gi, "")) / 30
    console.log(valueContractRent)
    const valueProportioanal = valueContractRent * parseInt(daysProportional)
    console.log(valueProportioanal)

    
    var FirstProportionalInstallment = valueProportioanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})


function handleNewChargeProperty() {
    NewChargeProperty({
    })
}


function handleAssurance(e) {
    setAssurance(e.target.value);
}
function handleTransfer(e) {
    setTransfer(e.target.value);
}
function handleAdjustment(e) {
    setAdjustment(e.target.value);
}
function handleProportionalRent(e) {
    setProportionalRent(e.target.value);
}


    
    return (
        <div className="NewChargeProperty">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Novo encargo</h3>
                <a className="link" href="/novoimovel">Voltar</a>
                </div>

                <div className="form">
                <div className="textHome">
                      <h4>Imóvel / Proprietário</h4>
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
                    <span>Proprietário/Loador</span>
                    <input type="text" value={idLocator == "" ? "" :
                                             idLocator === undefined ? "Imóvel sem proprietário geristrado" :
                                             `${nameLocator} - CPF/CNPJ: ${cpfCnpjLocator}`} />
                    </div>
                   
                    </div>
                    

                    <div className="newInfo">
                    <SelectProperty propertyInfoLoaded={propertyInfoLoaded}/>
                    </div>


            <div className="textHome">
            <h4>Dados do encargo</h4>
                </div>
              
                    <div className="data">
                    <div className="dataInfo">
                    <span>Encargo</span>
                    <select value={adjustment} onChange={handleAdjustment}>
                        <option value="">Escolha</option>
                        <option value="Seguro Incêndio">Seguro Incêndio</option>
                        <option value="Conta de Luz">Conta de Luz</option>
                        <option value="Conta de Água">Conta de Água</option>
                        <option value="Taxa de limpeza">Taxa de limpeza</option>
                        <option value="Condomínio">Condomínio</option>
                        <option value="IPTU">IPTU</option>
                        <option value="Aluguel">Aluguel</option>
                        <option value="Internet">Internet</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Período</span>
                    <select value={adjustment} onChange={handleAdjustment}>
                        <option value="">Escolha</option>
                        <option value="Mensal">Mensal</option>
                        <option value="Anual">Anual</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Alerta</span>
                    <input type="text" className={title === "" ? "" : "select"} value={"5 Dias antes"}/>
                    </div>
                    <div className="dataInfo">
                    <span>Valor</span>
                    <input type="text" className={title === "" ? "" : "select"} />
                    </div>
                    <div className="dataInfo">
                    <span>Próximo pagamento</span>
                    <input type="text" className={title === "" ? "" : "select"} />
                    </div>
                    </div>
                    <button className="btnSendContract" onClick={handleNewChargeProperty}>Cadastrar novo encargo11902</button>
                    </div>

            </div>
        </div>
    )
}