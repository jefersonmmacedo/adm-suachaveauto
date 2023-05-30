import "./filterData.css"
import { useContext, useState } from "react";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoClose, IoCreateOutline, IoSearchOutline } from "react-icons/io5";
import { TbBath, TbBone, TbSofa } from "react-icons/tb";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import { mask as masker, unMask } from "remask";
import { toNumber } from "vanilla-masker";
import { MyButtonDocument } from "../UploadDocuments/UploadDocuments";

export function FilterData({id}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {editFinancer} = useContext(AuthContext);

    const [filter, setFilter] = useState(false);
    const [typeButton, setTypeButton] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [valueFinance, setValueFinance] = useState("");

    function handleNewFincancer(e) {
        e.preventDefault();
        const idTransaction = ""
        console.log({title, description, type: typeButton, valueFinance})
       editFinancer({title, description, type: typeButton, valueFinance})
        console.log(toNumber(valueFinance))
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
          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="FilterData">
  <button className="btnFilter" onClick={handleFiltro}><IoCreateOutline /></button>
        <div className={filter === true ? "searchItensFilter" : "searchItensFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="searchOptionsFilter">
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
                    <textarea cols="30" rows="10" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <div className="TypeButtons">
                        <button className={typeButton === "Receita" ? "btnType3" : "btnType1"} onClick={() => handleNewType("Receita")}><IoArrowUpCircleOutline />Receita</button>
                        <button className={typeButton === "Despesa" ? "btnType4" : "btnType2"} onClick={() => handleNewType("Despesa")}><IoArrowDownCircleOutline />Despesa</button>
                    </div>
                    <br />
                    <MyButtonDocument />
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
        </div>
    )
}