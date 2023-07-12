import "./viewAutoList.css"
import { useState } from "react";
import { IoBedOutline, IoHeart, IoCalendarOutline, IoCarSportOutline, IoEyeOutline, IoHome, IoHomeOutline, IoLocationOutline, IoColorFillOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import { TbBath, TbBone, TbGasStation, TbRoad, TbSofa } from "react-icons/tb";
import { useFetch } from "../../hooks/useFetch";
import ReactTooltip from 'react-tooltip';
import {FaMotorcycle, FaRoad} from 'react-icons/fa';
import {GiCarDoor, GiGearStickPattern, GiRoad, GiSteeringWheel} from 'react-icons/gi';


export function ViewAutoList({id}) {
    console.log(id)

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
        }

        const {data} = useFetch(`/autos/unicauto/${id}`)

        if(!data) {
            return (
                <button className="btnControl" data-tip data-for='Ver Imóvel'><IoEyeOutline /></button>
            )
        }

        if(data) {
            console.log(data);
        }


const valuesRent =[
    // {
    // id: "rent",
    // value: data[0]?.priceRent === "" ? parseFloat(data[0]?.priceSale) * plusSale : parseFloat(data[0]?.priceRent) * plusRent
    // },
    {
    id: "condominium",
    value: data[0]?.condominium === "" ? " 0" : data[0]?.condominium
    },
    {
    id: "iptu",
    value: data[0]?.iptu === "" ? " 0" : data[0]?.iptu
    },
    {
    id: "otherPrices",
    value: data[0]?.otherPrices === "" ? " 0" : data[0]?.otherPrices
    }
]

const payments = valuesRent?.reduce(function (acumulador, objetoAtual){
    return acumulador + parseFloat(objetoAtual.value);
  }, 0);

  var ResultBRL = payments.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})


    return (
        <div className="ViewAutoList">
            <button className="btnControl" onClick={handleFiltro} data-tip data-for='Ver Imóvel'><IoEyeOutline /></button>

        <div className={filter === true ? "searchItensFilter" : "searchItensFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="searchOptionsFilter">
        <div className="form">
                <div className="imageClient">
                    <img src={data[0]?.featuredImage} alt="Imagem avatar do cliente" />
                </div>
                  <h3>{data[0]?.brand} - {data[0]?.model}</h3>
                  <h4>{data[0]?.version}</h4>
                  <h5>Placa: {data[0]?.plate} - Ano/Modelo {data[0]?.year}/{data[0]?.yearModel}</h5>
                  <h5>{data[0]?.type === "Carros" ? <IoCarSportOutline/> : <FaMotorcycle/>}Tipo de Veículo: {data[0]?.type} - Carroceria/Estilo: {data[0]?.bodywork}</h5>


                  <div className="iconsBox">

{data[0]?.year === "" && data[0]?.yearModel === ""? "" :
    <div className="iconUnicBox">
            <IoCalendarOutline />
        <div className="simbolBox">
        <p>{data[0]?.year}/{data[0]?.yearModel}</p>
        </div>
    </div>
}
{data[0]?.mileage === "" ? "" :
    <div className="iconUnicBox">
            <TbRoad />
        <div className="simbolBox">
        <p>{data[0]?.mileage} Km</p>
        </div>
    </div>
}
{data[0]?.fuel === "" ? "" :
    <div className="iconUnicBox">
            <TbGasStation />
        <div className="simbolBox">
        <p>{data[0]?.fuel}</p>
        </div>
    </div>
}
{data[0]?.march === "" ? "" :
    <div className="iconUnicBox">
            <GiGearStickPattern />
        <div className="simbolBox">
        <p>{data[0]?.march}</p>
        </div>
    </div>
}
{data[0]?.type === "Motos" ? "":
    <div className="iconUnicBox">
            <GiCarDoor />
        <div className="simbolBox">
        <p>{data[0]?.doors}</p>
        </div>
    </div>
}
{data[0]?.color === "" ? "" :
    <div className="iconUnicBox">
            <IoColorFillOutline />
        <div className="simbolBox">
        <p>{data[0]?.color}</p>
        </div>
    </div>
}

{data[0]?.type === "Motos" ? "":
    <div className="iconUnicBox">
            <GiSteeringWheel />
        <div className="simbolBox">
        <p>{data[0]?.direction}</p>
        </div>
    </div>
}
{data[0]?.type === "" ? "" :
    <div className="iconUnicBox">
            {data[0]?.type === "Motos" ?
                                <FaMotorcycle />
                                :
                                <IoCarSportOutline />
                                }
        <div className="simbolBox">
        <p>{data[0]?.type}</p>
        </div>
    </div>
}

</div>
<div className="pricing">
    <h6>{data[0]?.city} - {data[0]?.uf}</h6>
    <h4>R$ <span>{data[0]?.value}</span></h4>
</div>
                
            </div>
        </div>
    </div>
        </div>
    )
}