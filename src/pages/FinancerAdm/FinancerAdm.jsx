import { FiDollarSign } from "react-icons/fi"
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline, IoPrintOutline} from "react-icons/io5"
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar";
import "./financerAdm.css";
import { useState } from "react";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { NewFinancer } from "../../components/NewFinancer/NewFinancer";
import { NewFinancerView } from "../../components/NewFinancerView/NewFinancerView";
import { FilterData } from "../../components/FilterData/FilterData";
import { useFetch } from "../../hooks/useFetch";

export function FinancerAdm() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
    const [verify, setVerify] = useState(false);
    const [newPeriod, setNewPeriod] = useState("");
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");


    const searchLower = search.toLowerCase()

    const { data } = useFetch(`/financer/company/${user.id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    function handleNewPeriod(e) {
            setNewPeriod(e.target.value)
    }
    function handleType(e) {
            setType(e.target.value)
    }
    function handleClearData(e) {
        e.preventDefault()
            setType("")
            setNewPeriod("")
    }


    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const dias = newPeriod === "Hoje" ? 0
            : newPeriod === "Este mês" ? 0
            :newPeriod === "Esta Semana" ? 7
            :newPeriod === "Últimos 30 dias" ? 30
            :newPeriod === "Últimos 3 meses" ? 90
            :newPeriod === "Últimos 6 meses" ? 180
            :newPeriod === "Últimos 9 meses" ? 270
            :newPeriod === "Último ano" ? 365
            : ""

    const inicial = new Date(year, month, day);
    const  milissegundos_por_dia = 1000 * 60 * 60 * 24;
    const  data_final = new Date(inicial.getTime() - dias * milissegundos_por_dia);

    const period = newPeriod === "Este mês" ?
    data?.filter((financer) => new Date(financer.created_at).getMonth() + 1 === new Date().getMonth() +1)
    :data?.filter((financer) => new Date(financer.created_at) <= new Date() && new Date(financer.created_at) > new Date(data_final));

    const periodType = newPeriod === "Este mês" ?
    data?.filter((financer) => new Date(financer.created_at).getMonth() + 1 === new Date().getMonth() +1 && financer.type === type)
    :data?.filter((financer) => new Date(financer.created_at) <= new Date() && new Date(financer.created_at) > new Date(data_final) && financer.type === type)

    const filterType = data?.filter((financer) => financer.type === type)

    const searchFilter = data?.filter((financer) => financer.title.toLowerCase().includes(searchLower))


    const listFinancer =  newPeriod === "" && type !== "" && search === "" ? filterType
                            : newPeriod !== "" && type === ""  && search === "" ? period
                            : newPeriod !== "" && type !== ""  && search === "" ? periodType
                            : newPeriod === "" && type === ""  && search !== "" ? searchFilter
                            : data

    const valuesReceita = listFinancer?.filter((receita) => receita.type === "Receita");
    const valuesDespesa = listFinancer?.filter((despesa) => despesa.type === "Despesa");


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


      function handlePrint(e) {
        e.preventDefault();
        localStorage.setItem("suachave-dados", JSON.stringify(listFinancer));
        window.open(`/imprimir/financeiro`)
      }

    return (
        <div className="FinancerAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
                <h3>Financeiro</h3>
                <NewFinancer />
                </div>
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
                        <div className="infosFinancer">
                </div>
            <div className="financerList">
            <button onClick={handlePrint}><IoPrintOutline/></button>
                <div className="searchFinance">
                    <input type="search" placeholder="Busque pelo título" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClearData}/>
                    <select value={type} onChange={handleType}>
                        <option value="">Filtrar por:</option>
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                        {/* <option value="">Vencidos</option>
                        <option value="">À vencer</option> */}
                    </select>
                    <select value={newPeriod} onChange={handleNewPeriod}>
                        <option value="">Período:</option>
                        <option value="Hoje">Hoje</option>
                        <option value="Esta Semana">Esta Semana</option>
                        <option value="Este mês">Este mês</option>
                        <option value="Últimos 30 dias">Últimos 30 dias</option>
                        <option value="Últimos 3 meses">Últimos 3 meses</option>
                        <option value="Últimos 6 meses">Últimos 6 meses</option>
                        <option value="Últimos 9 meses">Últimos 9 meses</option>
                        <option value="Último ano">Último ano</option>
                    </select>
                    
                </div>

                {listFinancer.map((financerUnci) => {
                    return (
                <div className="FinancerListUnic" key={financerUnci.id}>
                    <h5>{financerUnci.title}</h5>
                    <h5 className={financerUnci.type === "Receita" ? "up" : "down"}>R$ {financerUnci.value}</h5>
                    <h5 className="date"><DateFormat date={financerUnci.created_at}/></h5>
                    <div className="buttons">
                   <NewFinancerView id={financerUnci.id}/>
                    {/* <button><IoCreateOutline /> </button> */}
                    <FilterData />
                    </div>
                </div>
                    )
                })}

            </div>
            </div>



        </div>
    )
}

