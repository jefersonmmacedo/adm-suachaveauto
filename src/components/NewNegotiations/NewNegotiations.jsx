import "./newNegotiations.css";
import { mask as masker, unMask } from "remask";
import { IoCheckboxOutline, IoCloseOutline, IoHomeOutline, IoLocationOutline, IoLogoWhatsapp, IoMailOpenOutline, IoPhonePortraitOutline, IoSearchOutline} from 'react-icons/io5';
import {VscNewFile} from 'react-icons/vsc';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/Auth";
import {toast} from 'react-toastify';

export function NewNegotiations({idProperty}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [emailSearch, setEmailSearch] = useState();
    const [client, setClient] = useState([]);
    const [property, setProperty] = useState();
    const [status, setStatus] = useState();
    const [deadlineNumber, setDeadlineNumber] = useState("");
    const [deadlineText, setDeadlineText] = useState("");
    const [parcelNumber, setParcelNumber] = useState("");
    const [parcelText, setParcelText] = useState("");
    const [typeOfInsurance, setTypeOfInsurance] = useState("");

    const [newPriceRent, setNewPriceRent] = useState(status === "Venda" ? property?.priceSale : property?.priceRent);

    const {mewNegociation} = useContext(AuthContext)

    useEffect(() => {
        async function loadProperty() {
            await api.get(`/property/${idProperty}`).then((res) => {
             //   console.log(res.data[0])
                setProperty(res.data[0])
                setStatus(res.data[0].status)
            }).catch((err) => {
                console.log(err)
            })
        }

        loadProperty()
    }, [])


    function handleNewNegociation() {
        toast.info("Criando processo...") 
        mewNegociation({
            idCompany: user.id,
            idTeam: "",
            idClient: client.id,
            nameCompany: user.fantasyName,
            nameClient: client.fantasyName,
            cpfClient: client.cpf,
            emailClient: client.email,
            idProperty,
            titleProperty: property.title,
            typeNegotiation: status,
            status: "Pendente",
            deadline: `${deadlineNumber} ${deadlineText}`,
            parcel: `${parcelNumber} ${parcelText}`,
            valueProperty: status === "Venda" ? property?.priceSale : property?.priceRent,
            amountofCharges: ResultBRLCharges,
            valueTotal: status === "Venda" && property?.priceSale === "" ? newPriceRent :
                        status === "Venda" && property?.priceSale !== "" ? property?.priceSale
                        : ResultBRL,
            typeOfInsurance: typeOfInsurance
        })
    }


    async function newClient(e) {
        e.preventDefault();
        await api.get(`/clientCompany/email/${emailSearch}`).then((res) => {
            console.log(res.data[0])
          //  setClient(res.data[0])

        }).catch((err) => {
            console.log(err)
        })
    }
    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }
        
        function handleStatus(e) {
          setStatus(e.target.value);
        }
        
        function handleDeadlineText(e) {
          setDeadlineText(e.target.value);
        }
        
        function handleTypeOfInsurance(e) {
          setTypeOfInsurance(e.target.value);
        }

        function ChangeMaskValueRent(e) {
            const originalValue = unMask(e.target.value);
            const maskedValue = masker(originalValue, [
                        "9,99",
                        "99,99",
                        "999,99",
                        "9.999,99",
                        "99.999,99",
                        "999.999,99",
                        "9.999.999,99",
                        "99.999.999,99",
                        "999.999.999,99",
                        "9.999.999.999,99",
                        "99.999.999.999,99",
                        "999.999.999.999,99",
            ]);
        
            setNewPriceRent(maskedValue)
          }


        // Calculo de valores 
        const valueRent = parseInt(property?.priceRent?.replace(/[^0-9]/gi, ""));
        const valueText = valueRent.toString()
        const valueTextFormat = valueText?.replace("00", "")

        const valueRentNew = parseInt(newPriceRent?.replace(/[^0-9]/gi, ""));
        const valueTextNew = valueRentNew.toString()
        const valueTextFormatNew = valueTextNew?.replace("00", "")

        const valueSale = parseInt(property?.priceSale?.replace(/[^0-9]/gi, ""));
        const valueTextSale = valueSale.toString()
        const valueTextSaleFormat = valueTextSale?.replace("00", "")

        const valueconcominium = parseInt(property?.condominium?.replace(/[^0-9]/gi, ""));
        const valueTextconcominium = valueconcominium.toString()
        const valueTextconcominiumFormat = valueTextconcominium?.replace("00", "")

        const valueIptu = parseInt(property?.iptu?.replace(/[^0-9]/gi, ""));
        const valueTextIptu = valueIptu.toString()
        const valueTextIptuFormat = valueTextIptu?.replace("00", "")

        const valueOtherPrices = parseInt(property?.otherPrices?.replace(/[^0-9]/gi, ""));
        const valueTextOtherPrices = valueOtherPrices.toString()
        const valueTextOtherPricesFormat = valueTextOtherPrices?.replace("00", "")
      


