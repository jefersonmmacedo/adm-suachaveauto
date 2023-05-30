import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./newContract.css";
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

export function NewContract() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newContract, newFeature} = useContext(AuthContext);
    
    const [status, setStatus] = useState("Ativo");
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
    const [emailClient, setEmailClient] = useState("");
    const [phoneClient, setPhoneClient] = useState("");
    const [whatsappClient, setWhatsappClient] = useState("");
    const [valueContract, setValueContract] = useState("");
    const [contractNew, setContractNew] = useState("Novo");
    const [maturityContract, setMaturityContract] = useState("");
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
    const [readjustmentIndex, setReadjustmentIndex] = useState("");
    const [fireInsuranceExpiration, setFireInsuranceExpiration] = useState("");

    
    
    
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
            setEmailClient(res.data[0]?.email)
            setPhoneClient(res.data[0]?.phone)
            setWhatsappClient(res.data[0]?.whatsapp)
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

    const valueContractRentOriginal = parseInt(valueContract?.replace(/[^0-9]/gi, ""))
    const valueContractRentOriginal2 = valueContractRentOriginal.toString()
    const valueContractRent = valueContractRentOriginal2?.replace("00", "") / 30
    console.log(valueContractRent)
    const valueProportioanal = valueContractRent * parseInt(daysProportional)
    console.log(valueProportioanal)

    
    var firstProportionalInstallment = valueProportioanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})



