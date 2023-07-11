import "./signUpProfessional.css";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";
import { FiUpload } from 'react-icons/fi';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import buscaDistrito from "../../services/api-buscaDistrito";
import { toast } from 'react-toastify';
import {IoEyeOutline, IoEyeOffOutline, IoSearchOutline} from 'react-icons/io5';
import { mask as masker, unMask } from "remask";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import buscaCNPJ from "../../services/api-buscaCNPJ";
import buscaCep from "../../services/api-buscaCep";
import { useParams } from "react-router-dom";
import slugify from 'react-slugify';

export function SignUpProfessional() {
  const {idComercialTeam} = useParams();
    const {createAccountCompany} = useContext(AuthContext);
    const [account, setAccount] = useState("Agência")
    const [data, setData] = useState("1");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const profile = "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?b=1&s=170667a&w=0&k=20&c=7WCqA9IZcIhn6UQbi6Kx1EtdnhEgVOOHwLi0rTMtbCo="

    const [passwordView, setPasswordView] = useState(false)
    const [aceptTerms, setAceptTerms] = useState(false)

    const [type, setType] = useState("Agência");
    const [selectDocument, setSelectDocument] = useState("CNPJ");
    const [creciValidate, setCreciValidate] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cnpj2, setCnpj2] = useState("");
    const [situation, setSituation] = useState("");
    const [socialReason, setSocialReason] = useState("");
    const [fantasyName, setFantasyName] = useState("");
    const [creci, setCreci] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [whatsapp2, setWhatsapp2] = useState("");
    const [whatsapp3, setWhatsapp3] = useState("");
    const [whatsapp4, setWhatsapp4] = useState("");
    const [textWhatsapp, setTextWhatsapp] = useState("Principal");
    const [textWhatsapp2, setTextWhatsapp2] = useState("");
    const [textWhatsapp3, setTextWhatsapp3] = useState("");
    const [textWhatsapp4, setTextWhatsapp4] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");

    const [responsibleName, setResponsibleName] = useState("");
    const [emailResponsible, setEmailResponsible] = useState("");
    const [whatsappResponsible, setWhatsappResponsible] = useState("");

    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("");
    const [road, setRoad] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [reference, setReference] = useState("");
    const [complement, setComplement] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [youtube, setYoutube] = useState("");
    const [facebook, setFacebook] = useState("");
    const [viewAddress, setViewAddress] = useState(true);

    const newSocialReason =  socialReason.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newFantasyName =  fantasyName.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newResponsibleName =  responsibleName.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCity =  city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newDistrict =  district.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newRoad =  road.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());


    console.log(cnpj.length)


    console.log(slugify(fantasyName))
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

    function handleSelectStepe(number) {
        setData(number)
    }
    function handleNex(e) {
      e.preventDefault();
        setData("3")
    }

    function handleSelectDocument(e) {
      setSelectDocument(e.target.value)
    }
    function handleViewAddress(e) {
      setViewAddress(e.target.value)
    }
    function handleSelectCreciValidate(e) {
      setCreciValidate(e.target.value)
    }
    function handleSelectAccount(e) {
        setAccount(e.target.value)
        setType(e.target.value)
    }




      async function handleNewAccount(e) {
        e.preventDefault();
        if(aceptTerms === false) {
          toast.error("Aceite os termos de uso.")
          return;
        }
        toast.info("Criando conta. Aguarde...")
                //Avatar
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatarCompany/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
        continueNewAccount(photoUrlAvatar)
      }

    function continueNewAccount(photoUrlAvatar) {
        createAccountCompany({
          type, verified: false, status: "Ativo", cpf_Cnpj: cnpj,nameSlug: slugify(fantasyName), socialReason: newSocialReason, fantasyName: newFantasyName, creci, email, phone,
          whatsapp, textWhatsapp, whatsapp2, textWhatsapp2, whatsapp3, textWhatsapp3, whatsapp4, textWhatsapp4,
          password, responsibleName: newResponsibleName, emailResponsible, whatsappResponsible, logo: photoUrlAvatar, cep, road: newRoad, number, district: newDistrict, reference, complement,
          city: newCity, uf: uf.toUpperCase(), website, facebook, instagram, linkedin, youtube, viewAddress, aceptTerms, idComercialTeam: idComercialTeam, typeDocument: selectDocument
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
    function ChangeMaskWhatsapp2(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp2(maskedValue)
      }
    function ChangeMaskWhatsapp3(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp3(maskedValue)
      }
    function ChangeMaskWhatsapp4(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp4(maskedValue)
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
      setCnpj2(e.target.value)
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
            "999.999.999-99",
          "99.999.999/9999-99",
        ]);
    
        setCnpj(maskedValue)
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

      function handlePasswordView() {
        if(passwordView === false) {
          setPasswordView(true)
        } else {
          setPasswordView(false)
        }
      }
      async function handleSearchCnpj(e) {
        e.preventDefault();
        const formatCNPJ1 = cnpj2.replace(".", "")
        const formatCNPJ2 = formatCNPJ1.replace(".", "")
        const formatCNPJ3 = formatCNPJ2.replace("/", "")
        const formatCNPJ4 = formatCNPJ3.replace("-", "")
        console.log(formatCNPJ4)
        try {
          const res = await buscaCNPJ.get(`${formatCNPJ4}`) 
            console.log(res.data.estabelecimento.situacao_cadastral);
            setSituation(res.data.estabelecimento.situacao_cadastral)
            return;
          }catch{
            console.log("error")
            toast.error("Erro ao buscar o CNPJ. Verifique e tente novamente")
        }
        return
      }

      async function handleSearchCep(e) {
        e.preventDefault();
        try {
          const res = await buscaCep.get(`${cep}/json`) 
            console.log(res.data);

            setRoad(res.data.logradouro);
            setDistrict(res.data.bairro);
            setCity(res.data.localidade);
            setUf(res.data.uf);
            return;
          }catch{
            console.log("error")
        }
        return
    }


      function handleRedirectAfterError(e) {
        e.preventDefault();
        window.open("https://www.suachave.com.br", "_self")
      }

      function handleSelectAceptTerms(e) {
        e.preventDefault();
        setAceptTerms(!aceptTerms);
      };



    return (
        <div className="SignUpProfessional">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <form action="">
                <img src={Logo} alt="Logo GPS Buscador" />
                        {
                          data === "1" ?
                    <div className="data">
                          <div className="dataInfo">
                          <h5>Tipo de conta</h5>
                        <select value={account} onChange={handleSelectAccount}>
                        <option value="Agência">Sou Agência</option>
                        <option value="Consultor">Sou Consultor</option>
                         </select>
                      
                           <select value={selectDocument} onChange={handleSelectDocument}>
                        <option value="CPF">Entrar com CPF</option>
                        <option value="CNPJ">Entrar com CNPJ</option>
                         </select>
                         {selectDocument === "CPF" ? 
                        <input type="text" placeholder="Digite o CPF" value={cnpj} onChange={ChangeMaskCNPJ} />
                        :
                        <input type="text" placeholder="Digite o CNPJ" value={cnpj} onChange={ChangeMaskCNPJ} />
                         }

                          {situation === ""  || selectDocument === "CPF" ? ""
                            : situation === "Inapta" || situation === "Baixada" || situation === "Irregular" || situation === "Extinto" || situation === "Cancelado"  ?
                             <div className="situationCnpj2">
                             <h4>Ops! Encontramos um problema com o CNPJ.</h4>
                             <h3>Situação: {situation}</h3>
                             <h5>Verifique e tente novamente em outro momento!</h5>
                             <div className="buttons">
                             <button className="btn1" onClick={handleRedirectAfterError}>Sair</button>
                             </div>
                           </div>
                            : situation === "Ativa" || situation === "Regular" ?
                            <div className="situationCnpj">
                              <h4>Parabéns</h4>
                              <h3>CNPJ Validado!</h3>
                              <div className="buttons">
                              <button className="btn4" onClick={handleNex}>Avançar</button>
                              </div>
                            </div>
                            : ""
                            }
                          </div>


                         <div className="buttons">
                         {selectDocument === "CPF" ? 
                         cnpj.length === 14 ?
                        <button className="btn" onClick={handleNex}>Avançar</button>
                        : ""
                        :
                        <button className="btn" onClick={handleSearchCnpj}>Verificar</button>
                         }
                         </div>

      
                       
                         </div>
                        :data === "3" ?
                        <div className="data">
                            <div className="dataInfo">
                           <h5>Dados da conta</h5>
                            {selectDocument === "CNPJ" ?
                        <>
                        <input type="text" placeholder="Razão Social" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                        <input type="text" placeholder="Nome Fantasia" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
                        </>
                        : 
                        <>
                        <input type="text" placeholder="Nome Completo" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                        <input type="text" placeholder="Nome Profissional" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
                        </>

                        }
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="dataInputs">
                        <input type={passwordView === false ? "password" : "text"}  placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="icon" onClick={handlePasswordView}>{passwordView === false ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                        </div>
                        </div>
                        <div className="dataInputs">
                        <input type={passwordView === false ? "password" : "text"} placeholder="Confirmar senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <div className="icon"onClick={handlePasswordView}>{passwordView === false ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                            </div>
                        </div>

                        { password !== passwordConfirm && password !== "" && passwordConfirm !== "" ?
                        <h6>As senhas não coincidem</h6>
                        : ""
                        }
                            </div>
                        <div className="buttons">
                        {socialReason !== "" && fantasyName !== "" && email !== ""  
                        && password !== "" && passwordConfirm !== "" && password === passwordConfirm? 
                        <button className="btn" onClick={() => handleSelectStepe("4")}>Avançar</button>
                         : ""                        
                          }
                        <button className="btn3" onClick={() => handleSelectStepe("1")}>Voltar</button>
                        </div>
                       
                        </div>
                        : data === "4" ?
                        <div className="data">
                          <div className="dataInfo">
                          <h5>Dados do responsável</h5>
                         <input type="text" placeholder="Nome Responsável" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} />
                        <input type="email" placeholder="E-mail" value={emailResponsible} onChange={(e) => setEmailResponsible(e.target.value)} />
                        <input type="text" placeholder="Whatsapp" value={whatsappResponsible} onChange={ChangeMaskWhatsappResp} />
                          <br />
                          <h5>Telefones</h5>
                        <input type="text" placeholder="Telefone" value={phone} onChange={ChangeMaskPhone} />
                        <br />
                        <div className="inputNumber">
                        <input type="text" placeholder="Whatsapp" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        <input type="text" placeholder="Prinipal" value={textWhatsapp} onChange={(e) => setTextWhatsapp(e.target.value)} />
                        </div>
                        <div className="inputNumber">
                        <input type="text" placeholder="Whatsapp2" value={whatsapp2} onChange={ChangeMaskWhatsapp2} />
                        <input type="text" placeholder="Setor ou Vendedor" value={textWhatsapp2} onChange={(e) => setTextWhatsapp2(e.target.value)} />
                        </div>
                        <div className="inputNumber">
                        <input type="text" placeholder="Whatsapp3" value={whatsapp3} onChange={ChangeMaskWhatsapp3} />
                        <input type="text" placeholder="Setor ou Vendedor" value={textWhatsapp3} onChange={(e) => setTextWhatsapp3(e.target.value)} />
                        </div>
                        <div className="inputNumber">
                        <input type="text" placeholder="Whatsapp4" value={whatsapp4} onChange={ChangeMaskWhatsapp4} />
                        <input type="text" placeholder="Setor ou Vendedor" value={textWhatsapp4} onChange={(e) => setTextWhatsapp4(e.target.value)} />
                        </div>
                        {/* <h5>Seu site e redes sociais</h5>
                        <input type="text" placeholder="Site" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                        <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                        <input type="text" placeholder="Linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                        <input type="text" placeholder="Youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} /> */}
                          </div>

                        <div className="buttons">
                        {responsibleName !== "" && emailResponsible !== "" && whatsappResponsible !== ""  ? 
                        <button className="btn" onClick={() => handleSelectStepe("6")}>Avançar</button>
                         : ""                        
                          }
                        <button className="btn3" onClick={() => handleSelectStepe("3")}>Voltar</button>
                        </div>

                       
                        </div>
                        // : data === "5" ?
                        // <div className="data">
                        //     <div className="dataInfo">
                        //     <h5>Telefones</h5>
                        // <input type="text" placeholder="Telefone" value={phone} onChange={ChangeMaskPhone} />
                        // <br />
                        // <div className="inputNumber">
                        // <input type="text" placeholder="Whatsapp" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // <input type="text" placeholder="Prinipal" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // </div>
                        // <div className="inputNumber">
                        // <input type="text" placeholder="Whatsapp2" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // <input type="text" placeholder="Setor ou Vendedor" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // </div>
                        // <div className="inputNumber">
                        // <input type="text" placeholder="Whatsapp3" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // <input type="text" placeholder="Setor ou Vendedor" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // </div>
                        // <div className="inputNumber">
                        // <input type="text" placeholder="Whatsapp4" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // <input type="text" placeholder="Setor ou Vendedor" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        // </div>
                        //   </div>
                        // <div className="buttons">
                        // <button className="btn" onClick={() => handleSelectStepe("6")}>Avançar</button>
                        // <button className="btn3" onClick={() => handleSelectStepe("4")}>Voltar</button>
                        // </div>
                      
                        // </div>
                        : data === "6" ?
                        <div className="data">
                          <div className="dataInfo">
                          <h5>Sua Logo</h5>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>
                        
                        <div className="BuscaCep">
                        <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)}  />
                        <button onClick={handleSearchCep}><IoSearchOutline /></button>
                        </div>
                        <h5>Busque o CEP antes de preencher os dados</h5>
                         <input type="text" placeholder="Rua" value={road} onChange={(e) => setRoad(e.target.value)}  />
                         <div className="infoAdress">
                         <input type="text" placeholder="Número" value={number} onChange={(e) => setNumber(e.target.value)}  />
                         <input type="text" placeholder="Complemento" value={complement} onChange={(e) => setComplement(e.target.value)}  />
                         </div>
                        <input type="text" placeholder="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)}  /> 

                        {city !== "" && uf !== "" ?
                        <>
                        <input type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)}  />
                        <div className="infoAdress">
                        <input type="text" placeholder="Estado(UF)" value={uf} onChange={(e) => setUf(e.target.value)}  />
                        <input type="text" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)}  />
                        </div>
                        </>
                        : ""
                        } 
                        {account === "Consultor" ?
                        <select value={viewAddress} onChange={handleViewAddress}>
                          <option value={true}>Deixar meu endereço visível</option>
                          <option value={false}>Não deixar meu endereço visível</option>
                        </select>
                         : ""
                        }

                        <div className="check">
                          <input type="checkbox" value={aceptTerms} onChange={handleSelectAceptTerms}/>
                          <h5>Aceito os <a href="https://www.suachave.com.br/termos" target="_blank">termos de uso</a> e <a href="https://www.suachave.com.br/privacidade" target="_blank">politica de privacidade</a></h5>
                        </div>
                          </div>



                        <div className="buttons">
                         {avatarUrl !== null && road !== "" && number !== "" && district !== ""  && city !== "" && uf !== "" && district !== "" && aceptTerms === true? 
                        <button className="btn5" onClick={handleNewAccount}>Cadastrar</button>
                         : ""                        
                          }
                        <button className="btn3" onClick={() => handleSelectStepe("4")}>Voltar</button>
                        </div>

                       
                         </div>
                         :""}

                  
                </form>

            </div>
        </div>
    )
}