const valuesRent =[
  {
  id: "rent",
  value: property?.priceRent === "" ? parseInt(valueTextFormatNew) : parseInt(valueTextFormat)
  },
  {
      id: "condominium",
      value: property?.condominium === "" ? "0,00" : valueTextconcominiumFormat
      },
      {
      id: "iptu",
      value: property?.iptu === "" ? "0,00" : valueTextIptuFormat
      },
      {
      id: "otherPrices",
      value: property?.otherPrices === "" ? "0,00" : valueTextOtherPricesFormat
      }
]
const valuesSale =[
  {
  id: "sale",
  value: property?.priceSale === "" ? "0,00" : parseInt(valueTextSaleFormat)
  },
  {
    id: "condominium",
    value: property?.condominium === "" ? "0,00" : valueTextconcominiumFormat
    },
    {
    id: "iptu",
    value: property?.iptu === "" ? "0,00" : valueTextIptuFormat
    },
    {
    id: "otherPrices",
    value: property?.otherPrices === "" ? "0,00" : valueTextOtherPricesFormat
    }
]
const valuesCharges =[
    {
        id: "condominium",
        value: property?.condominium === "" ? "0,00" : valueTextconcominiumFormat
        },
        {
        id: "iptu",
        value: property?.iptu === "" ? "0,00" : valueTextIptuFormat
        },
        {
        id: "otherPrices",
        value: property?.otherPrices === "" ? "0,00" : valueTextOtherPricesFormat
        }
]

const valuesTotalRent = valuesRent?.reduce(function (acumulador, objetoAtual){
  return acumulador + parseFloat(objetoAtual.value);
}, 0);
const valuesTotalSale = valuesSale?.reduce(function (acumulador, objetoAtual){
  return acumulador + parseFloat(objetoAtual.value);
}, 0);
const valuesTotalCharges = valuesCharges?.reduce(function (acumulador, objetoAtual){
  return acumulador + parseFloat(objetoAtual.value);
}, 0);

