import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import Navbar2 from "../../components/Nav/Navbar";
import api from "../../services/api";
import "./paymentCompleted.css";
import { parseISO, format} from 'date-fns';
import { DateFormat } from "../../components/DateFormat/DateFormat";

import Confirmed from "../../assets/images/svg/confirmed2.svg"

export function PaymentCompleted() {
  const Local = localStorage.getItem("adm-suachave");
  const user = JSON.parse(Local);

  const [myPayment, setMyPayment] = useState();

  useEffect(() => {
    async function loadPayments() {
      await api.get(`/payments/${user.id}`).then((res) => {
        setMyPayment(res.data[0]);
        console.log(res.data[0]);
      })
    }

    loadPayments()


  }, [])

  function hadleDirection(e) {
    e.preventDefault();

    window.open("/meus-planos", "_self");
  }

  const idFormat = myPayment?.id.substring(0, 13);
    return (
        <div className="PaymentCompleted">
            <Navbar2 />
            
            <div className="Payment">
            <div className="PlainSelected">
                    <h3><IoCheckmarkCircle />Pagamento Finalizado</h3>
                  <div className="pricePlain">
                    <h5>ID Pedido:</h5>
                    <h4>{idFormat}</h4>
                </div>
                  {/* <div className="pricePlain">
                    <h5>Data:</h5>
                    <h4><DateFormat date={myPayment?.created_at}/></h4>
                </div> */}
                  <div className="pricePlain">
                    <h5>Total</h5>
                    <h4>{myPayment?.value}</h4>
                </div>
                <div className="pricePlain">
                    <h5>Tipo de pagamento</h5>
                    <h4>Plano/Mensal</h4>
                </div>
                  <div className="pricePlain">
                    <h5>Forma de pagamento:</h5>
                    <h4>Bolix (Boleto com Pix)</h4>
                </div>

            </div>

            <div className="PaymentPlayn">
              <img src={Confirmed} alt="Imagem de confirmação de pagamento e criação de conta" />
                <h3>Obrigado por sua compra</h3>
                <h5>Estamos muito felizes que você faça parte de nosso time. <br />
                Estamos trabalhando duro para trazer melhorias e facilitar o contato das imobiliárias com mais clientes a cada dia.</h5>
                <br />
                <h5>Obs.: O pagamento será confirmado em até 48h, você receberá um e-mail de confirmação. <br />
                Não se preocupe, seu acesso ja está liberado!</h5>

                <button onClick={hadleDirection}>Ir para o meu painel</button>
            </div>
            </div>
        </div>
    )
}