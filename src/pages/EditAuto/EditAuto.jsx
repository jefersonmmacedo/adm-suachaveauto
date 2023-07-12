import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { MyButtonComponent } from "../../components/UploadFiles/UploadFiles";
import "./editAuto.css";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { IoCarSport, IoCheckmarkOutline, IoSearchOutline, IoStar, IoStarOutline, IoTrash} from "react-icons/io5";
import { MdElectricCar } from "react-icons/md";
import { mask as masker, unMask } from "remask";
import {toast} from 'react-toastify';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import {NewLocador} from "../../components/NewLocador/NewLocador"
import UploadAWS from "../../components/UploadAWS/UploadAWS";
import { UploadImagesAWSModal } from "../../components/UploadImagesAWSModal/UploadImagesAWSModal";
import apiFipe from "../../services/apiFipe";
import { FaBusAlt, FaMotorcycle, FaTruckMoving } from "react-icons/fa";
import { HiTruck } from "react-icons/hi2";
import { useParams } from "react-router-dom";



export function EditAuto() {

    const {id} = useParams();
    
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {updateAuto, newFeature, newLicensing} = useContext(AuthContext);
    

    const [images, setImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState("");
    const [platformVideo, setPlatformVideo] = useState("");
    const [video, setVideo] = useState("");
    const [financing, setFinancing] = useState("");
    const [characteristcs, setCharacteristcs] = useState([]);
    const [licensingInfos, setLicensingInfos] = useState([]);
    const [allLicensings, setAllLicensings] = useState([]);
    const [licensing, setLicensing] = useState("");
    const [feature, setFeature] = useState("");
    const [emphasis, setEmphasis] = useState(false);
    const [phone, setPhone] = useState(user?.whatsapp);
    const [type, setType] = useState("");
    const [informations, setInfomations] = useState("");
    const [description, setDescription] = useState("");
    const [placa, setPlaca] = useState("");
    const [carsFipe, setCarsFipe] = useState([]);
    const [selectCar, setSelectCar] = useState("");
    const [chassi, setChassi] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [version, setVersion] = useState("");
    const [segment, setSegment] = useState("");
    const [subsegment, setSubsegment] = useState("");
    const [doors, setDoors] = useState("");
    const [gnv, setGnv] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [yearModel, setYearModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [bodywork, setBodywork] = useState("");
    const [march, setMarch] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [direction, setDirection] = useState("");
    const [fuel, setFuel] = useState("");
    const [endOfBoard, setEndOfBoard] = useState("");
    const [value, setValue] = useState("");
    const [valueFipe, setValueFipe] = useState("");
    const [state, setState] = useState("");
    const [cityCar, setCityCar] = useState("");
    const [ufCar, setUfCar] = useState("");
    const [horses, setHorses] = useState("");
    const [eletricCar, setEletricCar] = useState("");
    const [cityCompany, setCityCompany] = useState(user.city);
    const [ufCompany, setUfCompany] = useState(user.uf);
    
    
    

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();
    const [searchLicensing, setSearchLicensing] = useState("");
    const searchLicensingLower = searchLicensing.toLowerCase();



    useEffect(() => {
    async function loadAuto() {
        await api.get(`/autos/unicauto/${id}`).then((res) => {
            console.log(res.data[0]);

          setImages(res.data[0]?.images)
          setFeaturedImage(res.data[0]?.featuredImage)
          setPlatformVideo(res.data[0]?.platformVideo)
          setVideo(res.data[0]?.video)
          setFinancing(res.data[0]?.financing)
          setCharacteristcs(res.data[0]?.characteristcs)
          setLicensingInfos(res.data[0]?.licensingInfos)
          setLicensing(res.data[0]?.licensing)
          setFeature(res.data[0]?.feature)
          setEmphasis(res.data[0]?.emphasis)
          setType(res.data[0]?.type)
          setInfomations(res.data[0]?.informations)
          setDescription(res.data[0]?.description)
          setPlaca(res.data[0]?.plate)
          setCarsFipe(res.data[0]?.carsFipe)
          setSelectCar(res.data[0]?.selectCar)
          setChassi(res.data[0]?.chassi)
          setBrand(res.data[0]?.brand)
          setModel(res.data[0]?.model)
          setVersion(res.data[0]?.version)
          setSegment(res.data[0]?.segment)
          setSubsegment(res.data[0]?.subsegment)
          setDoors(res.data[0]?.doors)
          setColor(res.data[0]?.color)
          setYear(res.data[0]?.year)
          setYearModel(res.data[0]?.yearModel)
          setMileage(res.data[0]?.mileage)
          setBodywork(res.data[0]?.bodywork)
          setMarch(res.data[0]?.march)
          setEngineCapacity(res.data[0]?.engineCapacity)
          setDirection(res.data[0]?.direction)
          setFuel(res.data[0]?.fuel)
          setEndOfBoard(res.data[0]?.endOfBoard)
          setValue(res.data[0]?.value)
          setValueFipe(res.data[0]?.valueFipe)
          setState(res.data[0]?.state)
          setCityCar(res.data[0]?.city)
          setUfCar(res.data[0]?.uf)
          setHorses(res.data[0]?.horses)
          setEletricCar(res.data[0]?.eletricCar)
          setGnv(res.data[0]?.gnv)
          setCityCompany(res.data[0]?.cityCompany)
          setUfCompany(res.data[0]?.ufCompany)
          setPhone(res.data[0]?.phone)
        }).catch((error) => {
            console.log(error)
        })
    }

    loadAuto()
    }, [])
    


    async function handlePlacaFipe() {
        toast.info("Buscando dados do veículo...")
        const data = {
            "placa": placa
            }



        await apiFipe.post("/fipe", data).then((res) => {
            setCarsFipe(res.data);
            console.log(res.data);
            if(carsFipe.fipe?.length === 0) {
                handleSelecrCarNotFipe()
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    function handleSelecrCarNotFipe() {
        setSelectCar({versão: "", combustível: "", valorFipe: ""})
        setVersion("")
        setEndOfBoard(placa.slice(-1));
        setFuel(carsFipe.informacoes_veiculo.combustivel)
        setBrand(carsFipe.informacoes_veiculo.marca)
        setModel(carsFipe.informacoes_veiculo.modelo)
        setColor(carsFipe.informacoes_veiculo.cor)
        setYear(carsFipe.informacoes_veiculo.ano)
        setYearModel(carsFipe.informacoes_veiculo.ano_modelo)
        setChassi(carsFipe.informacoes_veiculo.chassi);
        setSegment(carsFipe.informacoes_veiculo.segmento);
        setSubsegment(carsFipe.informacoes_veiculo.segmento === "MOTO" ? carsFipe?.informacoes_veiculo.sub_segmento : carsFipe?.informacoes_veiculo.sub_segmento?.substring(5));
        setEngineCapacity(carsFipe.informacoes_veiculo.cilindradas);
        setCityCar(carsFipe.informacoes_veiculo.municipio);
        setUfCar(carsFipe.informacoes_veiculo.uf);
        console.log(placa)
        console.log(placa.slice(-1))
    }
    
    const { data } = useFetch(`/features`);

        useEffect(() => {
        async function loadLicensings() {
            await api.get(`/licensings`).then((res) => {
                setAllLicensings(res.data)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadLicensings()
    }, [])




    function uploadFiles2(data) {
        console.log(data)
        setImages(images.concat(data))
        if(images?.length === 0) {
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
    function handleNewLicensingInfos(dado) {
        console.log(dado)
        const findLicensing = licensingInfos.find(item => item.item === dado);
        if(findLicensing) {
            const filterLicensing = licensingInfos.filter((item) => item.item !== dado);
            setLicensingInfos(filterLicensing);
            return;
        } 
            const data = {id: uuidv4(), item: dado}
            setLicensingInfos([...licensingInfos, data])
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
    

function handleEditAuto() {
    updateAuto({
        id, idCompany: user.id, avatarCompany: user.logo, nameCompany: user.fantasyName, plate: placa, chassi, brand, model, version,
        segment, subsegment, doors, color, year, yearModel, mileage, march, engineCapacity, direction, fuel, endOfBoard, value, valueFipe,
        state, financing, city: cityCar, uf: ufCar, cityCompany: user.city, ufCompany: user.uf, characteristcs: feature, informations, description, horses, video,
         platformVideo, images, featuredImage, emphasis, characteristcs, licensingInfos, availability: "Disponível", type, bodywork, eletricCar, gnv, phone
    })
}

function handleSelecrCar(versão, combustível, valorFipe) {
    setSelectCar({versão, combustível, valorFipe})
    setVersion(versão)
    setFuel(combustível)
    ChangeMaskValue2(valorFipe)
    ChangeMaskValueFipe2(valorFipe)
    setEndOfBoard(placa.slice(-1));
    setBrand(carsFipe.informacoes_veiculo.marca)
    setModel(carsFipe.informacoes_veiculo.modelo)
    setDoors(versão.slice(-2))
    setColor(carsFipe.informacoes_veiculo.cor)
    setYear(carsFipe.informacoes_veiculo.ano)
    setYearModel(carsFipe.informacoes_veiculo.ano_modelo)
    setChassi(carsFipe.informacoes_veiculo.chassi);
    setSegment(carsFipe.informacoes_veiculo.segmento);
    setSubsegment(carsFipe.informacoes_veiculo.segmento === "MOTO" ? carsFipe.informacoes_veiculo.sub_segmento : carsFipe?.informacoes_veiculo.sub_segmento?.substring(5));
    setEngineCapacity(carsFipe.informacoes_veiculo.cilindradas);
    setCityCar(carsFipe.informacoes_veiculo.municipio);
    setUfCar(carsFipe.informacoes_veiculo.uf);
    setEletricCar(versão.includes("ELÉTRICO") || versão.includes("Elétrico") ? "Sim" : "");
    console.log(placa)
    console.log(placa.slice(-1))
}

function ChangeMaskValue2(data) {
    const originalValue = unMask(data);
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

    console.log(maskedValue)
    setValue(maskedValue)
  }
function ChangeMaskValueFipe2(data) {
    const originalValue = unMask(data);
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

    console.log(maskedValue)
    setValueFipe(maskedValue)
  }
function ChangeMaskValue(e) {
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

    console.log(maskedValue)
    setValue(maskedValue)
  }
function ChangeMaskValueFipe(e) {
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

    console.log(maskedValue)
    setValueFipe(maskedValue)
  }




const searchFilter = data?.filter((characteristcs) => characteristcs.feature.toLowerCase().includes(searchLower))
const searchLicensingFilter = allLicensings?.filter((licensingInfos) => licensingInfos.licensing.toLowerCase().includes(searchLicensingLower))


function handlePhone(e) {
    setPhone(e.target.value)
    console.log(e.target.value)
}

function handleSelectGng(e) {
    setGnv(e.target.value)
    console.log(e.target.value)
}
function handleSelectDoors(e) {
    setDoors(e.target.value)
    console.log(e.target.value)
}
function handleSelectDirection(e) {
    setDirection(e.target.value)
    console.log(e.target.value)
}
function handleSelectMarch(e) {
    setMarch(e.target.value)
    console.log(e.target.value)
}
function handleSelectState(e) {
    setState(e.target.value)
    console.log(e.target.value)
}
function handleSelectSetBodywork(e) {
    setBodywork(e.target.value)
    console.log(e.target.value)
}
function handleSelectMileage(e) {
    setMileage(e.target.value)
    console.log(e.target.value)
}
function handlePlatformVideo(e) {
    setPlatformVideo(e.target.value)
    console.log(e.target.value)
}
function handleEletricCar(e) {
    setEletricCar(e.target.value)
    console.log(e.target.value)
}
function handleSelectFinancing(e) {
    setFinancing(e.target.value)
    console.log(e.target.value)
}


function handleselectType(data) {
    setType(data)
}

function handleNewFeature() {
    if(feature === "") {
        return;
    }
    newFeature({feature})

    const data = {id: uuidv4(), item: feature?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())}
    setCharacteristcs([...characteristcs, data])

    setFeature("")
}

function handleNewLicensing() {

    if(licensing === "") {
        return;
    }
    newLicensing({licensing})

    const data = {id: uuidv4(), item: licensing?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())}
    setLicensingInfos([...licensingInfos, data])

    setLicensing("")
}



    
    return (
        <div className="EditAuto">
            <NavbarAdm />
            <ToolBar />
            <div className="
            aside">
            <div className="textHome">
            <h3>Novo auto</h3>
                </div>


                <div className="form">

                <div className="textHome2">
                     <h4>Tipo de veículo</h4>
                </div>

                    <div className="data">
                        <div className="buttonsAutos">
                        <button className={type === "Carros" ? "selectAuto" : ""} onClick={() => handleselectType("Carros")}> <IoCarSport /> Carros</button>
                        <button className={type === "Motos" ? "selectAuto" : ""} onClick={() => handleselectType("Motos")}> <FaMotorcycle /> Motos</button>
                        <button className={type === "Utilitários" ? "selectAuto" : ""} onClick={() => handleselectType("Utilitários")}> <HiTruck /> Utilitários </button>
                        <button className={type === "Caminhões" ? "selectAuto" : ""} onClick={() => handleselectType("Caminhões")}> <FaTruckMoving /> Caminhões </button>
                        <button className={type === "Ônibus" ? "selectAuto" : ""} onClick={() => handleselectType("Ônibus")}> <FaBusAlt /> Ônibus </button>
                        </div>
                    </div>

                    {type === "" ? "" 
                    :
                    <>
                    <div className="textHome2">
                        <h4>Buscar veículo</h4>
                    </div>
                
                        <div className="data">
                            <div className="dataInfo">
                            <span>Digite a placa e clique em buscar:</span>
                            <input type="text" className="inputPlaca" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)}/>
                            </div>
                            <div className="dataInfo">
                            <span>.</span>
                                <button className="btnData" onClick={handlePlacaFipe}><IoSearchOutline /></button>
                            </div>
                        </div>
                    </>
                    }



                {carsFipe?.length === 0 ? "" :
                <>
                <div className="textHome">
                      <h4>Escolha a opção que corresponde ao seu veículo</h4>
                </div>
                    <div className="data2">
                        {carsFipe?.fipe?.map((car) => {
                           return (
                            <div className={selectCar?.versão === car.modelo ? "carsSelect2" : "carsSelect"}
                            onClick={() => handleSelecrCar(
                                car.modelo,
                                car.combustivel.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()),
                                car.valor,
                                )}>
                            <h4>{carsFipe.informacoes_veiculo.marca} - {carsFipe.informacoes_veiculo.modelo}</h4>
                            <h5><b>{car.modelo}</b></h5>
                            <h5><b>Fabricação:</b> {carsFipe.informacoes_veiculo.ano} / Modelo:{carsFipe.informacoes_veiculo.ano_modelo}</h5>
                            <h5><b>Cor: </b>{carsFipe.informacoes_veiculo.cor}</h5>
                            <h5><b>Combustível:</b>{car.combustivel.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())}</h5>
                        </div>
                           )
                        })}
                    </div>
                </>
                }

            {selectCar === "" ? "" :
            <>
                <div className="textHome">
                    <h4>Detalhes do veículo</h4>
                </div>
                <div className="data">
                    <div className="dataInfo">
                    <span>Marca</span>
                    <input type="text" value={brand} onChange={e => setBrand(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Modelo</span>
                    <input type="text" value={model} onChange={e => setModel(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Versão</span>
                    <input type="text" value={version} onChange={e => setVersion(e.target.value)}/>
                    </div>

                    {segment === "MOTO" ? "" :
                    <div className="dataInfo">
                    <span>Carro Elétrico?</span>
                   <select value={eletricCar} onChange={handleEletricCar}>
                        <option value="">SelecioneSelecione</option>
                        <option value="Não">Não</option>
                        <option value="Sim">Sim</option>
                   </select>
                    </div>
                    }
                </div>
                <div className="data">
                    <div className="dataInfo">
                    <span>Cor</span>
                    <input type="text" value={color} onChange={e => setColor(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Ano/modelo</span>
                    <input type="text" value={`${year}/${yearModel}`} onChange={e => setYear(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Combustível</span>
                    <input type="text" value={fuel} onChange={e => setFuel(e.target.value)}/>
                    </div>
                    {segment === "MOTO" ? "" :
                    <div className="dataInfo">
                    <span>Posssui GNV?</span>
                    <select value={gnv} onChange={handleSelectGng} className={gnv === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                }
                </div>
                <div className="data">
                {segment === "MOTO" ? "" :
                    <div className="dataInfo">
                    <span>Portas</span>
                    <select value={doors} onChange={handleSelectDoors} className={doors === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="1P">1 Porta</option>
                        <option value="2P">2 Portas</option>
                        <option value="3P">3 Portas</option>
                        <option value="4P">4 Portas</option>
                        <option value="5P">5 Portas</option>
                        <option value="6P">6 Portas</option>
                        <option value="7P">7 Portas</option>
                    </select>
                    </div>
                }
                
                {segment === "MOTO" ? "" :
                    <div className="dataInfo">
                    <span>Direção</span>
                    <select value={direction} onChange={handleSelectDirection} className={direction === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="Mecânica">Mecânica</option>
                        <option value="Hidráulica">Hidráulica</option>
                        <option value="Elétrica">Elétrica</option>
                        <option value="Eletro-hidráulica">Eletro-hidráulica</option>
                    </select>
                    </div>
                }
                  {segment === "MOTO" ? "" :
                    <div className="dataInfo">
                    <span>Câmbio</span>
                    <select value={march} onChange={handleSelectMarch} className={march === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                        <option value="Automatizado">Automatizado</option>
                        <option value="CVT">CVT</option>
                    </select>
                    </div>
                    }
                    <div className="dataInfo">
                    <span>Estado</span>
                    <select value={state} onChange={handleSelectState} className={state === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="OKM">OKM</option>
                        <option value="Semi-Novo">Semi-Novo</option>
                        <option value="Usado">Usado</option>
                    </select>
                    </div>
                   
                </div>
                <div className="data">
                    <div className="dataInfo">
                    <span>Valor</span>
                    <input type="text" value={value} onChange={ChangeMaskValue}/>
                    </div>
                    <div className="dataInfo">
                    <span>Valor Fipe</span>
                    <input type="text" value={valueFipe} onChange={ChangeMaskValueFipe}/>
                    </div>
                    <div className="dataInfo">
                    <span>Fim de Placa</span>
                    <input type="text" value={endOfBoard} onChange={e => setEndOfBoard(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Chassi</span>
                    <input type="text" value={chassi} onChange={e => setChassi(e.target.value)}/>
                    </div>
                </div>
                <div className="data">
                    <div className="dataInfo">
                    <span>Carroceria/Estilo</span>
                    <select value={bodywork} onChange={handleSelectSetBodywork} className={bodywork === "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        {segment === "MOTO" ? 
                        <>
                        <option value="Scooters">Scooters</option>
                        <option value="Street">Street</option>
                        <option value="Trail">Trail</option>
                        <option value="Big Trail">Big Trail</option>
                        <option value="Custom">Custom</option>
                        <option value="Bobber">Bobber</option>
                        <option value="Chopper">Chopper</option>
                        <option value="Cafe Racers">Cafe Racers</option>
                        <option value="Scrambler">Scrambler</option>
                        <option value="Custom">Custom</option>
                        <option value="Sport">Sport</option>
                        <option value="Naked">Naked</option>
                        <option value="Roadster">Roadster</option>
                        <option value="Streetfighter">Streetfighter</option>
                        <option value="Touring">Touring</option>
                        <option value="Off-road">Off-road</option>
                        </>
                        :segment === "CAMINHÂO" ? 
                        <>
                        <option value="Caçamba">Caçamba</option>
                        <option value="Grade baixa">Grade baixa</option>
                        <option value="Graneleira">Graneleira</option>
                        <option value="Prancha">Prancha</option>
                        <option value="Plataforma">Plataforma</option>
                        <option value="Baú">Baú</option>
                        <option value="Baú frigorífico">Baú frigorífico</option>
                        <option value="Sider">Sider</option>
                        <option value="Basculante">Basculante</option>
                        <option value="Canavieira">Canavieira</option>
                        <option value="Florestal">Florestal</option>
                        <option value="Munck">Munck</option>
                        <option value="Boiadeira">Boiadeira</option>
                        <option value="Tanque">Tanque</option>
                        <option value="Container">Container</option>
                        <option value="Outros">Outros</option>
                        </>
                        :segment === "ONIBUS" ? 
                        <>
                        <option value="Convencional">Convencional</option>
                        <option value="Executivo">Executivo</option>
                        <option value="Semileito">Semileito</option>
                        <option value="Leito">Leito</option>
                        <option value="Cama">Cama</option>
                        <option value="Rodoviário">Rodoviário</option>
                        <option value="Intermunicipal">Intermunicipal</option>
                        <option value="Micro-ônibus">Micro-ônibus</option>
                        <option value="Micro-ônibus">Micro-ônibus</option>
                        <option value="Midiônibus">Midiônibus</option>
                        <option value="Ônibus básico">Ônibus básico</option>
                        <option value="Ônibus padron">Ônibus padron</option>
                        <option value="Ônibus articulado">Ônibus articulado</option>
                        <option value="Ônibus biarticulado">Ônibus biarticulado</option>
                        </>
                        
                        :segment === "COMERCIAL LEVE" || segment === "COMERCIAL PESADO" || segment === "COMERCIAL"? 
                        <>
                        <option value="Utilitário">Utilitário</option>
                        <option value="Utilitário leve">Utilitário leve</option>
                        <option value="Utilitário pesado">Utilitário pesado</option>
                        <option value="Utilitário de carga">Utilitário de carga</option>
                        <option value="Utilitário tradicional">Utilitário tradicional</option>
                        <option value="Utilitário esportivo">Utilitário esportivo</option>
                        </>
                        : segment === "AUTO" ?
                        <>
                        <option value="Aventureiro compacto">Aventureiro compacto</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Hatch subcompacto">Hatch subcompacto</option>
                        <option value="Hatch compacto">Hatch compacto</option>
                        <option value="Hatch médio">Hatch médio</option>
                        <option value="Sedã">Sedã</option>
                        <option value="Sedã compacto">Sedã compacto</option>
                        <option value="Sedã médio">Sedã médio</option>
                        <option value="Sedã grande">Sedã grande</option>
                        <option value="Familiar compacto">Familiar compacto</option>
                        <option value="Familiar médio">Familiar médio</option>
                        <option value="Familiar grande">Familiar grande</option>
                        <option value="Picape">Picape</option>
                        <option value="Picape compacta">Picape compacta</option>
                        <option value="Picape média">Picape média</option>
                        <option value="Picape grande">Picape grande</option>
                        <option value="Perua/Station-wagons(SW)">Perua/Station-wagons(SW)</option>
                        <option value="Coupé/cupê">Coupé/cupê</option>
                        <option value="Conversível">Conversível</option>
                        <option value="Limousine">Limousine</option>
                        <option value="SUV">SUV</option>
                        <option value="SUV compacto">SUV compacto</option>
                        <option value="SUV médio">SUV médio</option>
                        <option value="SUV grande">SUV grande</option>
                        <option value="Esportivo compacto">Esportivo compacto</option>
                        <option value="Esportivo médio">Esportivo médio</option>
                        <option value="Esportivo grande">Esportivo grande</option>
                        <option value="Conversível compacto">Conversível compacto</option>
                        <option value="Conversível médio">Conversível médio</option>
                        <option value="Conversível grande">Conversível grande</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Van média">Van média</option>
                        <option value="Van grande">Van grande</option>
                        <option value="Jipe">Jipe</option>
                        <option value="Furgão compacto">Furgão compacto</option>
                        <option value="Furgão médio">Furgão médio</option>
                        <option value="Caminhão urbano">Caminhão urbano</option>
                        </>
                        :
                        <>
                         <option value="Aventureiro compacto">Aventureiro compacto</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Hatch subcompacto">Hatch subcompacto</option>
                        <option value="Hatch compacto">Hatch compacto</option>
                        <option value="Hatch médio">Hatch médio</option>
                        <option value="Sedã">Sedã</option>
                        <option value="Sedã compacto">Sedã compacto</option>
                        <option value="Sedã médio">Sedã médio</option>
                        <option value="Sedã grande">Sedã grande</option>
                        <option value="Familiar compacto">Familiar compacto</option>
                        <option value="Familiar médio">Familiar médio</option>
                        <option value="Familiar grande">Familiar grande</option>
                        <option value="Picape">Picape</option>
                        <option value="Picape compacta">Picape compacta</option>
                        <option value="Picape média">Picape média</option>
                        <option value="Picape grande">Picape grande</option>
                        <option value="Perua/Station-wagons(SW)">Perua/Station-wagons(SW)</option>
                        <option value="Coupé/cupê">Coupé/cupê</option>
                        <option value="Conversível">Conversível</option>
                        <option value="Limousine">Limousine</option>
                        <option value="SUV">SUV</option>
                        <option value="SUV compacto">SUV compacto</option>
                        <option value="SUV médio">SUV médio</option>
                        <option value="SUV grande">SUV grande</option>
                        <option value="Esportivo compacto">Esportivo compacto</option>
                        <option value="Esportivo médio">Esportivo médio</option>
                        <option value="Esportivo grande">Esportivo grande</option>
                        <option value="Conversível compacto">Conversível compacto</option>
                        <option value="Conversível médio">Conversível médio</option>
                        <option value="Conversível grande">Conversível grande</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Van média">Van média</option>
                        <option value="Van grande">Van grande</option>
                        <option value="Jipe">Jipe</option>
                        <option value="Furgão compacto">Furgão compacto</option>
                        <option value="Furgão médio">Furgão médio</option>
                        <option value="Caminhão urbano">Caminhão urbano</option>

                        <option value="Convencional">Ônibus - Convencional</option>
                        <option value="Executivo">Ônibus - Executivo</option>
                        <option value="Semileito">Ônibus - Semileito</option>
                        <option value="Leito">Ônibus - Leito</option>
                        <option value="Cama">Ônibus - Cama</option>
                        <option value="Rodoviário">Ônibus - Rodoviário</option>
                        <option value="Intermunicipal">Ônibus - Intermunicipal</option>
                        <option value="Micro-ônibus">Ônibus - Micro-ônibus</option>
                        <option value="Micro-ônibus">Ônibus - Micro-ônibus</option>
                        <option value="Midiônibus">Ônibus - Midiônibus</option>
                        <option value="Ônibus básico">Ônibus - Básico</option>
                        <option value="Ônibus padron">Ônibus - Padron</option>
                        <option value="Ônibus articulado">Ônibus - Articulado</option>
                        <option value="Ônibus biarticulado">Ônibus - Biarticulado</option>

                        <option value="Caçamba">Caminhão - Caçamba</option>
                        <option value="Grade baixa">Caminhão - Grade baixa</option>
                        <option value="Graneleira">Caminhão - Graneleira</option>
                        <option value="Prancha">Caminhão - Prancha</option>
                        <option value="Plataforma">Caminhão - Plataforma</option>
                        <option value="Baú">Caminhão - Baú</option>
                        <option value="Baú frigorífico">Caminhão - Baú frigorífico</option>
                        <option value="Sider">Caminhão - Sider</option>
                        <option value="Basculante">Caminhão - Basculante</option>
                        <option value="Canavieira">Caminhão - Canavieira</option>
                        <option value="Florestal">Caminhão - Florestal</option>
                        <option value="Munck">Caminhão - Munck</option>
                        <option value="Boiadeira">Caminhão - Boiadeira</option>
                        <option value="Tanque">Caminhão - Tanque</option>
                        <option value="Container">Caminhão - Container</option>
                        <option value="Outros">Caminhão - Outros</option>
                        
                        <option value="Scooters">Moto - Scooters</option>
                        <option value="Street">Moto - Street</option>
                        <option value="Trail">Moto - Trail</option>
                        <option value="Big Trail">Moto - Big Trail</option>
                        <option value="Custom">Moto - Custom</option>
                        <option value="Esportiva">Moto - Esportiva</option>
                        <option value="Naked">Moto - Naked</option>
                        <option value="Touring">Moto - Touring</option>
                        <option value="Off-road">Moto - Off-road</option>
                        </>
                        
                    }
                        
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Quilometragem</span>
                    <input type="text" value={mileage} onChange={e => setMileage(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Cilindradas</span>
                    <input type="text" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Cavalos</span>
                    <input type="text" value={horses} onChange={e => setHorses(e.target.value)}/>
                    </div>
                </div>
                <div className="data">
                    <div className="dataInfo">
                    <span>Seguimento</span>
                    <input type="text" value={`${segment} - ${subsegment}`} onChange={e => setSegment(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Aceita financiamento?</span>
                    <select value={financing} onChange={handleSelectFinancing} className={financing=== "" ? "" : "select"}>
                        <option value="">Selecione</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    </div>
                    <div className="dataInfo">
                    <span>Cidade</span>
                    <input type="text" value={cityCar} onChange={e => setCityCar(e.target.value)}/>
                    </div>
                    <div className="dataInfo">
                    <span>Estado(UF)</span>
                    <input type="text" value={ufCar} onChange={e => setUfCar(e.target.value)}/>
                    </div>
                </div>


                <div className="dataInfo">
                    <span>Sobre o veículo</span>
                    </div>
                    <textarea cols="30" rows="10" className="" placeholder="" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                    


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

                        {characteristcs?.length === 0 ? "" :
                        <div className="characteristcs">
                            {characteristcs?.map((item) => {
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
            <h4>Documentação</h4>
                </div>
                  
                        <div className="CheckDock">

                        {/* <div className="newFeature">
                                <input type="text" placeholder="Busque pelo nome"  value={searchLicensing} onChange={e => setSearchLicensing(e.target.value)}/>
                            </div>   */}
                            <div className="features">
                                {searchLicensingFilter?.map((licensings) => {
                                    return (
                                        <button className='btnCheckDock' onClick={() => handleNewLicensingInfos(licensings.licensing)}>{licensings.licensing}</button>
                                    )
                                })}  
                            </div>

                        

               

                            <div className="newFeature">
                                <h5>Adicionar novo:</h5>
                                <input type="text" value={licensing} onChange={e => setLicensing(e.target.value)}/>
                                <button onClick={handleNewLicensing}>Adicionar</button>
                            </div>                 

                        {licensingInfos?.length === 0 ? "" :
                        <div className="documents">
                            {licensingInfos?.map((item) => {
                                return (
                                    <div className="itemDocument" key={item.id}>
                                        <h5 ><IoCheckmarkOutline/> {item.item}</h5>
                                        <button className="btnItem" onClick={() => handleNewLicensingInfos(item.item)}><IoTrash/></button>
                                    </div>
                                )
                            })}

                        </div>
                        }
                    </div>


                    <div className="textHome">
            <h4>Imagens</h4>
                </div>
                        {/* <UploadImagesAWSModal />
                    <UploadAWS onUpload={handleUpload}/>  */}
                     <MyButtonComponent id={id} uploadFiles2={uploadFiles2}/>

                       {images?.length === 0 ? "" : <span>Clique na estrela da imagem para definir a imagem principal</span>}
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
            <h4>Setor/Vendedor</h4>
                </div>
                <div className="data">
                    <select value={phone} onChange={handlePhone} className={video === "" ? "" : "select"}>
                        <option value="">Selecionar Setor/Vendedor</option>
                        <option value={user?.whatsapp}>{user?.textWhatsapp} - {user?.whatsapp}</option>
                       {user?.whatsapp2 ?
                       <option value={user?.whatsapp2}>{user?.textWhatsapp2} - {user?.whatsapp2}</option>
                       : ""}
                       {user?.whatsapp3 ?
                       <option value={user?.whatsapp3}>{user?.textWhatsapp3} - {user?.whatsapp3}</option>
                       : ""}
                       {user?.whatsapp4 ?
                       <option value={user?.whatsapp4}>{user?.textWhatsapp4} - {user?.whatsapp4}</option>
                       : ""}
                    </select>            
                    </div>


                       <div className="textHome">
            <h4>Vídeo</h4>
                </div>
                    
                    <div className="data">
                    <input type="text" className={video === "" ? "" : "select"} placeholder="Link do vídeo (Modelo e exemplo abaixo)" value={video} onChange={e => setVideo(e.target.value)}/>
                    </div>
                    <div className="data">
                        <div className="textData">
                        <h6>Modelo de link: https://www.youtube.com/embed/código | Ex.: https://www.youtube.com/embed/3UPvgq66BRE </h6>
                        </div>
                    </div>

                    <div className="textHome">
                      <h4>Informações relevantes (Essas informações não ficam disponíveis no anúncio.)</h4>
                    </div>
                    
                    <textarea cols="30" rows="10" className="" placeholder="Ex.: Itens de limpeza do jardim guardados no porão" value={informations} onChange={e => setInfomations(e.target.value)}></textarea>

                    <button className="btnSend" onClick={handleEditAuto}>Cadastrar anúncio</button>


                    </>
                }

                    




                    {/* <div className="textHome">
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


                    */}
                    </div>
            </div>
        </div>
    )
}

