import "./newCollaborator.css";

import Modal from 'react-modal';
import { useState } from "react";
import buscaCep from "../../services/api-buscaCep";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { AuthContext } from "../../contexts/Auth";
import { IoSearchOutline } from "react-icons/io5";
import { useContext } from "react";
import Switch from "react-switch";
export function NewCollaborator() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newCollaborator} = useContext(AuthContext)
    
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [ name, setName] = useState("");
    const [ fantasyName, setFantasyName] = useState("");
    const [ rg, setRg] = useState("");
    const [ cpf, setCpf] = useState("");
    const [ birthday, setBirthday] = useState("");
    const [ creci, setCreci] = useState("");
    const [ email, setEmail] = useState("");
    const [ phone, setPhone] = useState("");
    const [ whatsapp, setWhatsapp] = useState("");
    const [ road, setRoad] = useState("");
    const [ number, setNumber] = useState("");
    const [ district, setDistrict] = useState("");
    const [ city, setCity] = useState("");
    const [ uf, setUf] = useState("");
    const [ instagram, setInstagram] = useState("");
    const [ facebook, setFacebook] = useState("");
    const [ linkedin, setLinkedin] = useState("");
    const [ twitter, setTwitter] = useState("");
    const [ bank, setBank] = useState("");
    const [ agency, setAgency] = useState("");
    const [ typeAccount, setTypeAccount] = useState("");
    const [ account, setAccount] = useState("");
    const [ typeKeyPix, setTypeKeyPix] = useState("");
    const [ keypix, setKeypix] = useState("");
    const [cep, setCep] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    
    const [checked, setChecked] = useState(false);   

     function handleChange() {
        setChecked(!checked);
      }
      console.log(checked)

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function handleFile(e) {
            // console.log(e.target.files[0])
            if(e.target.files[0]){
                const image = e.target.files[0];
                if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
                    setImageAvatar(image);
                    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                    console.log(avatarUrl);
                 } else {
                     console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                     setImageAvatar(null);
                     return null;
                 }
             }
         }
         

         async function handleNewClient(e) {
            e.preventDefault();
            toast.info("Criando conta. Aguarde...")
                    //Avatar
            const uuid = uuidv4();
    
            let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
            let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
            let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
                
            console.log(uploadAvatar.ref.name, photoUrlAvatar);
            handleNewCollaborator(photoUrlAvatar)
          }

        function handleNewCollaborator(avatarLink) {
            const idv4 = uuidv4();
            const senha = idv4.substring(0,8);
            const idCompany = user.id;
            newCollaborator({idCompany, avatar: avatarLink, type: "Team", name, fantasyName, rg, cpf, birthday, creci,
                email, phone, whatsapp, cep, road, number, district, city, uf,
                instagram, facebook, linkedin, twitter,
                bank, agency, typeAccount, account, typeKeyPix, keypix, password: senha, 
                // access: {
                //     Imóveis: imoveis,
                //     Leads: leads,
                //     Chat: chat,
                //     Agenda: agenda,
                //     Avaliações: agenda,
                //     Match: match,
                //     Cadastros: cadastros,
                //     Propostas: propostas,
                //     Contratos: contratos,
                //     Vistorias: vistorias,
                //     Encargos: encargos,
                //     Financeiro: financeiro
                // }
                })
        }

        function handleNewTypeKeyPix(e) {
            setTypeKeyPix(e.target.value);
            console.log(e.target.value)
            if(e.target.value === "E-mail") {
                setKeypix(email)
            } else if(e.target.value === "Telefone") {
                setKeypix(phone)
            } else if(e.target.value === "Whatsapp") {
                setKeypix(whatsapp)
            } else if(e.target.value === "CPF") {
                setKeypix(cpf)
            }  else if(e.target.value === "Chave Aleatória") {
                setKeypix("")
            }  else if(e.target.value === "") {
                setKeypix("")
            } 
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
         <button className="link" onClick={handleOpenModalProcess}>+ Novo funcionário</button>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
 
        <div className="content-modal-team">
        <div className="itensModal-team">
            {/* <h3>Novo colaborador</h3> */}
            <h3>Novo corretor</h3>

            <div className="form">
                <div className="DataInputs">
                <div className="Avatar">
                        <h5>Foto</h5>
                        <h6>(clique na imagem para alterar)</h6>
                <label className="label-avatar">
                            <span></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>
                    </div>

                    <div className="dataInputUnic">
                        <h5>Nome completo</h5>                   
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                        <h5>Nome exibição</h5>                   
                    <input type="text" value={fantasyName} onChange={e => setFantasyName(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                        <h5>RG</h5>
                    <input type="text" value={rg} onChange={e => setRg(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                        <h5>CPF</h5>
                    <input type="text" value={cpf} onChange={e => setCpf(e.target.value)}/>
                    </div>

                    <div className="dataInputUnic">
                        <h5>Data de Nascimento</h5>
                    <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                        {/* <h5>Registro: Creci, OAB e etc...</h5> */}
                        <h5>Creci</h5>
                    <input type="text" value={creci} onChange={e => setCreci(e.target.value)}/>
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
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Instagram</h5>
                    <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)}/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Facebook</h5>
                    <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)}/>
                    </div>

                <div className="dataInputUnic">
                    <h5>Linkedin</h5>
                    <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)}/>
                    </div>
                <div className="dataInputUnic">
                    <h5>Twitter</h5>
                    <input type="text" value={twitter} onChange={e => setTwitter(e.target.value)}/>
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Banco</h5>
                    <select value={bank} id="listaSelect">
                        <option value="Banco Caixa Econômica Federal - 104">Banco Caixa Econômica Federal - 104</option>
                        <option value="Banco NuConta - 260">Banco NuConta - 260</option>
                        <option value="Banco AJ Renner - 654">Banco AJ Renner - 654</option>
                        <option value="Banco Bonsucesso - 218">Banco Bonsucesso - 218</option>
                        <option value="Banco Bradesco - 237">Banco Bradesco - 237</option>
                        <option value="Banco BTG Pactual - 208">Banco BTG Pactual - 208</option>
                        <option value="Banco BVA - 044">Banco BVA - 044</option>
                        <option value="Banco Clássico - 241">Banco Clássico - 241</option>
                        <option value="Banco Cruzeiro do Sul - 229">Banco Cruzeiro do Sul - 229</option>
                        <option value="Banco da Amazônia - 003">Banco da Amazônia - 003</option>
                        <option value="Banco Daycoval - 707">Banco Daycoval - 707</option>
                        <option value="Banco de Crédito e Varejo (BCV) - 250">Banco de Crédito e Varejo (BCV) - 250</option>
                        <option value="Banco de Pernambuco - 024">Banco de Pernambuco - 024</option>
                        <option value="Banco do Brasil - 001">Banco do Brasil - 001</option>
                        <option value="Banco do Estado do Pará - 037">Banco do Estado do Pará - 037</option>
                        <option value="Banco do Estado do Rio de Janeiro - 029">Banco do Estado do Rio de Janeiro - 029</option>
                        <option value="Banco do Estado do Rio Grande do Sul - 041">Banco do Estado do Rio Grande do Sul - 041</option>
                        <option value="Banco do Nordeste do Brasil - 004">Banco do Nordeste do Brasil - 004</option>
                        <option value="Banco Gerdau - 734">Banco Gerdau - 734</option>
                        <option value="Banco Industrial do Brasil - 604">Banco Industrial do Brasil - 604</option>
                        <option value="Banco Inter - 077">Banco Inter - 077</option>
                        <option value="Banco J. Safra - 074">Banco J. Safra - 074</option>
                        <option value="Banco JBS - 079">Banco JBS - 079</option>
                        <option value="Banco Lemon - 065">Banco Lemon - 065</option>
                        <option value="Banco Luso Brasileiro - 600">Banco Luso Brasileiro - 600</option>
                        <option value="Banco Modal - 746">Banco Modal - 746</option>
                        <option value="Banco Morgan Stanley - 066">Banco Morgan Stanley - 066</option>
                        <option value="Banco Neon - 735">Banco Neon - 735</option>
                        <option value="Banco Original - 212">Banco Original - 212</option>
                        <option value="Banco Rural Mais - 072">Banco Rural Mais - 072</option>
                        <option value="Banco Safra - 422">Banco Safra - 422</option>
                        <option value="Banco Santander - 033">Banco Santander - 033</option>
                        <option value="Banco Simples - 749">Banco Simples - 749</option>
                        <option value="Banco Sumitomo Mitsui Brasileiro - 464">Banco Sumitomo Mitsui Brasileiro - 464</option>
                        <option value="Banco Topázio - 082">Banco Topázio - 082</option>
                        <option value="Banco Triângulo - 634">Banco Triângulo - 634</option>
                        <option value="Banco Votorantim - 655">Banco Votorantim - 655</option>
                        <option value="Banco VR - 610">Banco VR - 610</option>
                        <option value="Banco Western Union do Brasil - 119">Banco Western Union do Brasil - 119</option>
                        <option value="Banco C6 Bank - 336">Banco C6 Bank - 336</option>
                        <option value="Banco Citibank - 477">Banco Citibank - 477</option>
                        <option value="Banco Hipercard Banco Múltiplo - 062">Banco Hipercard Banco Múltiplo - 062</option>
                        <option value="Banco Itaú Unibanco - 341">Banco Itaú Unibanco - 341</option>
                        </select>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Agência</h5>
                    <input type="text" value={agency} onChange={e => setAgency(e.target.value)}/>
                    </div>

                <div className="dataInputUnic">
                    <h5>Tipo de Conta</h5>
                    <select value={typeAccount} onChange={handleNewTypeAccount}>
                            <option value="">Escolha</option>
                            <option value="Corrente">Corrente</option>
                            <option value="Poupança">Poupança</option>
                            <option value="Salário">Salário</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Conta</h5>
                    <input type="text" value={account} onChange={e => setAccount(e.target.value)}/>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Tipo Chave Pix</h5>
                    <select value={typeKeyPix} onChange={handleNewTypeKeyPix}>
                            <option value="">Escolha</option>
                            <option value="Chave Aleatória">Chave Aleatória</option>
                            <option value="E-mail">E-mail</option>
                            <option value="Telefone">Telefone</option>
                            <option value="Whatsapp">Whatsapp</option>
                            <option value="CPF">CPF</option>
                        </select>
                    </div>
                <div className="dataInputUnic">
                    <h5>Chave Pix</h5>
                    <input type="text" value={keypix} onChange={e => setKeypix(e.target.value)}/>
                    </div>             
                </div>

                <div className="DataInputsSwitch">
                    <div className="dataInputSwitch">
                        <h5>Imóveis</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Leads</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Agenda</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Avaliações</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Match</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Cadastros</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Propostas</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Contratos</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Vistorias</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Encargos</h5>
                        <Switch onChange={handleChange} checked={checked} />
                    </div>
                    <div className="dataInputSwitch">
                        <h5>Financeiro</h5>
                        <Switch onChange={handleChange} checked={checked} />
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




