import "./home.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { TopHeadHome } from "../../components/TopHeadHome/TopHeadHome";
import {  PropertyCarroussel } from "../../components/PropertyCarroussel/PropertyCarroussel";
import { ExploreIconsProperties } from "../../components/ExploreIconsProperties/ExploreIconsProperties";
import { ProcessProperty } from "../../components/ProcessProperty/ProcessProperty";
import { BlockHome } from "../../components/BlockHome/BlockHome";
import styled from 'styled-components';
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";

export function Home() {
    const [company, setCompany] = useState();

    useEffect(() => {
        async function loadUser() {
            await api.get(`/company/unic/${process.env.REACT_APP_CODEUSER}`).then((res) => {
              setCompany(res.data[0]);
              console.log(res.data)
            }).catch((err) => {
              console.log(err);
            })
        }
    
        loadUser()
      }, [])

      const Div = styled.div`
        width: 100%;

     .textHome {
        margin: 40px auto 0 auto;
        width: 1080px;
        text-align: left;
    }
     .textFeature {
        width: 1080px;
        text-align: left;
        margin: 40px auto 0 auto;
    }
     .textHome h3 {
        margin: 20px 40px;
        font-weight: 700;
        color: var(--Gray);
    }
     .textFeature h3 {
        margin: 20px 40px;
        font-weight: 700;
        color: var(--Gray);
    }
     .carroussel {
        width: 1080px;
        margin: 0px auto;
    }
    
     .searchViewButton {
        display: none;
    }
    
    
     .iconsHomeProperties {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 100px;
        margin-bottom: 60px;
        flex-wrap: wrap;
    }
     .iconsHomeProperties .unic {
        display: flex;
        flex-direction: row;
        align-items:  flex-start;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 20px;
        margin: 5px;
        background-color: rgba(99,99,99, 0.5);
        color: var(--White);
        cursor: pointer;
    }
    
     .iconsHomeProperties .unic svg {
        margin-right: 5px;
    }
     .iconsHomeProperties .unic:hover {
        background-color: rgba(237,50,55, 0.9);
    }
    
    
    .content-modal-home {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 8px;
        background-color: #BB0000;
    }
    .content-modal-home-Search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 8px;
        background-color: var(--BorderInput2);
    }
    .content-modal-home .itensModalHome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        overflow:auto; 
        max-height: 500px;
        margin: 20px 10px;
    }
    .content-modal-home-Search .itensModalHome-Search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        overflow:auto; 
        max-height: 500px;
        margin: 20px 10px;
    }
    
    .content-modal-home .itensModalHome img {
        width: 150px;
        margin: 20px;
    }
    .content-modal-home .itensModalHome h2 {
        font-weight: 700;
        color: var(--White);
        margin: 10px
    }
    
    .content-modal-home .itensModalHome form {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 20px 0;
    }
    
    .content-modal-home .itensModalHome  form select {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 10px 20px;
        background: var(--Background);
        border-radius: 6px;
    }
    
    
    .content-modal-home .itensModalHome form .dataButtons {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center; 
    }
    .content-modal-home .itensModalHome form .dataButtons button {
        width: 150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background-color: var(--White);
        color: var(--Primary);
        margin: 5px;
        font-weight: 700;
    }
    
    .content-modal-home .itensModalHome form h3 {
        font-weight: 700;
        color: var(--White);
        margin-top: 10px;
    }
    
    .content-modal-home .itensModalHome form select {
        margin: 5px;
        font-weight: 700;
    }
    
    .content-modal-home .itensModalHome form button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background-color: var(--White);
        color: var(--Primary);
        margin: 10px;
        font-weight: 700;
    }
    .content-modal-home .itensModalHome .loginAccount {
        width: 400px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-top: 1px solid var(--BorderHover);
        margin: 20px 0;
        padding: 10px;
        flex-wrap: wrap;
    }
    
    .content-modal-home .itensModalHome .loginAccount a {
        width: 150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background-color: var(--White);
        color: var(--Primary);
        margin: 5px;
        font-weight: 700;
        text-decoration: none;
        font-size: 14px;
    }
    
    @media (max-width: 1085px) {
         .carroussel {
            width: 95%;
            margin: 0px auto;
        }
    
         .textFeature {
            width: 100%;
        }
    
         .textHome {
            width: 100%;
        }
        @media (max-width: 970px) {
             .carroussel {
                width: 100%;
                margin: 0px auto;
            }
    
    
    
            @media (max-width: 750px) {
                 .textFeature {
                    width: 90%;
                    text-align: center;
                }
    
                 .textHome {
                    width:80%;
                    text-align: center;
                }
                 .searchView {
                    display: none;
                }
                 .searchViewButton {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    margin-top: -25px;
                    z-index: 2;
                    position: absolute;
                }
    
                 .searchViewButton button {
                    border: 3px solid var(--White);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    padding: 15px 20px;
                    Background-color: var(--Primary);
                    color: var(--White);
                    font-weight: 700;
                    border-radius: 6px;
                    width: 70%;
                    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
                }
    
                 .searchViewButton button svg {
                    margin-right: 5px;
                    font-size: 16px;
                }
    
                 .iconsHomeProperties {
                    margin-top: 80px;
                }
    
                @media (max-width: 555px) {
                     .textFeature {
                        width: 80%;
                        text-align: center;
                    }
    
                     .textHome {
                        width: 80%;
                        text-align: center;
                    }
                    .content-modal-home .itensModalHome form {
                        width: 85%;
                    }
    
                    .content-modal-home .itensModalHome .loginAccount {
                        width: 85%;
                        margin: 20px 0 0 0;
                    }
    
                    @media (max-width: 400px) {
    
                        .content-modal-home .itensModalHome {
                            padding: 10px;
                        }
                        .content-modal-home .itensModalHome form {
                            width: 95%;
                        }
    
                        .content-modal-home .itensModalHome .loginAccount {
                            width: 95%;
                            margin: 20px 0 0 0;
                        }
                        
                    }
             
                }
         
            }
     
        }
        
    }
  
  `
    return (
        <Div >
            <Navbar2 />
            <TopHeadHome />
            <ProcessProperty />
            <div className="textFeature">
            <h3>Imóveis à venda</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Venda"}/>
            </div>

                <BlockHome />

            <div className="textHome">
            <h3>Imóveis para alugar</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Aluguel"}/>
            </div>
            <ExploreIconsProperties />
            <Footer />

        </Div>
    )
}