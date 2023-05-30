import "./viewPropertyChat.css"
import { useState } from "react";
import { IoBedOutline, IoCarSportOutline, IoHome, IoHomeOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import { TbBath, TbBone, TbSofa } from "react-icons/tb";
import { useFetch } from "../../hooks/useFetch";

export function ViewPropertyChat({id, mobile}) {

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
        }

        const {data} = useFetch(`/property/${id}`)

        if(!data) {
            return (
                <h5>Carregando...</h5>
            )
        }


const valuesRent =[
    // {
    // id: "rent",
    // value: data[0].priceRent === "" ? parseFloat(data[0].priceSale) * plusSale : parseFloat(data[0].priceRent) * plusRent
    // },
    {
    id: "condominium",
    value: data[0].condominium === "" ? " 0" : data[0].condominium
    },
    {
    id: "iptu",
    value: data[0].iptu === "" ? " 0" : data[0].iptu
    },
    {
    id: "otherPrices",
    value: data[0].otherPrices === "" ? " 0" : data[0].otherPrices
    }
]

const payments = valuesRent?.reduce(function (acumulador, objetoAtual){
    return acumulador + parseFloat(objetoAtual.value);
  }, 0);

  var ResultBRL = payments.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})


    return (
        <div className="ViewPropertyChat">
            {mobile === true ? 
  <button className="btnProperty2" onClick={handleFiltro}><IoHome/> Ver Imóvel</button>
            : mobile === false ? 
            <button className="btnProperty" onClick={handleFiltro}><IoHome/> Ver Imóvel</button>
            : mobile === "List" ?
            <button className="btnProperty3" onClick={handleFiltro}><IoHome/> Ver Imóvel</button>
            :
  <button className="btnProperty" onClick={handleFiltro}><IoHome/> Ver Imóvel</button>
            }
        <div className={filter === true ? "searchItensFilter" : "searchItensFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="searchOptionsFilter">
        <div className="form">
                <div className="imageClient">
                    <img src={data[0]?.featuredImage} alt="Imagem avatar do cliente" />
                </div>
                  <h3>{data[0]?.title}</h3>
                  <h5>ID: {id}</h5>
                  <h5><IoHomeOutline/>{data[0]?.status} - {data[0]?.type} - {data[0]?.subType}</h5>
                  <h6><IoLocationOutline />{data[0]?.city} - {data[0]?.uf}</h6>


                  <div className="iconsBox">
                    {data[0]?.bedroom === "" || data[0]?.bedroom === "0"? "" :
                        <div className="iconUnicBox">
                                <IoBedOutline />
                            <div className="simbolBox">
                                <p>{data[0]?.bedroom} {data[0]?.bedroom < 2 ? " Quarto" : " Quartos"}</p>
                            </div>
                        </div>
                        }
                        {data[0]?.restroom === "" || data[0]?.restroom === "0"? "" :
                        <div className="iconUnicBox">
                                <MdOutlineShower />
                            <div className="simbolBox">
                                <p>{data[0]?.restroom} {data[0]?.restroom < 2 ? " Banheiro" : " Banheiros"}</p>
                            </div>
                        </div>
                        }
                        {data[0]?.suite === "" || data[0]?.suite === "0" ? "" :
                        <div className="iconUnicBox">
                                <TbBath />
                            <div className="simbolBox">
                                <p>{data[0]?.suite} Suítes</p>
                            </div>
                        </div>
                        }
                         {data[0]?.garage === "" || data[0]?.garage === "0" ? "" :
                        <div className="iconUnicBox">
                                <IoCarSportOutline />
                            <div className="simbolBox">
                                <p>{data[0]?.garage} {data[0]?.garage < 2 ? " Vaga" : " Vagas"}</p>
                            </div>
                        </div>
                        }
                        {data[0]?.pets === "Não" || data[0]?.pets === "" ? "" :
                        <div className="iconUnicBox">
                                <TbBone />
                            <div className="simbolBox">
                            <p>Aceita pets</p>
                            </div>
                        </div>
                        }
                         {data[0]?.furnished === "Não" || data[0]?.furnished === "" ? "" :
                        <div className="iconUnicBox">
                                <TbSofa />
                            <div className="simbolBox">
                                <p>Mobilhado</p>
                            </div>
                        </div>
                        }



                    </div>


                    <div className="infosCompany">
                {data[0].status === "Aluguel" ?
                    <>
                     {data[0].priceRent === "" ? "" :
                    <div className="pricing">
                        <h5>{data[0].status} / <span> {data[0].textRent}</span></h5>
                        <h2>R$ <span>{data[0].priceRent}</span></h2>
                    </div>
                    }
                    {data[0].condominium === "" || data[0].condominium === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Condomínio</h5>
                        <h5>R$ {data[0].condominium}</h5>
                    </div>
                        }
                     {data[0].iptu === "" || data[0].iptu === "0,00" ? "" :
                    <div className="otherPrincings">
                        <h5>IPTU</h5>
                        <h5>R$ {data[0].iptu}</h5>
                    </div>
                     }
                     {data[0].otherPrices === "" || data[0].otherPrices === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Outros encargos</h5>
                        <h5>R$ {data[0].otherPrices}</h5>
                    </div>
                     }
                      {ResultBRL === "" ? "" :
                    <div className="pricingTotal">
                        <h4>Total encargos</h4>
                         <h4>{ResultBRL}</h4>
                     </div>
                    }
                     {data[0].priceSale === "" ? "" :
                     <div className="pricing">
                         <h5>Venda</h5>
                         <h2>R$ <span>{data[0].priceSale}</span></h2>
                     </div>
                     }
                    </>
                    :
                    <>
                    {data[0].priceSale === "" ? "" :
                    <div className="pricing">
                        <h5>Venda</h5>
                        <h2>R$ <span>{data[0].priceSale}</span></h2>
                    </div>
                    }
                   {data[0].condominium === "" || data[0].condominium === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>Condomínio</h5>
                       <h5>R$ {data[0].condominium}</h5>
                   </div>
                       }
                    {data[0].iptu === "" || data[0].iptu === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>IPTU</h5>
                       <h5>R$ {data[0].iptu}</h5>
                   </div>
                    }
                    {data[0].otherPrices === "" || data[0].otherPrices === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>Outros encargos</h5>
                       <h5>R$ {data[0].otherPrices}</h5>
                   </div>
                    }
                     {ResultBRL === "" ? "" :
                   <div className="pricingTotal">
                       <h4>Total encargos</h4>
                        <h4>{ResultBRL}</h4>
                    </div>
                   }
                  
                   </>
                    }
                </div>

                
            </div>
        </div>
    </div>
        </div>
    )
}