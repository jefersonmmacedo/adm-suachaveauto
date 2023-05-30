import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./newProperty.css";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { IoCheckmarkOutline, IoSearchOutline, IoStar, IoStarOutline, IoTrash} from "react-icons/io5";
import { mask as masker, unMask } from "remask";
import buscaCep from "../../services/api-buscaCep";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import {NewLocador} from "../../components/NewLocador/NewLocador"
import UploadAWS from "../../components/UploadAWS/UploadAWS";
import { UploadImagesAWSModal } from "../../components/UploadImagesAWSModal/UploadImagesAWSModal";


export function NewProperty() {
    
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {newProperty, newFeature} = useContext(AuthContext);
    

    const [title, setTitle] = useState("");
    const [number, setNumber] = useState("");
    const [cep, setCep] = useState("");
    const [road, setRoad] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [complement, setComplement] = useState("")
    const [reference, setReference] = useState("")
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");
    const [status, setStatus] = useState("");
    const [availability, setAvailability] = useState("Disponível");
    const [bedroom, setBedroom] = useState("0");
    const [garage, setGarage] = useState("0");
    const [suite, setSuite] = useState("0");
    const [restroom, setRestroom] = useState("0");
    const [priceSale, setPriceSale] = useState("");
    const [priceRent, setPriceRent] = useState("");
    const [textRent, setTextRent] = useState("Mensal");
    const [condominium, setCondominium] = useState("");
    const [iptu, setIptu] = useState("");
    const [otherPrices, setOtherPrices] = useState("");
    const [buildingArea, setBuildingArea] = useState("");
    const [siglaBuildingArea, setSiglaBuildingAreat] = useState("M2");
    const [totalArea, setTotalArea] = useState("");
    const [siglaTotalArea, setSiglaTotalArea] = useState("M2");
    const [yearOfConstruction, setYearOfConstruction] = useState("");
    const [images, setImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState("");
    const [platformVideo, setPlatformVideo] = useState("");
    const [video, setVideo] = useState("");
    const [slider, setSlider] = useState("");
    const [financing, setFinancing] = useState("");
    const [characteristcs, setCharacteristcs] = useState([]);
    const [furnished, setFurnished] = useState("");
    const [pets, setPets] = useState("");
    const [newProperties, setNewProperties] = useState("");
    const [firstLease, setFirstLease] = useState("");
    const [feature, setFeature] = useState("");
    const [emphasis, setEmphasis] = useState(false);
    const [locators, setLocators] = useState([]);
    const [selectLocator, setSelectLocator] = useState("");
    const [plains, setPlains] = useState("");
    const [codeIptu, setCodeIptu] = useState("");
    const [codeEnergy, setCodeEnergy] = useState("");
    const [codeWater, setCodeWater] = useState("");
    const [informations, setInfomations] = useState("");
    
    
    
    

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();



    const newTitle =  title.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newCity =  city.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newDistrict =  district.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    const newRoad =  road.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    


 

    useEffect(() => {
        async function loadLocators() {
            await api.get(`/locator/company/${user.id}`).then((res) => {
                setLocators(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadLocators()
    })

    useEffect(() => {
        async function loadPaymet() {
            await api.get(`/myplain/${user.id}`).then((res) => {
                setPlains(res.data[0]);
            }).catch((err) => {
                console.error(err);
            });
        }

        loadPaymet()
    },[])


    const { data } = useFetch(`/features`);

    const idv4 = uuidv4();
    const idProperty = idv4.substring(0,8);

    function uploadFiles2(data) {
        console.log(data)
        setImages(images.concat(data))
        if(images.length === 0) {
            setFeaturedImage(data[0].link)
        }
    }

    function handleFeaturedImage(data) {
        setFeaturedImage(data)
    }

    function handleNewCharacteristcs(dado) {
        console.log(dado)
        const findCharacteristc = characteristcs.find(item => item.item === dado);
        if(findCharacteristc) {
            const filterCharacteristc = characteristcs.filter((item) => item.item !== dado);
            setCharacteristcs(filterCharacteristc);
            return;
        } 
            const data = {id: uuidv4(), item: dado}
            setCharacteristcs([...characteristcs, data])
    }

    function handleDeleteImage(dado) {
        const findImages = images.find(item => item.link === dado);
        if(findImages) {
        const filterImages = images.filter((item) => item.link !== dado);
        setImages(filterImages);

        if(dado === images[0].link) {
            setFeaturedImage(images[0].link);
            return;
        }
        return;
        } 
    }
    

function handleNewProperty() {
    newProperty({
        id:idProperty, idCompany: user.id,avatarCompany: user.logo, nameCompany: user.fantasyName, title: newTitle, number, cep: cep, road: newRoad, district: newDistrict, city: newCity, uf: uf.toUpperCase(), complement, reference, description, type, subType, status,
    availability, bedroom, garage, suite, restroom, priceSale, priceRent, textRent, condominium, pets, furnished, newProperty: newProperties, firstLease,
    iptu, otherPrices, buildingArea, siglaBuildingArea, totalArea, siglaTotalArea, yearOfConstruction,
    images, featuredImage, platformVideo, video, slider, financing, characteristcs, emphasis, idLocator: selectLocator,
    codeIptu, codeEnergy, codeWater, informations,
    })
}

async function handleNewCep(e) {
    e.preventDefault();
    console.log("");
        await buscaCep(`${cep}/json`).then((res) => {
            console.log(res.data);
            setRoad(res.data.logradouro);
            setDistrict(res.data.bairro);
            setCity(res.data.localidade);
            setUf(res.data.uf);
        })

}



const searchFilter = data?.filter((characteristcs) => characteristcs.feature.toLowerCase().includes(searchLower))


function handleEmphasis(e) {
    setEmphasis(e.target.value)
    console.log(e.target.value)
}
function handleSelectLocator(e) {
    setSelectLocator(e.target.value)
    console.log(e.target.value)
}
function handleType(e) {
    setType(e.target.value)
    console.log(e.target.value)
}
function handleSubType(e) {
    setSubType(e.target.value)
    console.log(e.target.value)
}
function handleStatus(e) {
    setStatus(e.target.value)
    console.log(e.target.value)
}
function handleAvailability(e) {
    setAvailability(e.target.value)
    console.log(e.target.value)
}
function handleBedroom(e) {
    setBedroom(e.target.value)
    console.log(e.target.value)
}
function handleRestroom(e) {
    setRestroom(e.target.value)
    console.log(e.target.value)
}
function handleSuite(e) {
    setSuite(e.target.value)
    console.log(e.target.value)
}
function handleGarage(e) {
    setGarage(e.target.value)
    console.log(e.target.value)
}
function handlePets(e) {
    setPets(e.target.value)
    console.log(e.target.value)
}
function handleFurnished(e) {
    setFurnished(e.target.value)
    console.log(e.target.value)
}
function handleNewProperties(e) {
    setNewProperties(e.target.value)
    console.log(e.target.value)
}
function handleFirstLease(e) {
    setFirstLease(e.target.value)
    console.log(e.target.value)
}
function handleTextRent(e) {
    setTextRent(e.target.value)
    console.log(e.target.value)
}
function handleSiglaBuildingArea(e) {
    setSiglaBuildingAreat(e.target.value)
    console.log(e.target.value)
}
function handleSiglaTotalArea(e) {
    setSiglaTotalArea(e.target.value)
    console.log(e.target.value)
}
function handlePlatformVideo(e) {
    setPlatformVideo(e.target.value)
    console.log(e.target.value)
}
function handleSlider(e) {
    setSlider(e.target.value)
    console.log(e.target.value)
}
function handleFinancing(e) {
    setFinancing(e.target.value)
    console.log(e.target.value)
}


function handleNewFeature() {
    if(feature === "") {
        return;
    }
    newFeature({feature})

    const data = {id: uuidv4(), item: feature.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())}
    setCharacteristcs([...characteristcs, data])

    setFeature("")
}

function ChangeMaskValueRent(e) {
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

    setPriceRent(maskedValue)
  }
function ChangeMaskValueSale(e) {
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

    setPriceSale(maskedValue)
  }
function ChangeMaskValueCondominium(e) {
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

    setCondominium(maskedValue)
  }
function ChangeMaskValueOtherPricing(e) {
    const originalValue = unMask(e.target.value);
    console.log(unMask(e.target.value))
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

    setOtherPrices(maskedValue)
  }
function ChangeMaskValueIptu(e) {
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

    setIptu(maskedValue)
  }


  //Upload de images AWS

//   state = {
//     uploadedFiles: []
//   };

  function handleUpload (files) {
    console.log(files)
    // const uploadedFiles = files.map(file => ({
    //   file,
    //   id: uniqueId(),
    //   name: file.name,
    //   readableSize: filesize(file.size),
    //   preview: URL.createObjectURL(file),
    //   progress: 0,
    //   uploaded: false,
    //   error: false,
    //   url: null
    // }));

    // this.setState({
    //     uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    //   });
  
    //   uploadedFiles.forEach(this.processUpload);
    };

    
    return (
        <div className="NewProperty">
            <NavbarAdm />
            <ToolBar />
            <div className="
            aside">
            <div className="textHome">
            <h3>Novo imóvel</h3>
                </div>


                <div className="form">
                <div className="textHome2">
                      <h4>Proprietário</h4>
                </div>
                    {locators.length === 0 ?
                        <span>Você não possui locadores cadastrados</span>
                    :
                <select value={selectLocator} onChange={handleSelectLocator} className="">
                <option value="">Escolha o locador</option>
                        {locators?.map((locator) => {
                            return (
                                <>
                                 <option key={locator.id} value={locator.id}>{locator.name} ({locator.fantasyName}) - {locator.city} - {locator.uf}</option>
                                </>
                            )
                        })}
                    </select>
                    }
                    

            <div className="textHome">
            <h4>Dados do imóvel</h4>
                </div>
               
                <div className="dataInfo">
                    <span>Título</span>
                    <input type="text" className="" placeholder="" value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Descrição</span>
                    </div>
                    <textarea cols="30" rows="10" className="" placeholder="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    {/* <input type="text" placeholder="Endereço"/> */}
                   
                    <div className="data">
                    <div className="dataInfo">
                    <span>Tipo</span>
                    <select value={type} onChange={handleType} className={type === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Rural">Rural</option>
                        <option value="Terrenos e Lotes">Terrenos e Lotes</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Subtipo</span>
                    <select value={subType} onChange={handleSubType} className={subType === "" ? "" : "select"}>
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
                    <div className="dataInfo">
                    <span>Venda/Aluguel</span>
                    <select value={status} onChange={handleStatus} className={status === "" ? "" : "select"}>
                        <option value="">Aluguel/Venda</option>
                        <option value="Aluguel">Alugel</option>
                        <option value="Venda">Venda</option>
                        <option value="Aluguel e Venda">Aluguel e Venda</option>
                        <option value="Temporada">Temporada</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Disponibilidade</span>
                    <select value={availability} onChange={handleAvailability} className={availability === "" ? "" : "select"}>
                        <option value="Disponível">Disponível</option>
                        <option value="Indisponível">Indisponível</option>
                        <option value="Vendido">Vendido</option>
                        <option value="Alugado">Alugado</option>
                    </select>
                    </div>
                    </div>
                    <div className="data">
                    <div className="dataInfo">
                    <span>Quartos</span>
                    <select value={bedroom} onChange={handleBedroom} className={bedroom === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="1">1 Quarto</option>
                        <option value="2">2 Quartos</option>
                        <option value="3">3 Quartos</option>
                        <option value="4">4 Quartos</option>
                        <option value="5">5 Quartos</option>
                        <option value="6">6 Quartos</option>
                        <option value="7">7 Quartos</option>
                        <option value="8">8 Quartos</option>
                        <option value="9">9 Quartos</option>
                        <option value="10">10 Quartos</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Suítes</span>
                    <select value={suite} onChange={handleSuite} className={suite === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="1">1 Suíte</option>
                        <option value="2">2 Suítes</option>
                        <option value="3">3 Suítes</option>
                        <option value="4">4 Suítes</option>
                        <option value="5">5 Suítes</option>
                        <option value="6">6 Suítes</option>
                        <option value="7">7 Suítes</option>
                        <option value="8">8 Suítes</option>
                        <option value="9">9 Suítes</option>
                        <option value="10">10 Suítes</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Banheiros</span>
                    <select value={restroom} onChange={handleRestroom} className={restroom === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="1">1 Banheiro</option>
                        <option value="2">2 Banheiros</option>
                        <option value="3">3 Banheiros</option>
                        <option value="4">4 Banheiros</option>
                        <option value="5">5 Banheiros</option>
                        <option value="6">6 Banheiros</option>
                        <option value="7">7 Banheiros</option>
                        <option value="8">8 Banheiros</option>
                        <option value="9">9 Banheiros</option>
                        <option value="10">10 Banheiros</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Garagem</span>
                    <select value={garage} onChange={handleGarage} className={garage === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="1">1 Vaga de garagem</option>
                        <option value="2">2 Vagas de garagem</option>
                        <option value="3">3 Vagas de garagem</option>
                        <option value="4">4 Vagas de garagem</option>
                        <option value="5">5 Vagas de garagem</option>
                        <option value="6">6 Vagas de garagem</option>
                        <option value="7">7 Vagas de garagem</option>
                        <option value="8">8 Vagas de garagem</option>
                        <option value="9">9 Vagas de garagem</option>
                        <option value="10">10 Vagas de garagem</option>
                    </select>
                    </div>
                    
                    </div>
                    <div className="data">
                    <div className="dataInfo">
                    <span>Aceita pets?</span>
                    <select value={pets} onChange={handlePets} className={pets === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Mobilhado?</span>
                    <select value={furnished} onChange={handleFurnished} className={furnished === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Imóvel novo?</span>
                    <select value={newProperties} onChange={handleNewProperties} className={newProperties === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Primeira locação?</span>
                    <select value={firstLease} onChange={handleFirstLease} className={firstLease === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    </div>
                    <div className="data">
                    <div className="dataInfo">
                    <span>Preço Venda</span>
                    <input type="text" className={priceSale === "" ? "" : "select"} placeholder="" value={priceSale} onChange={ChangeMaskValueSale}/>
                    </div>
                    <div className="dataInfo">
                    <span>Preço Aluguel</span>
                    <input type="text" className={priceRent === "" ? "" : "select"} placeholder="" value={priceRent} onChange={ChangeMaskValueRent}/>
                    </div>
                    <div className="dataInfo">
                    <span>Período aluguel</span>
                    <select value={textRent} onChange={handleTextRent} className={textRent === "" ? "" : "select"}>
                        <option value="Mensal">Mensal</option>
                        <option value="Diário">Diário</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Anual">Anual</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Aceita financiamento?</span>
                    <select value={financing} onChange={handleFinancing} className={financing === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="Sim">Aceita financiamento</option>
                        <option value="Não">Não aceita financiamento</option>
                    </select>
                    </div>
                    </div>
                    <div className="data">
                    <div className="dataInfo">
                    <span>Condomínio (Valor R$)</span>
                    <input type="text" className={condominium === "" ? "" : "select"} placeholder="" value={condominium} onChange={ChangeMaskValueCondominium}/>
                    </div>
                    <div className="dataInfo">
                    <span>IPTU (Valor R$)</span>
                    <input type="text" className={iptu === "" ? "" : "select"} placeholder="" value={iptu} onChange={ChangeMaskValueIptu}/>
                    </div>
                    <div className="dataInfo">
                    <span>Outros encargos (Valor R$)</span>
                    <input type="text" className={otherPrices === "" ? "" : "select"} placeholder="" value={otherPrices} onChange={ChangeMaskValueOtherPricing}/>
                    </div>
                    <div className="dataInfo">
                    <span>Ano de contrução</span>
                    <input type="text" className={yearOfConstruction === "" ? "" : "select"} placeholder="" value={yearOfConstruction} onChange={e => setYearOfConstruction(e.target.value)}/>
                    </div>
                    </div>
                    <div className="data">
                    <div className="dataInfo">
                    <span>Área total</span>
                    <input type="text" className={totalArea === "" ? "" : "select"} placeholder="" value={totalArea} onChange={e => setTotalArea(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Sigla</span>
                    <select value={siglaTotalArea} onChange={handleSiglaTotalArea} className={siglaTotalArea === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="M2">M2</option>
                        <option value="Km">Km</option>
                        <option value="Eq">Eq</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Área de contrução</span>
                    <input type="text" className={buildingArea === "" ? "" : "select"} placeholder="" value={buildingArea} onChange={e => setBuildingArea(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Sigla</span>
                    <select value={siglaBuildingArea} onChange={handleSiglaBuildingArea} className={siglaBuildingArea === "" ? "" : "select"}>
                        <option value=""></option>
                        <option value="M2">M2</option>
                        <option value="Km">Km</option>
                        <option value="Eq">Eq</option>
                    </select>
                    </div>
                    </div>

                   

            <div className="textHome">
            <h4>Dados de endereço</h4>
                </div>
               
                    <div className="data">
                    <div className="dataInfo">
                    <span>Digite o CEP e clique em buscar:</span>
                    <input type="text" placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>.</span>
                        <button className="btnData" onClick={handleNewCep}><IoSearchOutline /></button>
                    </div>
                    
                    <div className="dataInfo">
                    <span>Rua</span>
                    <input type="text" className={road === "" ? "" : "select"} placeholder="" value={road} onChange={e => setRoad(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Número</span>
                    <input type="text" className={number === "" ? "" : "select"} placeholder="" value={number} onChange={e => setNumber(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Complemento</span>
                    <input type="text" className={complement === "" ? "" : "select"} placeholder="" value={complement} onChange={e => setComplement(e.target.value)}/>
                    </div>
 
                    </div>
                    <div className="data">
                    {city === "" && uf === "" ? "" :
                    <>
                    <div className="dataInfo">
                    <span>Bairro</span>
                    <input type="text" className={district === "" ? "" : "select"} placeholder="" value={district} onChange={e => setDistrict(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Cidade</span>
                    <input type="text" className={city === "" ? "" : "select"} placeholder="" value={city} onChange={e => setCity(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Estado(UF)</span>
                    <input type="text" className={uf === "" ? "" : "select"} placeholder="" value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Referência</span>
                    <input type="text" className={reference === "" ? "" : "select"} placeholder="" value={reference} onChange={e => setReference(e.target.value)}/>
                    </div>
                    </>}
                    </div>
                    


            <div className="textHome">
            <h4>Características</h4>
                </div>
                  
                        <div className="Check">

                        <div className="newFeature">
                                <input type="text" placeholder="Busque pelo nome"  value={search} onChange={e => setSearch(e.target.value)}/>
                            </div>  
                            <div className="features">
                                {searchFilter?.map((features) => {
                                    return (
                                        <button className='btnCheck' onClick={() => handleNewCharacteristcs(features.feature)}>{features.feature}</button>
                                    )
                                })}  
                            </div>

                        

               

                            <div className="newFeature">
                                <h5>Adicionar novo:</h5>
                                <input type="text" value={feature} onChange={e => setFeature(e.target.value)}/>
                                <button onClick={handleNewFeature}>Adicionar</button>
                            </div>                 

                        {characteristcs.length === 0 ? "" :
                        <div className="characteristcs">
                            {characteristcs.map((item) => {
                                return (
                                    <div className="itemCharacteristc" key={item.id}>
                                        <h5 ><IoCheckmarkOutline/> {item.item}</h5>
                                        <button className="btnItem" onClick={() => handleNewCharacteristcs(item.item)}><IoTrash/></button>
                                    </div>
                                )
                            })}

                        </div>
                        }
                    </div>
                    

                    <div className="textHome">
            <h4>Imagens</h4>
                </div>
                        <UploadImagesAWSModal />
                    {/* <UploadAWS onUpload={handleUpload}/> */}
                       {/* <MyButtonComponent id={idProperty} uploadFiles2={uploadFiles2}/> */}

                       {images.length === 0 ? "" : <span>Clique na estrela da imagem para definir a imagem principal</span>}
                       <div className="myImages">
                        {images?.map((files) => {
                            return (
                        <div className={files.link === featuredImage ? "imageUnicFeatured" : "imageUnic"} key={files.id}>
                        <img src={files.link} alt="" />
                        <button className="btnImage" onClick={() => handleDeleteImage(files.link)}><IoTrash/></button> 
                        <button className="featuredImage" onClick={() => handleFeaturedImage(files.link)}>{files.link === featuredImage ? <IoStar/> : <IoStarOutline/>  }</button>
                        </div> 
                            )
                        })}
                       </div>
                    

                    <div className="textHome">
            <h4>Vídeo</h4>
                </div>
                    
                    <div className="data">
                    <select value={platformVideo} onChange={handlePlatformVideo} className={video === "" ? "" : "select"}>
                        <option value="">Plataforma</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Vímeo">Vímeo</option>
                    </select>
                    <input type="text" className={video === "" ? "" : "select"} placeholder="Link do vídeo (Modelo e exemplo abaixo)" value={video} onChange={e => setVideo(e.target.value)}/>
                    </div>
                    <div className="data">
                        <div className="textData">
                        <h6>Modelo de link: https://www.youtube.com/embed/código | Ex.: https://www.youtube.com/embed/3UPvgq66BRE </h6>
                        </div>
                    </div>


                    <div className="textHome">
            <h4>Mais informações</h4>
                </div>

                    <div className="data">
                    <div className="dataInfo">
                    <span>Medidor relógio (Energia)</span>
                    <input type="text" className={codeIptu === "" ? "" : "select"} placeholder="" value={codeIptu} onChange={e => setCodeIptu(e.target.value)}/>
                    </div>

                    <div className="dataInfo">
                    <span>Matrícula conta de água</span>
                    <input type="text" className={codeEnergy === "" ? "" : "select"} placeholder="" value={codeEnergy} onChange={e => setCodeEnergy(e.target.value)}/>
                    </div>

                    <div className="dataInfo">
                    <span>Nº Inscrição IPTU (Código Municipal do Imóvel)</span>
                    <input type="text" className={codeWater === "" ? "" : "select"} placeholder="" value={codeWater} onChange={e => setCodeWater(e.target.value)}/>
                    </div>

                    </div>
                    <div className="dataInfo">
                    <span>Informações relevantes</span>
                    </div>
                    <textarea cols="30" rows="10" className="" placeholder="Ex.: Itens de limpeza do jardim guardados no porão" value={informations} onChange={e => setInfomations(e.target.value)}></textarea>

                    <button className="btnSend" onClick={handleNewProperty}>Cadastrar anúncio</button>
                    </div>
            </div>
        </div>
    )
}

