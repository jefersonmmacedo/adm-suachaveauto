import { FiDollarSign} from "react-icons/fi"
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline, } from "react-icons/io5"
import "./printInfosFinancer.css";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import LogoImg from '../../assets/images/Logo.png'
import { useParams } from "react-router-dom";

export function PrintInfosFinancer() {
    const {type} = useParams()
    const Local = localStorage.getItem("suachave-dados");
    const dados = JSON.parse(Local);



    const valuesReceita = dados?.filter((receita) => receita.type === "Receita");
    const valuesDespesa = dados?.filter((despesa) => despesa.type === "Despesa");


      const valuesTotalReceita = valuesReceita?.reduce(function (acumulador, objetoAtual){
            return acumulador + parseFloat(parseInt(objetoAtual.value.replace(/[^0-9]/gi, "")));
          }, 0);

       const valuesTotalDespesa = valuesDespesa?.reduce(function (acumulador, objetoAtual){
            return acumulador + parseFloat(parseInt(objetoAtual.value.replace(/[^0-9]/gi, "")));
          }, 0);


      const valueTextlReceita = valuesTotalReceita.toString()
      const valueTextlReceitaFormat = valueTextlReceita?.replace("00", "")

      const valueTextDespesa = valuesTotalDespesa.toString()
      const valueTextDespesaFormat = valueTextDespesa?.replace("00", "")

      const FloatReceita = parseFloat(valueTextlReceitaFormat)
      const FloatDespesa = parseFloat(valueTextDespesaFormat)
      const totalValues = FloatReceita - FloatDespesa

      var ReceitaBRL = FloatReceita.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      var DespesaBRL = FloatDespesa.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      var TotalBRL = totalValues.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    function handlePrint() {
        window.print()
      }

      handlePrint()

    return (
        <div className="PrintInfosFinancer">
            <div className="aside">

            <div className="textHome">
            <img src={LogoImg} alt="Logo Sua Chave" />
                <h3>Relatório {type === "encargos" ? `de ${type}` : type} personalizado</h3>
                </div>

                {type !== "financeiro" ? ""
                :
            <div className="infosFinancer">
                        <div className="infoFinancerUnic">
                            <div className="top">
                                <h5>Entradas</h5>
                                <IoArrowUpCircleOutline color="00a859" size={24}/>
                            </div>
                            <h2>{ReceitaBRL}</h2>
                        </div>
                        <div className="infoFinancerUnic">
                            <div className="top">
                                <h5>Saídas</h5>
                                <IoArrowDownCircleOutline color="ed3237" size={24}/>
                            </div>
                            <h2>{DespesaBRL}</h2>
                        </div>
                        <div className={totalValues < 0 ? "infoFinancerUnicTotal2" : "infoFinancerUnicTotal"}>
                            <div className="top">
                                <h5>Saldo</h5>
                                <FiDollarSign color="fff" size={24}/>
                            </div>
                            <h2>{TotalBRL}</h2>
                        </div>
                        </div>
                 }

            <div className="financerList">
                {dados.map((financerUnci) => {
                    return (
                <div className="FinancerListUnic" key={financerUnci.id}>
                    <h5>{financerUnci.title}</h5>
                    <h5 className={financerUnci.type === "Receita" ? "up" : "down"}>{financerUnci.type}</h5>
                    <h5 className={financerUnci.type === "Receita" ? "up" : "down"}>R$ {financerUnci.value}</h5>
                    <h5 className="date"><DateFormat date={financerUnci.created_at}/></h5>
                    <div className="buttons">
                    </div>
                </div>
                    )
                })}

            </div>
            </div>



        </div>
    )
}

