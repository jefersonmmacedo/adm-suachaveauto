import "./exploreIconsProperties.css";
import {FaHome, FaBuilding, FaStore, FaMapMarkedAlt} from "react-icons/fa";
import {IoBusiness, IoArrowForward, IoHomeOutline, IoMapOutline} from "react-icons/io5";
import {GiFactory, GiFarmTractor} from "react-icons/gi";
import {RiStore2Line} from "react-icons/ri";
import {HiOutlineHome} from "react-icons/hi";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import {TbTractor, TbMap2, TbBuildingFactory} from "react-icons/tb";


export function ExploreIconsProperties() {
    return (
        <div className="ExploreIconsProperties">
            <div className="mainExplorer">
            <div className="textExplore">
                <h2>Explore mais imóveis</h2>
                <h4>Veja os tipos de imóveis mais procurados</h4>

                <a href="/imoveis/all">+ 1.500 imóveis <IoArrowForward /> </a>
            </div>

            <div className="iconsExplore">
                <div className="IconUnicExplore">
                    <MdOutlineMapsHomeWork />
                    <h5>Residenciais</h5>
                </div>
                <div className="IconUnicExplore">
                    <RiStore2Line />
                    <h5>Comerciais</h5>
                </div>
                <div className="IconUnicExplore">
                    <TbTractor />
                    <h5>Rurais</h5>
                </div>
                <div className="IconUnicExplore">
                    <TbBuildingFactory />
                    <h5>Industriais</h5>
                </div>
                <div className="IconUnicExplore">
                    <TbMap2 />
                    <h5>Terrenos</h5>
                </div>
            </div>
            </div>

        </div>
    )
}