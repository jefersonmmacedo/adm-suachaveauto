import "./plains.css"
import {IoArrowBack, IoArrowForwardOutline, IoCheckmarkOutline} from "react-icons/io5";
import { useState } from "react";
import api from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export function Plains() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [plains, setPlains] = useState([]);
    const [myPlain, setMyPlain] = useState([]);





    useEffect(() => {
        async function plainsLoad() {
            await api.get("/plains").then((res) => {
                setPlains(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }

        plainsLoad()
        async function mYPlainsLoad() {
            await api.get(`/myplain/${user?.id}`).then((res) => {
                setMyPlain(res.data[0]);
            }).catch((error) => {
                console.log(error)
            })
        }

        mYPlainsLoad()
    },[])


    if(plains.length === 0) {
        return (
            <div className="loader">
           carregando...
            </div>
        )
    }


    const buttonStyle = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'var(--Primary)',
        color: 'var(--White)',
        borderRadius: '100px',
        padding: '7px',
        width: '35px',
        height: '35px',
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><IoArrowBack /></button>,
        nextArrow: <button style={{ ...buttonStyle }}><IoArrowForwardOutline /></button>
    }

    const responsiveSettings = [
        {
            breakpoint: 1210,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 930,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 250,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    const plainsFilter = plains.filter((plain) => plain.status !== "Inativo" )

    return (
        <div className="Plains">
            <Slide slidesToScroll={2} slidesToShow={2} indicators={true} {...properties} autoplay={false} responsive={responsiveSettings}>
            {plainsFilter?.map((plain) => {
                return (
                    <div className={plain?.name === "Lite" ? "plain2" : "plain"} key={plain?.id}>
  
                    <h3>{plain?.name}</h3>
                    {plain?.valueNew === "" ?
                    <>
                        <div className="title">
                        <h1>R$ {plain?.value}</h1>
                        <h4>/mês</h4>
                        </div>
                    </>
                    :
                    <>
                        <div className="title2">
                        <h1>R$ {plain?.value}</h1>
                        <h6>/mês</h6>
                        </div>
                        <div className="title">
                        <h1>R$ {plain?.valueNew}</h1>
                        <h4>/mês</h4>
                        </div>
                    </>

                    }
                    {/* <div className="title">
                    <h3>Entre em contato</h3>
                    </div> */}
                    <div className="text">
                    {plain?.infos.map((info) => {
                        return (
                            <p><IoCheckmarkOutline /> {info.info}</p>
                        )
                    })}
                    </div>
                    {myPlain?.idPlain === plain?.id ?
                    <a href="#" target="_blank">Seu plano atual</a>
                    :
                    <a href={`/plano/${plain?.id}`}>Contratar plano</a>
                }

                    <p>{plain?.note}</p>
                    {plain?.name === "Lite" ? 
                        <div className="featured">
                            <h5>Mais Procurado</h5>
                        </div>
                         : ""}
                </div>
                )
            })}
            </Slide>

        </div>
    )
}