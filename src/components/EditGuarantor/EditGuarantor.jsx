import "./editGuarantor.css";

import Modal from 'react-modal';
import { useEffect, useState } from "react";
import buscaCep from "../../services/api-buscaCep";
import { AuthContext } from "../../contexts/Auth";
import { IoCreateOutline, IoSearchOutline } from "react-icons/io5";
import { useContext } from "react";
import api from "../../services/api";

export function EditGuarantor({id}) {
    console.log(id)
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

     const {updateGuarantor} = useContext(AuthContext)
    
    
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


    useEffect(() => {
        async function loadGuarantor() {
            await api.get(`/guarantorCompany/unic/${id}`).then((res) => {
                console.log(res.data[0])
                setName(res.data[0].name)
                setFantasyName(res.data[0].fantasyName)
                setRg(res.data[0].rg)
                setCpf_Cnpj(res.data[0].cpf_Cnpj)
                setBirthday(res.data[0].birthday)
                setEmail(res.data[0].email)
                setPhone(res.data[0].phone)
                setWhatsapp(res.data[0].whatsapp)
                setRoad(res.data[0].road)
                setNumber(res.data[0].number)
                setCity(res.data[0].city)
                setUf(res.data[0].uf)
                setCep(res.data[0].cep)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadGuarantor()
    }, [])


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
            updateGuarantor({id, name: newName, fantasyName: newFantasyName, rg, cpf_Cnpj, birthday, email, phone, whatsapp, cep, road: newRoad, number, district: newDistrict, city: newCity, uf: uf.toUpperCase(),})
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
         <button className="btnControl" onClick={handleOpenModalLocator}><IoCreateOutline /></button>


        <Modal isOpen={isOpenModalLocator} onRequestClose={handleCloseModalLocator}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
 
        <div className="content-moda-Locator">
        <div className="itensModal-Locator">
            {/* <h3>Novo colaborador</h3> */}
            <h3>Novo Fiador</h3>

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