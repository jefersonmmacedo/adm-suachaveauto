import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./webApp.css";
import { useContext, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useFetch } from "../../hooks/useFetch";
import imageSite from "../../assets/images/svg/website.svg";
import Task from "../../assets/images/svg/task.svg";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { AuthContext } from "../../contexts/Auth";

export function WebApp() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newWebSite} = useContext(AuthContext)

    const [website, setWebsite] = useState()
    const [websiteAddress, setWebsiteAddress] = useState()
    const [hosting, setHosting] = useState()
    const [domain, setDomain] = useState()
    const [companyDomain, setCompanyDomain] = useState()
    const [emailProfessional, setEmailProfessional] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [color, setColor] = useState()
    const [history, setHistory] = useState()
    const [mission, setMission] = useState()
    const [vision, setVision] = useState()
    const [values, setValues] = useState()
    const [logo, setLogo] = useState(user.logo)
    const [stepe, setStepe] = useState("1")

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

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

     async function handleNewAccount(e) {
        e.preventDefault();

        toast.info("Enviando informações...")
                //Avatar
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatarCompany/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
        handleNewWebSite(photoUrlAvatar)
      }



     function handleNewWebSite(photoUrlAvatar) {
        newWebSite({ idCompany:user.id, status: "Pendente",website,websiteAddress, hosting, domain, companyDomain, emailProfessional,
            title, description, color, history, mission, vision, values, logo: avatarUrl === null ? user.logo : photoUrlAvatar})
     }
     function handleSetStepe(data) {
        setStepe(data)
     }

     function handleWebsite(e) {
        setWebsite(e.target.value);
     }

     function handleHosting(e) {
        setHosting(e.target.value);
     }

     function handleDomain(e) {
        setDomain(e.target.value);
     }

     function handleCompanyDomain(e) {
        setCompanyDomain(e.target.value);
     }

     function handleEmailProfessional(e) {
        setEmailProfessional(e.target.value);
     }

     const {data} = useFetch(`/webSiteClient/company/${user.id}`);

     if(!data) {
        return (
            <h5>Carregando...</h5>
        )
     }
     if(data) {
        console.log(data)
     }

    return (
        <div className="WebApp">
            <NavbarAdm />
            <ToolBar />
            {data?.length === 0 && stepe === "1" ? 
            <div className="aside">
                <div className="solicitation">
                <h2>Opa! Que bom te ver por aqui</h2>
                <h4>Deseja solicitar seu novo site?</h4>
                <img src={imageSite} alt="Imagem de um personagem editando um site com a mão" />

                <button className="btnSolicitation" onClick={() => handleSetStepe("2")}>Quero solicitar meu site</button>
                </div>
            </div>
            : data?.length === 0 && stepe === "2" ?
            <div className="aside">
            <div className="textHome">
            <h3>Site e Aplicativo</h3>
                {/* <a className="link" href="/novoimovel">Novo corretor</a> */}
                </div>
                        <br />
                <h4>Logo</h4>
                <h5>(Envie sua logo preferencialmente em PNG sem fundo)</h5>
                <label className="label-avatar">
                        <span><FiUpload color="#f65" size={25} /></span>
                        <input type="file" accept="image/*" onChange={handleFile} required/><br />
                        <img src={avatarUrl === null ? user.logo : avatarUrl} alt="Avatar" height={100} width={100}/>
                    </label>
                <div className="textHome">
                <h4>Informações importantes</h4>
                </div>            
            <div className="form">

                    <div className="data">
                    <div className="dataColor">
                    <span>Possui site?</span>
                    <select value={websiteAddress} onChange={handleWebsite}>
                        <option value="">Escolha</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataColor">
                    <span>Local de Hospedagem</span>
                    <select value={hosting} onChange={handleHosting}>
                        <option value="">Escolha</option>
                        <option value="LocalWeb">LocalWeb</option>
                        <option value="Hostgator">Hostgator</option>
                        <option value="Hostinguer">Hostinguer</option>
                        <option value="GoDaddy">GoDaddy</option>
                        <option value="HomeHost">HomeHost</option>
                        <option value="HostNet">HostNet</option>
                        <option value="Outro">Outro</option>
                    </select>
                    </div>
                    <div className="dataColor">
                    <span>Possui domínio?</span>
                    <select value={domain} onChange={handleDomain}>
                        <option value="" >Escolha</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataColor">
                    <span>Onde foi adquirido?</span>
                    <select value={companyDomain} onChange={handleCompanyDomain}>
                        <option value="">Escolha</option>
                        <option value="Registro BR">Registro BR</option>
                        <option value="LocalWeb">LocalWeb</option>
                        <option value="Hostgator">Hostgator</option>
                        <option value="Hostinguer">Hostinguer</option>
                        <option value="GoDaddy">GoDaddy</option>
                        <option value="HomeHost">HomeHost</option>
                        <option value="HostNet">HostNet</option>
                        <option value="Outro">Outro</option>
                    </select>
                    </div>
                    <div className="dataColor">
                    <span>Possui E-mail profissional</span>
                    <select value={emailProfessional} onChange={handleEmailProfessional}>
                        <option value="">Escolha</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não. Meu e-mail é Gmail, Outlook, Hotmail, Yahoo...</option>
                    </select>
                    </div>
                    </div>
                    </div>
                <div className="textHome">
                <h4>Dados do site</h4>
                </div>            
            <div className="form">

                    <div className="data">
                    <div className="dataColor">
                    <span>Domónio: Ex.: www.meusite.com.br</span>
                    <input type="text" placeholder="" value={websiteAddress} onChange={e => setWebsiteAddress(e.target.value)}/>
                    </div>
                    <div className="dataColor">
                    <span>Título</span>
                    <input type="text" placeholder="" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="dataColor">
                    <span>Descrição</span>
                    <input type="text" placeholder="" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="dataColor">
                    <span>Cor Principal</span>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)}/>
                    </div>
                    </div>
                    </div>

                    
                <div className="textHome">
                <h4>Nossa história</h4>
                </div>            
            <div className="form">
                    <div className="data">  
                    <textarea name="" id="" cols="30" rows="10" placeholder="Digite" value={history} onChange={e => setHistory(e.target.value)}></textarea>
                    </div>
                    </div>


                <div className="textHome">
                <h4>Missão</h4>
                </div>            
            <div className="form">
                    <div className="data">  
                    <textarea name="" id="" cols="30" rows="10" placeholder="Digite" value={mission} onChange={e => setMission(e.target.value)}></textarea>
                    </div>
                    </div>


                <div className="textHome">
                <h4>Visão</h4>
                </div>            
            <div className="form">
                    <div className="data">  
                    <textarea name="" id="" cols="30" rows="10" placeholder="Digite" value={vision} onChange={e => setVision(e.target.value)}></textarea>
                    </div>
                    </div>


                <div className="textHome">
                <h4>Valores</h4>
                </div>            
            <div className="form">
                    <div className="data">  
                    <textarea name="" id="" cols="30" rows="10" placeholder="Digite" value={values} onChange={e => setValues(e.target.value)}></textarea>
                    </div>
                    </div>

                    <div className="textHome">
                       <h4>Contato / Endereço / Redes Sociais</h4>
                    </div>  
                    <div className="form">
                        <div className="data">
                        <div className="dataColor">
                        <span> As informações de contato, endereço e redes sociais, são adicionadas e editadas na aba "Conta".</span>
                        </div>
                        </div>
                    </div>              
                 

                    <button className="btn" onClick={handleNewAccount}>Enviar solicitação</button>           

      
            </div>
             : data?.[0].status === "Pendente" ?
            <div className="aside">
                <div className="solicitation">
                <h2>Seu site está em desenvolvimento!</h2>
                <img src={Task} alt="Imagem de um personagem editando um site com a mão" />
                <h4>Que tal executar outras tarefas enquanto espera?</h4>

                <button className="btnSolicitation" onClick={() => handleSetStepe("2")}>Voltar para o painel</button>
                </div>
            </div>
            : ""
            }
            </div>

    )
}