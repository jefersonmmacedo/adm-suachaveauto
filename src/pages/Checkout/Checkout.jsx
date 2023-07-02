import { IoCheckbox, } from "react-icons/io5";
import Navbar2 from "../../components/Nav/Navbar";
import Modal from 'react-modal';
import "./checkout.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import {toast} from 'react-toastify';
import { v4 as uuidv4} from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function Checkout() {
    const {id} = useParams();
    const {createPayment, createMyPlain} = useContext(AuthContext);

    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const [plain, setPlain] = useState();
    const [users, setUsers] = useState(0);
    const [emphasis, setEmphasis] = useState(0);
    const [accountBrokerCounter, setAccountBrokerCounter] = useState(0);
  
    useEffect(() => {
        async function loadPlainSelected() {
            await api.get(`/plains/plain/${id}`).then((res) => {
                setPlain(res.data[0])
                console.log(res.data[0]);

                setUsers(
                    res.data[0]?.users)
                setEmphasis(
                    res.data[0]?.emphasis )
            }).catch((error) => {
                console.log(error)
            })
        }
        
        loadPlainSelected()
    }, [])

    function handleAditionalUsers(data) {
        if(accountBrokerCounter === 0 && data === "-") {
            return
        }
        if(accountBrokerCounter > 0 && data === "-") {
            setAccountBrokerCounter(accountBrokerCounter - 1)
        }
        if(data === "+") {
            setAccountBrokerCounter(accountBrokerCounter + 1)
        }
    }
    //const accountBrokerCounter = accountBroker > 3 ? accountBroker - 3 : 0

    const valuePlain = plain?.valueNew === "" ? plain?.value : plain?.valueNew
    //const valorNumber = parseInt(plain?.valueNew.replace(/[^0-9]/gi, ""));
    const valorNumberFormat = plain?.name === "Free" ? + 0.00 : parseFloat(valuePlain) + 0.99;
    const valuePlainFormated = valorNumberFormat.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const valueUsers = accountBrokerCounter * 29.99
    const usersValueFormated = valueUsers.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const valueHost = plain?.name === "Start" ? 0.00 : 5.99

    const valueTotal = valueUsers + valorNumberFormat;
    // const valueTotal = valueUsers + valorNumberFormat + valueHost;
    var ValueBRL = valueTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const ValueBOLETO = parseInt(ValueBRL.replace(/[^0-9]/gi, ""));
console.log(ValueBOLETO)
    

    function handleNewPayment() {
        const status = "Pendente"
        const status2 = "Ativo"
        const aceptTerms = "Sim"

        toast.info("Gerando pagamento...")

        createPayment({
            id: uuidv4(),
            idPlain: plain?.id, idCompany: user.id, email: user.email,
            namePlain: plain?.name, value: ValueBRL, period: plain?.period,
            linvoice_link: "", aceptTerms, status, status2, voucher: "", type: "",
            users, maturity: new Date().getDate(), emphasis, nameCompany: user.fantasyName
        })
    }

    function handleNewPaymentFree() {
        const status2 = "Ativo"
        const aceptTerms = "Sim"

        toast.info("Criando plano...")

        createMyPlain({
            idPlain: plain?.id, idCompany: user.id, email: user.email,
            namePlain: plain?.name, value: ValueBRL, period: plain?.period,
            linvoice_link: "", aceptTerms, status2, 
            users, maturity: new Date().getDate(), emphasis, nameCompany: user.fantasyName
        })
    }



    Modal.setAppElement('#root');
    return (
        <div className="Checkout">
            <Navbar2 />
            
            <div className="Payment">
            <div className="PlainSelected">
                    <h3>Plano Selecionado</h3>
                    <div className="plain">
                        <h4><span>Plano</span> {plain?.name} - Mensal</h4>

                        <a href="/novoplano">Alterar plano</a>
                    </div>

                    <div className="text">
                    {plain?.infos.map((info) => {
                        return (
                            <p><IoCheckbox /> {info.info}</p>
                        )
                    })}
                   
                </div>
                <div className="pricePlain">
                    <p>Valor do plano:</p>
                    <h4>{valuePlainFormated}</h4>
                </div>
                {/* {
                    plain?.name === "Start" ? "" :
                    <div className="pricePlain">
                    <p>Taxa hospedagem:</p>
                    <h4>R$ 5,99</h4>
                </div>
                } */}

                {/* <div className="pricePlain">
                    <p>{accountBrokerCounter} usuários adicionais (R$ 29,90 cada)</p>
                    <h4>{usersValueFormated}</h4>
                </div>
                <div className="pricePlain2">
                    <p>Adicionar usuários</p>
                   <div className="addUsers">
                    <button onClick={() => handleAditionalUsers("-")}>-</button>
                    <button onClick={() => handleAditionalUsers("+")}>+</button>
                   </div>
                </div> */}

                <div className="pricePlain">
                    <p>Valor total:</p>
                    <h3>{ValueBRL}</h3>
                </div>
            </div>

            <div className="PaymentPlayn">
            <h3>Método de pagamento</h3>
                <p>Escolha o melhor método de pagamento para você</p>
            <div className="buttons">
                {/* <button className="btn-pix" onClick={handleOpenModalSearch}>Pagar com PIX</button> */}
                {plain?.name === "Free" ?
                <button className="btn-pix" onClick={handleNewPaymentFree}>Ativar Plano</button>
                :
                <button className="btn-pix" onClick={handleNewPayment}>Pagar com Bolix (Boleto com PIX)</button>
                }
                </div>
                <p>Ao finalizar o pagamento você confirma que está de acordo com nossos termos de uso e política de privacidade</p>
            </div>

            </div>
        </div>
    )
}