function handleFireInsurance(e) {
    setFireInsurance(e.target.value);
}
function handleAssurance(e) {
    setAssurance(e.target.value);
}
function handleStatus(e) {
    setStatus(e.target.value);
}
function handleConractNew(e) {
    setContractNew(e.target.value);
}
function handleAdjustment(e) {
    setAdjustment(e.target.value);
}
function handleProportionalRent(e) {
    setProportionalRent(e.target.value);
}
function handleReadjustmentIndex(e) {
    setReadjustmentIndex(e.target.value);
}




    function handleNewContract() {
        newContract({
            idProperty: id,title, idCompany: user.id, idLocator, nameLocator, cpfCnpjLocator, idClient, nameClient, emailClient, phoneClient, whatsappClient, cpfCnpjClient, idGuarantor,
            nameGuarantor, cpfCnpjGuarantor, type, subType, assurance, securityDeposit, typeNegotiation: "Alguel de Imóvel", newContract: contractNew, status,
            startContract, endContract, parcels, maturityContract, valueContract, condominium, iptu, otherPrices, adjustment,
            readjustedRentDate, transfer, transferAmount, proportionalRent, firstProportionalInstallment, fireInsurance, valueFireInsurance,
            readjustmentIndex, fireInsuranceExpiration
        })
    }


    
    return (
        <div className="NewContract">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Novo contrato</h3>
                <a className="link" href="/novoimovel">Voltar</a>
                </div>

                <div className="form">
                <div className="textHome">
                      <h4>Sobre o contrato</h4>
                </div>
                <div className="data">
                <div className="dataInfo">
                    <span>Status do contrato</span>
                    <select value={status} onChange={handleStatus}>
                        <option value="">Escolha</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Pausado">Pausado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Condição do contrato</span>
                    <select value={contractNew} onChange={handleConractNew}>
                        <option value="">Escolha</option>
                        <option value="Novo">Novo</option>
                        <option value="Em andamento">Em andamento</option>
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
                    <span>Proprietário/Loador</span>
                    <input type="text" value={idLocator == "" ? "" :
                                             idLocator === undefined ? "Imóvel sem proprietário geristrado" :
                                             `${nameLocator} - CPF/CNPJ: ${cpfCnpjLocator}`} />
                    </div>
                    <div className="dataInfo">
                    <span>Tipo do Imóvel</span>
                    <input type="text" className={type === "" ? "" : "select"} value={type}/>
                    </div>
                    <div className="dataInfo">
                    <span>Subtipo do imóvel</span>
                    <input type="text" className={subType === "" ? "" : "select"} value={subType}/>
                    </div>
                   
                   
                    </div>





            <div className="textHome">
            <h4>Duração de contrato</h4>
                </div>

                    <div className="data">
                    <div className="dataInfo">
                    <span>Data de Início</span>
                    <input type="date" className={startContract === "" ? "" : "select"} value={startContract} onChange={e => setStartContract(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Duração (Meses)</span>
                    <input type="text" className={parcels === "" ? "" : "select"} placeholder="Duração (Meses)" value={parcels} onChange={e => setParcels(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Vencimento</span>
                    <input type="text" className={maturityContract === "" ? "" : "select"} value={maturityContract} onChange={e => setMaturityContract(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Data Final</span>
                    <input type="text" className={endContract === "" ? "" : "select"} value={endContract.toLocaleDateString()}/>
                    </div>
                    <div className="dataInfo">
                    <span>Terá reajuste</span>
                    <select value={adjustment} onChange={handleAdjustment}>
                        <option value="">Escolha</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                  {adjustment !== "Sim" ? "" : 
                  <div className="dataInfo">
                        <span>Próximo reajuste</span>
                        <input type="text" className={readjustedRentDate === "" ? "" : "select"}
                                value={readjustedRentDate.toLocaleDateString()}/>
                        </div>}
                  {adjustment !== "Sim" ? "" : 
                  <div className="dataInfo">
                      <span>Tipo de reajuste aplicado</span>
                        <select value={readjustmentIndex} onChange={handleReadjustmentIndex}>
                            <option value="">Escolha</option>
                            <option value="IGP-M">IGP-M</option>
                            <option value="IPCA">IPCA</option>
                            <option value="Salário Mínimo">Salário Mínimo</option>
                        </select>
                    </div>
                        }
                    </div>



            <div className="textHome">
            <h4>Valores</h4>
                </div>

                    <div className="data">
                    <div className="dataInfo">
                    <span>Valor aluguel</span>
                    <input type="text" className={valueContract === "" ? "" : "select"} value={valueContract} />
                    </div>
                        <div className="dataInfo">
                        <span>Primeiro aluguel proporcional?</span>
                        <select value={proportionalRent} onChange={handleProportionalRent}>
                            <option value="">Escolha</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                        </div>
                       { proportionalRent !== "Sim" ? "" :
                            <>
                             <div className="dataInfo">
                        <span>Dias proporcionais</span>
                        <input type="text" className={daysProportional === "" ? "" : "select"} value={daysProportional} onChange={e => setDaysProportional(e.target.value)}/>
                        </div>
                        <div className="dataInfo">
                        <span>Valor do primeiro aluguel</span>
                        <input type="text" className={firstProportionalInstallment === "" ? "" : "select"} value={firstProportionalInstallment}/>
                        </div></>
                        }
                    </div>
                  



                    
                <div className="textHome">
                     <h4>Encargos do imóvel</h4>
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
                    <span>Seguro incêncio?</span>
                    <select value={fireInsurance} onChange={handleFireInsurance}>
                        <option value="">Selecione</option>
                        <option value="Sim">Sim</option>
                        <option value="Nâo">Nâo</option>
                    </select>
                    </div>
                    {fireInsurance !== "Sim" ? "" :
                        <div className="dataInfo">
                        <span>Valor Seguro incêncio</span>
                        <input type="text" className={valueFireInsurance === "" ? "" : "select"} value={valueFireInsurance} onChange={e => setValueFireInsurance(e.target.value)}/>
                        </div>
                    }
                    {fireInsurance !== "Sim" ? "" :
                        <div className="dataInfo">
                        <span>Vencimento Seguro incêncio</span>
                        <input type="date" className={fireInsuranceExpiration === "" ? "" : "select"} value={fireInsuranceExpiration} onChange={e => setFireInsuranceExpiration(e.target.value)}/>
                        </div>
                    }

                    </div>
    

            <div className="textHome">
            <h4>Cliente e Garantia</h4>

            <div className="newInfo">
                    <SelectClient clientInfoLoaded={clientInfoLoaded}/>

                    {assurance === "Fiador" ?
                        <SelectGuarantor guarantorInfoLoaded={guarantorInfoLoaded}/>
                        : ""
                        }
                   
                    </div>
                </div>
                    <div className="data">
                        <div className="dataInfo">
                        <span>Garantia do contrato</span>
                        <select value={assurance} onChange={handleAssurance}>
                            <option value="">Escolha</option>
                            <option value="Fiador">Fiador</option>
                            <option value="Seguro Calção">Seguro Calção</option>
                        </select>
                        </div>
                        <div className="dataInfo">
                        <span>Cliente</span>
                        <input type="text" value={idClient == "" ? "" :
                                             idClient === undefined ? "Imóvel sem proprietário geristrado" :
                                             `${nameClient} - CPF/CNPJ: ${cpfCnpjClient}`} />
                        </div>
                        {assurance === "Fiador" ?
                        <div className="dataInfo">
                        <span>Fiador</span>
                        <input type="text" value={idGuarantor == "" ? "" :
                                             idGuarantor === undefined ? "Imóvel sem proprietário geristrado" :
                                             `${nameGuarantor} - CPF/CNPJ: ${cpfCnpjGuarantor}`} />
                        </div>
                        : assurance === "Seguro Calção" ?
                        <div className="dataInfo">
                        <span>Valor de Depósito</span>
                        <input type="text" className={securityDeposit === "" ? "" : "select"} value={securityDeposit} onChange={e => setSecurityDeposit(e.target.value)}/>
                        </div>
                        : ""
                        }
                    </div>
                  



                    <button className="btnSendContract" onClick={handleNewContract}>Cadastrar novo contrato</button>
                    </div>
            </div>
        </div>
    )
}