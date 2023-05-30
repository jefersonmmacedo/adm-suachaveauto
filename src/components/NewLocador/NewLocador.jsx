import "./newLocador.css";

import Modal from 'react-modal';
import { useState } from "react";
import buscaCep from "../../services/api-buscaCep";
import { AuthContext } from "../../contexts/Auth";
import { IoSearchOutline } from "react-icons/io5";
import { useContext } from "react";

export function NewLocador() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newLocador} = useContext(AuthContext)
    
    
    const [isOpenModalLocator, setIsOpenModaLocator] = useState(false);
    const [ name, setName] = useState("");
    const [ fantasyName, setFantasyName] = useState("");
    const [ rg, setRg] = useState("");
    const [ cpf_Cnpj, setCpf_Cnpj] = useState("");
    const [ birthday, setBirthday] = useState("");
    const [ email, setEmail] = useState("");
    const [ phone, setPhone] = useState("");
    const [ whatsapp, setWhatsapp] = useState("");
    const [ road, setRoad] = useState("");
    const [ number, setNumber] = useState("");
    const [ district, setDistrict] = useState("");
    const [ city, setCity] = useState("");
    const [ uf, setUf] = useState("");
    const [ typeAccount, setTypeAccount] = useState("Pessoa Física");
    const [cep, setCep] = useState("");


    const newName =  name.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newFantasyName =  fantasyName.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCity =  city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newDistrict =  district.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newRoad =  road.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());

    function handleOpenModalLocator(e) {
        e.preventDefault();
          setIsOpenModaLocator(true)
        }
      
        function handleCloseModalLocator(e) {
          e.preventDefault();
          setIsOpenModaLocator(false);
        }


        function handleNewClient() {
            const idCompany = user.id;
            newLocador({idCompany, name: newName, fantasyName: newFantasyName, rg, cpf_Cnpj, birthday, email, phone, whatsapp, cep, road: newRoad, number, district: newDistrict, city: newCity, uf: uf.toUpperCase(),})
        }


        function handleNewTypeAccount(e) {
            setTypeAccount(e.target.value);
            console.log(e.target.value)
        }
        async function handleNewCep(e) {
            e.preventDefault();
            console.log("");
                await buscaCep(`${cep}/json`).then((res) => {
                    console.log(res.data);
                    setCity(res.data.localidade);
                    setUf(res.data.uf);
                })

        }
        
        

        Modal.setAppElement('#root');
    return (
        <>
         <button className="link" onClick={handleOpenModalLocator}>Novo proprietário</button>


        <Modal isOpen={isOpenModalLocator} onRequestClose={handleCloseModalLocator}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
 
        <div className="content-moda-Locator">
        <div className="itensModal-Locator">
            {/* <h3>Novo colaborador</h3> */}
            <h3>Novo locador</h3>

            <div className="form">
                <div className="DataInputs">
                 <div className="dataInputUnic">
                    <h5>Tipo</h5>
                        <select value={typeAccount} onChange={handleNewTypeAccount}>
                            <option value="">Escolha</option>
                            <option value="Pessoa Física">Pessoa Física</option>
                            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                        </select>
                    </div> 

                    <div className="dataInputUnic">
                        {typeAccount === "Pessoa Física" ?
                        <h5>Nome completo</h5>                   
                        :
                        <h5>Razão Social</h5>                   
                        }
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                    {typeAccount === "Pessoa Física" ?
                        <h5>Nome exibição (Tratamento)</h5>                  
                        :
                        <h5>Nome Fantasia</h5>                   
                        }
                 
                    <input type="text" value={fantasyName} onChange={e => setFantasyName(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                    {typeAccount === "Pessoa Física" ?
                        <h5>RG</h5>                  
                        :
                        <h5>Insc. Estad. (Não obrigatório)</h5>                   
                        }
                    <input type="text" value={rg} onChange={e => setRg(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                    {typeAccount === "Pessoa Física" ?
                        <h5>CPF</h5>                  
                        :
                        <h5>CNPJ</h5>                   
                        }
                    <input type="text" value={cpf_Cnpj} onChange={e => setCpf_Cnpj(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                        <h5>Data de Nascimento</h5>
                    <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    </div>
                </div>

                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Telefone</h5>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Whatsapp</h5>
                        <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    </div>
                </div>
                <div className="DataInputs">
                <div className="searchInputs">
                        <input type="text" placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)}/>
                        <button onClick={handleNewCep}><IoSearchOutline /></button>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Rua</h5>
                    <input type="text" value={road} onChange={e => setRoad(e.target.value)}/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Número</h5>
                    <input type="text" value={number} onChange={e => setNumber(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                    <h5>Bairro</h5>
                    <input type="text" value={district} onChange={e => setDistrict(e.target.value)}/>
                    </div>   

                    <div className="dataInputUnic">
                    <h5>Cidade</h5>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)}/>
                    </div>           

                    <div className="dataInputUnic">
                    <h5>UF</h5>
                    <input type="text" value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>             
                  
                </div>



                <div className="ButtonsForm">
                <button className="send" onClick={handleNewClient}>Cadastrar</button>
                <button className="cancel" onClick={handleCloseModalLocator}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}