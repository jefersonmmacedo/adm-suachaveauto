import "./properties.css";
import Navbar2 from "../../components/Nav/Navbar";
import { ListProperty } from "../../components/ListProperty/ListProperty";
import { SearchPropertyListing } from "../../components/SearchPropertyHomeTop/SearchPropertyHomeTop";
import { Footer } from "../../components/Footer/Footer";
import { FiArrowUpCircle } from "react-icons/fi";
import { SearchProperty } from "../../components/SearchProperty/SearchProperty";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import Modal from 'react-modal';
import { useState } from "react";
import { useParams, useLocation, useSearchParams, useRoutes} from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

export function Properties(){
    const {status} = useParams();
    const query = useQuery();
    console.log(query.get("tipo"))
    const [isOpenModalSearch, setIsOpenModaSearch] = useState(false);
    function handleTop(e) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    function handleOpenModalSearch(e) {
        e.preventDefault();
          setIsOpenModaSearch(true)
        }
      
        function handleCloseModalSearch(e) {
          e.preventDefault();
          setIsOpenModaSearch(false);
        }

        Modal.setAppElement('#root');
    
    return (
        <div className="Properties">
        <Navbar2 />
        <div className="listPage">
            {/* <div className="SearchView">
            <SearchPropertyListing />
            </div>
            <div className="ButtomView">
            <button onClick={handleOpenModalSearch}><IoSearch/>Buscar Imóveis</button>
            </div> */}
            <ListProperty status={status} tipo={query.get("tipo")} subtipo={query.get("subtipo")} quartos={query.get("quartos")}
                           suites={query.get("suites")} banheiros={query.get("banheiros")} garagem={query.get("garagem")}/>
            <button className="topScroll" onClick={handleTop}><FiArrowUpCircle /></button>
        </div>
        <Footer />


        <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
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
