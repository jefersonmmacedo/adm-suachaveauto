import "./editClient.css";

import { IoCreateOutline, IoFileTrayFullOutline, IoSearchOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useContext, useState } from "react";
import buscaCep from "../../services/api-buscaCep";
import { AuthContext } from "../../contexts/Auth";
import ReactTooltip from 'react-tooltip';
import { useEffect } from "react";
import api from "../../services/api";

export function EditClient({id}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {updateClientCompany} = useContext(AuthContext)
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [typeClient, setTypeClient] = useState("Pessoa Física");


    const [idProcess, setIdProcess] = useState("");
    const [name, setName] = useState("");
    const [fantasyName, setFantasyName] = useState("");
    const [rg, setRg] = useState("");
    const [cpf_Cnpj, setCpf_Cnpj] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
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

    const newFantasyName =  fantasyName?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCity =  city?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newDistrict =  district?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCityPreference =  cityPreference?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newRoad =  road?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());

    useEffect(() => {
        async function loadGuarantor() {
            await api.get(`/clientCompany/unic/${id}`).then((res) => {
                console.log(res.data[0])
                setName(res.data[0].name)
                setFantasyName(res.data[0].fantasyName)
                setRg(res.data[0].rg)
                setCpf_Cnpj(res.data[0].cpf_Cnpj)
                // setBirthday(res.data[0].birthday)
                setEmail(res.data[0].email)
                setPhone(res.data[0].phone)
                setWhatsapp(res.data[0].whatsapp)
                setRoad(res.data[0].road)
                setNumber(res.data[0].number)
                setDistrict(res.data[0].district)
                setCity(res.data[0].city)
                setUf(res.data[0].uf)
                setCep(res.data[0].cep)
                setType(res.data[0].cep)
                setSubtype(res.data[0].cep)
                setCityPreference(res.data[0].cep)
                setUfPreference(res.data[0].cep)
                setCepPreference(res.data[0].cep)
                setAttendance(res.data[0].attendance)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadGuarantor()
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
            console.log({idProcess, idCompany: user.id, typeClient, name: name?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()), fantasyName: newFantasyName, rg, cpf_Cnpj, email, phone, whatsapp, avatar: "", road: newRoad,
             number, district: newDistrict, city: newCity, uf: uf?.toUpperCase(), interest, type, subtype, cityPreference: newCityPreference, ufPreference: ufPreference?.toUpperCase(), attendance,})

             updateClientCompany({id, idProcess, idCompany: user.id,typeClient, name: name?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()), fantasyName: newFantasyName, rg, cpf_Cnpj, email, phone, whatsapp, avatar: "", road: newRoad,
                 number, district: newDistrict, city: newCity, uf: uf?.toUpperCase(), interest, type, subtype, cityPreference: newCityPreference, ufPreference: ufPreference?.toUpperCase(), attendance,})
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
       <button className="btnControl" onClick={handleOpenModalProcess}><IoCreateOutline /></button>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
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
                            <option value="">Interesse</option>
                            <option value="Aluguel">Aluguel</option>
                            <option value="Venda">Venda</option>
                        </select>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Tipo</h5>
                    <select value={type} onChange={handleNewType}>
                    <option value="">Tipo</option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Rural">Rural</option>
                        <option value="Terrenos e Lotes">Terrenos e Lotes</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Subtipo</h5>
                    <select value={subtype} onChange={handleNewSubtype}>
                        {type === "Residencial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Casa">Casa</option>
                        <option value="Casa geminada">Casa geminada</option>
                        <option value="Sobrado">Sobrado</option>
                        <option value="Bangalô">Bangalô</option>
                        <option value="Edícula">Edícula</option>
                        <option value="Flat">Flat</option>
                        <option value="Casa de vila">Casa de vila</option>
                        <option value="Condomínio fechado">Condomínio fechado</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Apartamento duplex">Apartamento duplex</option>
                        <option value="Cobertura">Cobertura</option>
                        <option value="Cobertura duplex">Cobertura duplex</option>
                        <option value="Loft">Loft</option>
                        <option value="Kitnet">Kitnet</option>
                        <option value="Mansão">Mansão</option>
                        <option value="Stúdio">Stúdio</option>
                        </>
                        : type === "Comercial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Loja">Loja</option>
                        <option value="Conjunto comercial">Conjunto comercial</option>
                        <option value="Ponto comercial">Ponto comercial</option>
                        <option value="Sala Comercial">Sala Comercial</option>
                        <option value="Prédio">Prédio</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Stúdio">Stúdio</option>
                        </>
                        : type === "Industrial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Galpão">Galpão</option>
                        <option value="Área industrial">Área industrial</option>
                        </>
                        : type === "Rural" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Chácara">Chácara</option>
                        <option value="Fazenda">Fazenda</option>
                        <option value="Sítio">Sítio</option>
                        </>
                        : type === "Terrenos e Lotes" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Área">Área</option>
                        <option value="Terreno/Lote">Terreno/Lote</option>
                        </>
                        :  <option value="">Selecione o tipo</option>
                        }
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