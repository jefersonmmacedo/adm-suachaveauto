import "./notFound.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";

import notFoundImage from "../../assets/images/svg/404.svg";


export function NotFound() {

    return (
<div className="NotFound">
    <Navbar2 />
    <div className="MainAbout">
        <img src={notFoundImage} alt="" />
        <h1>Ops! Essa página não pode ser encontrada.</h1>
        <h5>Parece que nada foi encontrado neste local. Tente um dos links abaixo ou no menu acima</h5>
    </div>
    <Footer />
</div>
    )
}