import "./home3.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { TopHeadHome } from "../../components/TopHeadHome/TopHeadHome";
import {  PropertyCarroussel } from "../../components/PropertyCarroussel/PropertyCarroussel";
import { ExploreIconsProperties } from "../../components/ExploreIconsProperties/ExploreIconsProperties";
import { ProcessProperty } from "../../components/ProcessProperty/ProcessProperty";
import { BlockHome } from "../../components/BlockHome/BlockHome";
import { SliderHome } from "../../components/SliderHome/SliderHome";
import { SearchProperty } from "../../components/SearchProperty/SearchProperty";
import Modal from 'react-modal';
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { useState } from "react";

export function Home3() {
    const [isOpenModalSearchProperty, setIsOpenModaSearchProperty] = useState(false);
const [filter, setFilter] = useState(false)

    function handleOpenModalSearchProperty(e) {
    e.preventDefault();
    console.log("Olá")
        setIsOpenModaSearchProperty(true)
    }

  function handleCloseModalSearchProperty(e) {
    e.preventDefault();
    setIsOpenModaSearchProperty(false);
  }

  function handleFilterHome() {
    setFilter(!filter)
  }

    return (
        <div className="Home3">
            <Navbar2 />
            <SliderHome />
            <div className="searchView">
            <SearchProperty handleFilterhome={handleFilterHome} openModal={handleOpenModalSearchProperty}/>
            </div>
            <div className="searchViewButton">
            <button onClick={handleOpenModalSearchProperty}><IoSearch/>Buscar Imóveis</button>
            </div>
            <div className={filter === true ? "filterOn" : "filterOff"}>
            </div>
            <ProcessProperty />
            <div className="textFeature">
            <h3>Imóveis à venda</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Venda"}/>
            </div>

                <BlockHome />

            <div className="textHome3">
            <h3>Imóveis para alugar</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Aluguel"}/>
            </div>
            <ExploreIconsProperties />
            <Footer />

            
            <Modal isOpen={isOpenModalSearchProperty} onRequestClose={handleCloseModalSearchProperty}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearchProperty}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-home-Search">
            <div className="itensModalHome-Search">
                <SearchProperty />
            </div>
            </div>
            </Modal>

        </div>
    )
}