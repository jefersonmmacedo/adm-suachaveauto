import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myAccountAdm.css";
import { useContext, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AuthContext } from "../../contexts/Auth";
import {toast} from 'react-toastify';
import { mask as masker, unMask } from "remask";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'react-slugify';
import { MiniMenu } from "../../components/MiniMenu/MiniMenu";

export function MyAccountAdm() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {loginAndUpdatePassword, updateAccountCompany} = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const profile = user.logo
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNewConfirm, setPasswordNewConfirm] = useState("");
    const [cpf_Cnpj, setCpf_Cnpj] = useState(user.cpf_Cnpj);
    const [creci, setCreci] = useState(user.creci);
    const [socialReason, setSocialReason] = useState(user.socialReason);
    const [fantasyName, setFantasyName] = useState(user.fantasyName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [whatsapp, setWhatsapp] = useState(user.whatsapp);
    const [responsibleName, setResponsibleName] = useState(user.responsibleName);
    const [emailResponsible, setEmailResponsible] = useState(user.emailResponsible);
    const [whatsappResponsible, setWhatsappResponsible] = useState(user.whatsappResponsible);
    const [instagram, setInstagram] = useState(user.instagram);
    const [facebook, setFacebook] = useState(user.facebook);
    const [linkedin, setLinkedin] = useState(user.linkedin);
    const [youtube, setYoutube] = useState(user.linkedin);
    const [cep, setCep] = useState(user.cep);
    const [number, setNumber] = useState(user.number);
    const [road, setRoad] = useState(user.road);
    const [district, setDistrict] = useState(user.district);
    const [city, setCity] = useState(user.city);
    const [uf, setUf] = useState(user.uf);
    const [website, setWebsite] = useState("");

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

     function handleNewPassword() {
        if(password === "" || passwordNew === "" || passwordNewConfirm === "") {
            toast.error("Preencha todos os campos"); 
            return;
        }
        if(passwordNew !== passwordNewConfirm) {
            toast.error("As senhas não coincidem"); 
            return;
        }
        loginAndUpdatePassword({email: user.email, password, passwordNew})
     }

     async function handleUpdateAccount(e) {
        e.preventDefault();
        toast.info("Criando conta. Aguarde...")

        if(imageAvatar === "" || imageAvatar === undefined || imageAvatar === null) {
            continueNewAccount(user.logo);
            return
        } 
                //Avatar
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatarCompany/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
        continueNewAccount(photoUrlAvatar)
      }

    function continueNewAccount(photoUrlAvatar) {
        updateAccountCompany({
          id: user.id, type: user.type, verifie: user.verifie, status:user.status, cpf_Cnpj,nameSlug: slugify(fantasyName), socialReason, fantasyName, creci, email, phone,
          whatsapp, responsibleName, emailResponsible, whatsappResponsible, logo: photoUrlAvatar, cep, road, number, district,
          city, uf, website, facebook, instagram, linkedin, youtube, date: user.date
        })
    }


     function ChangeMaskPhone(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setPhone(maskedValue)
      }
    function ChangeMaskWhatsapp(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp(maskedValue)
      }
    function ChangeMaskWhatsappResp(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsappResponsible(maskedValue)
      }
    function ChangeMaskCNPJ(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
            "999.999.999-99",
          "99.999.999/9999-99",
        ]);
    
        setCpf_Cnpj(maskedValue)
      }
    function ChangeMaskCReci(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
            "999-SS",
            "9999-SS",
          "99999-SS",
          "999999-SS",
          "9999999-SS",
        ]);
    
        setCreci(maskedValue)
      }

    return (
        <div className="MyAccountAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <MiniMenu />
            <div className="textHome">
            <h3>Minha conta</h3>
                </div>

            <div className="form">
          
                <label className="label-avatar">
                        <span><FiUpload color="#f65" size={25} /></span>
                        <input type="file" accept="image/*" onChange={handleFile} required/><br />
                        <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                    </label>
                <div className="textHome">
                <h4>Cadastro</h4>
                </div>            

                    <div className="data">  
                    <input type="text" placeholder="CNPJ" value={cpf_Cnpj} onChange={ChangeMaskCNPJ} disabled/>
                    <input type="text" placeholder="Razão Social" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} disabled/>
                    <input type="text" placeholder="Nome Fantasia" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)}/>
                    <input type="text" placeholder="CRECI" value={creci} onChange={(e) => setCreci(e.target.value)} disabled/>
                    </div>
                
                    <div className="textHome">
                       <h4>Contato</h4>
                    </div>              
                  
                    <div className="data">  
                    <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
                    <input type="text" placeholder="Telefone" value={phone} onChange={ChangeMaskPhone}/>
                    <input type="text" placeholder="Whatsapp" value={whatsapp} onChange={ChangeMaskWhatsapp}/>
                   
                    </div>
                         
                    <div className="textHome">
                       <h4>Redes Sociais</h4>
                    </div>              
                   
                    <div className="data">  
                    <input type="text" placeholder="Facebook" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                    <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
                    <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                    <input type="text" placeholder="Linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}/>
                    <input type="text" placeholder="Youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)}/>
                    </div>
                         

                    <div className="textHome">
                    <h4>Responsável</h4>
                    </div>          
                                
                    <div className="data"> 
                    <input type="text" placeholder="Nome Responsável" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} disabled/>
                    <input type="email" placeholder="E-mail" value={emailResponsible} onChange={(e) => setEmailResponsible(e.target.value)} disabled/>
                    <input type="text" placeholder="Whatsapp" value={whatsappResponsible} onChange={ChangeMaskWhatsappResp}/>
                    </div>
                       

                    <div className="textHome">
                    <h4>Endereço</h4>
                    </div>              
              
                    <div className="data">   
                    <input type="text" placeholder="Rua" value={cep} onChange={(e) => setCep(e.target.value)} />
                    <input type="text" placeholder="Rua" value={road} onChange={(e) => setRoad(e.target.value)} />
                    <input type="text" placeholder="Número" value={number} onChange={(e) => setNumber(e.target.value)} />
                    <input type="text" placeholder="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)}  />
                    <input type="text" placeholder="Bairro" value={city} onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="Bairro" value={uf} onChange={(e) => setUf(e.target.value)} />
                    </div>
                              

                    <button className={"buttonAccount"} onClick={handleUpdateAccount}>Atualizar Dados</button>
                    <div className="textHome">
                    <h4>Alterar Senha</h4>
                    </div>
 
                    <div className="data">               
                    <input type="password" placeholder="Senha Atual" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Nova senha" value={passwordNew} onChange={e => setPasswordNew(e.target.value)}/>
                    <input type="password" placeholder="Confirmar nova senha" value={passwordNewConfirm} onChange={e => setPasswordNewConfirm(e.target.value)}/>
                    </div>

                    <button className={password === "" || passwordNew === "" || passwordNewConfirm === "" ? "buttonAccountDisabled" : "buttonAccount"} onClick={handleNewPassword}>Atualizar Senha</button>
                </div>
      
            </div>
            </div>

    )
}