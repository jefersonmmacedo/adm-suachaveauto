import "./newClient.css";

import { IoAddCircle, IoFileTrayFullOutline, IoSearchOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useContext, useState } from "react";
import buscaCep from "../../services/api-buscaCep";
import { toast } from 'react-toastify';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../contexts/Auth";
import ReactTooltip from 'react-tooltip';
import { useEffect } from "react";
import api from "../../services/api";

export function NewClient({pageProp, nameLead, emailLead, phoneLead, whatsappLead, avatarLead, idProperty }) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newClientCompany} = useContext(AuthContext)
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [typeClient, setTypeClient] = useState("Pessoa Física");

    const page = pageProp

    const [idProcess, setIdProcess] = useState("");
    const [name, setName] = useState(nameLead);
    const [fantasyName, setFantasyName] = useState("");
    const [rg, setRg] = useState("");
    const [cpf_Cnpj, setCpf_Cnpj] = useState("");
    const [email, setEmail] = useState(emailLead);
    const [phone, setPhone] = useState(phoneLead);
    const [whatsapp, setWhatsapp] = useState(whatsappLead);
    const [road, setRoad] = useState(""); 
    const [number, setNumber] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [interest, setInterest] = useState("");
    const [type, setType] = useState("");
    const [subtype, setSubtype] = useState("");
    const [cityPreference, setCityPreference] = useState("");
    const [ufPreference, setUfPreference] = useState("");
    const [attendance, setAttendance] = useState("");
    const [cep, setCep] = useState("");
    const [cepPreference, setCepPreference] = useState("");

    const newFantasyName =  fantasyName.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCity =  city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newDistrict =  district.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCityPreference =  cityPreference.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newRoad =  road.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());

    useEffect(() => {
        async function loadproperty() {
            await api.get(`/property/${idProperty}`).then((res) => {
                setInterest(res.data[0].status)
                setType(res.data[0].type)
                setSubtype(res.data[0].subType)
                setCityPreference(res.data[0].city)
                setUfPreference(res.data[0].uf)
            }).catch((err) => {
                console.log(err)
            })
        }

        loadproperty()
    }, [])

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }


        function handleNewClient() {
            console.log({idProcess, idCompany: user.id, typeClient, name: name.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()), fantasyName: newFantasyName, rg, cpf_Cnpj, email, phone, whatsapp, avatar: "", road: newRoad,
             number, district: newDistrict, city: newCity, uf: uf.toUpperCase(), interest, type, subtype, cityPreference: newCityPreference, ufPreference: ufPreference.toUpperCase(), attendance,})

                newClientCompany({idProcess, idCompany: user.id,typeClient, name: name.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()), fantasyName: newFantasyName, rg, cpf_Cnpj, email, phone, whatsapp, avatar: "", road: newRoad,
                 number, district: newDistrict, city: newCity, uf: uf.toUpperCase(), interest, type, subtype, cityPreference: newCityPreference, ufPreference: ufPreference.toUpperCase(), attendance,})
        }

        function handleNewTypeClient(e) {
            setTypeClient(e.target.value)
        }

        function handleNewInterest(e) {
            setInterest(e.target.value)
        }

        function  handleNewType(e) {
            setType(e.target.value)
        }

        function handleNewSubtype(e) {
            setSubtype(e.target.value)
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

        async function handleNewCepPreference(e) {
            e.preventDefault();
            console.log("");
                await buscaCep(`${cepPreference}/json`).then((res) => {
                    console.log(res.data);
                    setCityPreference(res.data.localidade)
                    setUfPreference(res.data.uf)
                })

        }

        

        Modal.setAppElement('#root');
    return (
        <>
        {page === "client" ?
         <button className="link" onClick={handleOpenModalProcess}>Novo cliente</button>
         : 
         <>
           <button className="btnNewClient" data-tip data-for='Novo Cliente' onClick={handleOpenModalProcess}><IoAddCircle /></button>
                        <ReactTooltip id='Novo Cliente' place="bottom" type="dark" effect="solid">
                         <span>Novo Cliente</span>
                        </ReactTooltip></>
        }


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process-client">
        <div className="itensModal-Process-client">
            <h3>Novo cliente</h3>

            <div className="form">
                <div className="DataInputs">
                <div className="dataInputUnic">
                    <h5>Tipo de cliente</h5>
                        <select value={typeClient} onChange={handleNewTypeClient}>
                            <option value="Pessoa Física">Pessoa Física</option>
                            <option value="Pessoa Júridica">Pessoa Júridica</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">
                        {
                        typeClient === "Pessoa Física" ? 
                        <h5>Nome completo</h5>
                            :
                            <h5>Razão Social</h5>
                        }
                    
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                       
                    </div>
                    <div className="dataInputUnic">
                    {
                        typeClient === "Pessoa Física" ? 
                        <h5>Nome de tratamento</h5>
                            :
                            <h5>Nome Fantasia</h5>
                        }
                    
                    <input type="text" value={fantasyName} onChange={e => setFantasyName(e.target.value)}/>
                    </div>
                    
                    <div className="dataInputUnic">
                    {
                        typeClient === "Pessoa Física" ? 
                        <h5>CPF</h5>
                            :
                            <h5>CNPJ</h5>
                        }  
                    
                    <input type="text" value={cpf_Cnpj} onChange={e => setCpf_Cnpj(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                    {
                        typeClient === "Pessoa Física" ? 
                        <h5>RG</h5>
                            :
                            <h5>Ins. Estadual (Opcional)</h5>
                        }   
                   
                    <input type="text" value={rg} onChange={e => setRg(e.target.value)}/>
                       
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
                    <h5>Estado</h5>
                    <input type="text" value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                </div>
                <div className="DataInputs">
                <div className="searchInputs">
                        <input type="text" placeholder="CEP" value={cepPreference} onChange={e => setCepPreference(e.target.value)}/>
                        <button onClick={handleNewCepPreference}><IoSearchOutline /></button>
                    </div>
                    <div className="dataInputUnic"> 
                    <h5>Interesse</h5>
                    <select value={interest} onChange={handleNewInterest}>
                            <option value="">Escolha</option>
                            <option value="Carro">Carro</option>
                            <option value="Moto">Moto</option>
                            <option value="Utilitário">Utilitário</option>
                            <option value="Caminhão">Caminhão</option>
                            <option value="Ônibus">Ônibus</option>
                        </select>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Carroceria</h5>
                    <select value={type} onChange={handleNewType}>
                    <option value="">Escolha</option>
                        <option value="Hatch">Hatch</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Pickup">Pickup</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Marca</h5>
                    <select value={subtype} onChange={handleNewSubtype}>
                    <option value="">Escolha</option>
                    <option value="Hatch">Hatch</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Pickup">Pickup</option>
                    </select>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Modelo</h5>
                    <select value={subtype} onChange={handleNewSubtype}>
                    <option value="">Escolha</option>
                    <option value="Hatch">Hatch</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Pickup">Pickup</option>
                    </select>
                    </div>

                    <div className="dataInputUnic">
                    <h5>Cidade</h5>
                    <input type="text" value={cityPreference} onChange={e => setCityPreference(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Estado</h5>
                    <input type="text" value={ufPreference} onChange={e => setUfPreference(e.target.value)}/>
                    </div>
                </div>

                <div className="ButtonsForm">
                <button className="send" onClick={handleNewClient}>Cadastrar</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>

        </Modal>
        </>
    )
}