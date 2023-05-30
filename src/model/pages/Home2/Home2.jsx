import "./home2.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { TopHeadHome } from "../../components/TopHeadHome/TopHeadHome";
import {  PropertyCarroussel } from "../../components/PropertyCarroussel/PropertyCarroussel";
import { ExploreIconsProperties } from "../../components/ExploreIconsProperties/ExploreIconsProperties";
import { ProcessProperty } from "../../components/ProcessProperty/ProcessProperty";
import { BlockHome } from "../../components/BlockHome/BlockHome";
import { TopHeadHomeV2 } from "../../components/TopHeadHomeV2/TopHeadHomeV2";
import { TopHeadHomeV3 } from "../../components/TopHeadHomeV3/TopHeadHomeV3";


export function Home2() {

    return (
        <div className="Home2">
            <Navbar2 />
            <TopHeadHomeV3 />
            <ProcessProperty />
            <div className="textFeature">
            <h3>Imóveis à venda</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Venda"}/>
            </div>

                <BlockHome />

            <div className="textHome2">
            <h3>Imóveis para alugar</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Aluguel"}/>
            </div>
            <ExploreIconsProperties />
            <Footer />

        </div>
    )
}