var ResultBRL = valuesTotalRent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
var ResultSaleBRL = valuesTotalSale.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
var ResultBRLCharges = valuesTotalCharges.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

        function newContract() {
            console.log({
            idCompany: user.id, idTeam: "", idClient: client?.id, idProperty, typeNegotiation: status, status: "pendente",
            deadline: "", parcel: "", valueProperty: status === "Venda" ? property?.priceSale : property?.priceRent,
            amountofCharges: ResultBRLCharges, valueTotal: "", typeOfInsurance: ""
            })
        }

        Modal.setAppElement('#root');
    return (
        <>
        <button className="New" onClick={handleOpenModalProcess} data-tip data-for='Novo Aluguel/Venda'><VscNewFile /></button>
            <ReactTooltip id='Novo Aluguel/Venda' place="bottom" type="dark" effect="solid">
            <span>Novo Aluguel/Venda</span>
            </ReactTooltip>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
        {/* <button type="button" className="react-modal-button" onClick={handleCloseModalProcess}>
        <IoCloseOutline color={"#fff"}/> 
        </button> */}



        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Nova venda/aluguel</h3>

            <div className="form">
                <div className="ProcessData">
                <div className="dataProperty">
                        <div className="imageProperty">
                       <img src={property?.featuredImage} alt={property?.featuredImage} />
                        </div>

                        <div className="userInformations">
                            <h5 className="title">{property?.title}</h5>
                            <h6><IoHomeOutline /> {property?.type} - {property?.subType}</h6>
                            <h6><IoLocationOutline />{property?.road} - {property?.district} - {property?.city} - {property?.uf}</h6>
                            <h6><IoCheckboxOutline /> {property?.status}</h6>
                        </div>
                    </div>

                    <div className="dataUser">
                        <div className="searchData">
                        <input type="text" placeholder="Digite o e-mail do cliente" value={emailSearch} onChange={e => setEmailSearch(e.target.value)}/>
                        <button className="btn" onClick={newClient}><IoSearchOutline /></button>
                        </div>
                        {client?.length === 0 ? "" :
                        <div className="userInformations">
                            <h5 className="title">{client?.name}</h5>
                            <h6><IoLocationOutline /> {client?.city} - {client?.uf}</h6>
                            <h6><IoMailOpenOutline />{client?.email}</h6>
                            <h6><IoPhonePortraitOutline />{client?.phone}</h6>
                            <h6><IoLogoWhatsapp />{client?.whatsapp}</h6>
                        </div>
                        }
                    </div>

                </div>

                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Tipo de processo</h5>
                    <select value={status} onChange={handleStatus}>
                            <option value="Aluguel">Aluguel</option>
                            <option value="Venda">Venda</option>
                            <option value="Anos">Anos</option>
                        </select>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Prazo contrato</h5>
                    <div className="doubleInputs">
                    <input type="text" placeholder="Ex.: 1" value={deadlineNumber} onChange={e => setDeadlineNumber(e.target.value)}/>
                        <select value={deadlineText} onChange={handleDeadlineText}>
                            <option value="Semanas">Semanas</option>
                            <option value="Meses">Meses</option>
                            <option value="Anos">Anos</option>
                        </select>
                    </div>
                    </div>
                  
                      <div className="dataInputUnic">
                    <h5>Seguro</h5>
                        <select className="select2" value={typeOfInsurance} onChange={handleTypeOfInsurance}>

                            {status === "Venda" ?
                            <>
                            <option value="">Escolha o seguro</option>
                            <option value="Seguro residencial">Seguro residencial</option>
                            <option value="Seguro habitacional">Seguro habitacional</option>
                            <option value="Seguro fiança locatícia">Seguro fiança locatícia</option>
                            <option value="Seguro imobiliário">Seguro imobiliário</option>
                            </>
                            :
                            <>
                            <option value="">Escolha o seguro</option>
                            <option value="Depósito calção">Depósito calção</option>
                            <option value="Fiador">Fiador</option>
                            <option value="Seguro fiança">Seguro fiança</option>
                            </>
                            }
                        </select>
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Valor do imóvel</h5>
                    <input type="text" placeholder={status === "Venda" ? property?.priceSale : property?.priceRent}
                        value={newPriceRent} onChange={ChangeMaskValueRent}/>
                       
                    </div>
                    {status === "Venda" ? "" :
                    <div className="dataInputUnic">
                    <h5>Valor total dos encargos</h5>
                    <input type="text" placeholder={ResultBRLCharges} />
                    </div>
                    }
                    <div className="dataInputUnic">
                    <h5>Valor total do contrato</h5>
                        <input type="text" placeholder={status === "Venda" && property?.priceSale === "" ? newPriceRent :
                                                        status === "Venda" && property?.priceSale !== "" ? property?.priceSale
                                                        : ResultBRL} />
                    </div>
                </div>

                <div className="ButtonsForm">
                <button className="send" onClick={handleNewNegociation}>Enviar Solicitação</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}