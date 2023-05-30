import "./newChargePayment.css";

import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { mask as masker, unMask } from "remask";
import { toNumber } from "vanilla-masker";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth";
import { MyButtonDocument } from "../UploadDocuments/UploadDocuments";
import { useState } from "react";
import api from "../../services/api";


export function NewChargePayment() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
    const [locators, setLocators] = useState([]);
    const [selectLocator, setSelectLocator] = useState("");
    const [nameLocator, setNameLocator] = useState("");
    const [properties, setProperties] = useState([]);
    const [selectProperty, setSelectProperty] = useState("");
    const [nameProperty, setNameProperty] = useState("");


    const {NewChargePayment} = useContext(AuthContext);

    const [isOpenModalSearch, setIsOpenModaSearch] = useState(false);
    const [typeButton, setTypeButton] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [valueFinance, setValueFinance] = useState("");
    const [document, setDocument] = useState("");
    const [nameDocument, setNameDocument] = useState("");

    useEffect(() => {
        async function loadLocators() {
            await api.get(`/locator/company/${user.id}`).then((res) => {
                setLocators(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadLocators()
    })

    
function handleSelectLocator(e) {
    setSelectLocator(e.target.value)
    loadProperties(e.target.value)
    console.log(e.target.value)
}
async function loadProperties(id) {
    console.log(id)
    await api.get(`/property/locator/${id}`).then((res) => {
        setProperties(res.data)
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    })
}

function handleSelectProperty(e) {
    setSelectProperty(e.target.value)
    console.log(e.target.value)
}

    function handleNewFincancer(e) {
        e.preventDefault();
        const idTransaction = ""
       NewChargePayment({idCompany: user.id, idTransaction: idTransaction,idLocator: selectLocator, nameLocator, idProperty: selectProperty, nameProperty, title, description, type: typeButton, value: valueFinance, document})
    }

    function uploadFiles2(data) {
        console.log(data)
        setDocument(data[0].link)
        setNameDocument(data[0].name)
    }

    function handleOpenModalSearch(e) {
        e.preventDefault();
          setIsOpenModaSearch(true)
        }
      
        function handleCloseModalSearch(e) {
          e.preventDefault();
          setIsOpenModaSearch(false);
        }
  
        function handleNewType(data) {
            setTypeButton(data)
        }

        function handleSelectTitle(e) {
            setTitle(e.target.value)
        }

        function ChangeMaskValueFinance(e) {
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
        
            setValueFinance(maskedValue)
          }


      Modal.setAppElement('#root');
    return (
        <>
         <button className="financerButton" onClick={handleOpenModalSearch}>+ Nova Transação </button>


         <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <IoCloseOutline color={"#fff"}/> 
            </button>
            <div className="content-modal-home-Search">
            <div className="itensModalHome-Search">
               <div className="form">
                    {/* <input type="text" placeholder="Título" /> */}
                    <select value={title} onChange={handleSelectTitle}>
                        <option value="">Selecione</option>
                        <option value="Entrada de Receita">Entrada de Receita</option>
                        <option value="Sangria - Saída de recursos">Sangria - Saída de recursos</option>
                        <option value="Conta de Luz">Conta de Luz</option>
                        <option value="Recebimento dívida antiga">Recebimento dívida antiga</option>
                        <option value="Conta de internet">Conta de internet</option>
                        <option value="Avaliação de imóvel">Avaliação de imóvel</option>
                        <option value="Recebimento de Aluguel">Recebimento de Aluguel</option>
                        <option value="Recebimento de IPTU">Recebimento de IPTU</option>
                        <option value="Recebimento de Condomínio">Recebimento de Condomínio</option>
                        <option value="Salário de funcionário">Salário de funcionário</option>
                        <option value="Recebimento de Venda">Recebimento de Venda</option>
                        <option value="Reparo em imóvel">Reparo em imóvel</option>
                        <option value="Pagamento de aluguel">Pagamento de aluguel</option>
                        <option value="Conta de água">Conta de água</option>
                        <option value="IPTU">IPTU</option>
                        <option value="Despesa com automóvel">Despesa com automóvel</option>
                        <option value="Recursos informática">Recursos informática</option>
                        <option value="Insumos papelaria">Insumos papelaria</option>
                        <option value="Recursos documentação">Recursos documentação</option>
                    </select>
                    <textarea cols="30" rows="5" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                    <div className="data">
                    <input type="text" placeholder="Digite nome do locador" list="brow" value={selectLocator} onChange={handleSelectLocator} />
                    <datalist id="brow" >
                    {locators?.map((locator) => {
                            return (
                                <>
                                <option autocomplete="off" key={locator.id} value={locator.id}>{locator.fantasyName} - {locator.city} - {locator.uf}</option>
                                </>
                            )
                        })}
                    </datalist>

                    <input type="text" placeholder="Digite titulo do imóvel" list="brow2" value={selectProperty} onChange={handleSelectProperty} />
                    <datalist id="brow2" >
                    {properties?.map((property) => {
                            return (
                                <>
                                <option autocomplete="off" key={property.id} value={property.id}>{property.title} - {property.status}  - {property.city} - {property.uf}</option>
                                </>
                            )
                        })}
                    </datalist>

                    </div>
                    <div className="TypeButtons">
                        <button className={typeButton === "Receita" ? "btnType3" : "btnType1"} onClick={() => handleNewType("Receita")}><IoArrowUpCircleOutline />Receita</button>
                        <button className={typeButton === "Despesa" ? "btnType4" : "btnType2"} onClick={() => handleNewType("Despesa")}><IoArrowDownCircleOutline />Despesa</button>
                    </div>

                    <br />
                    <MyButtonDocument uploadFiles2={uploadFiles2}/>
                    
                    {document !== "" ?
                    <>
                     <h5>Comprovantes anexados:</h5>
                    <a href={document} target="_blank">{nameDocument}</a>
                    </>
                    :""
                    }
                   
                    <br />
                    <div className="dataForm">
                    <h4>R$</h4>
                    <input type="text" placeholder="Valor" value={valueFinance} onChange={ChangeMaskValueFinance}/>
                    </div>
                    <br />
                    <button className="send" onClick={handleNewFincancer}>Cadastrar</button>
                    </div>
            </div>
            </div>
            </Modal>
        </>
    )
}