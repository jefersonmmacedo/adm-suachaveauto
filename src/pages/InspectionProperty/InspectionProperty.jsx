import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./inspectionProperty.css";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useFetch } from "../../hooks/useFetch";
import imageSite from "../../assets/images/svg/survey.svg";
import Task from "../../assets/images/svg/task.svg";

export function InspectionProperty() {


    return (
        <div className="InspectionProperty">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <div className="solicitation">
                <h2>Módulo em desenvolvimento</h2>
                <h4>Fique tranquilo(a). Assim que estivermos prontos nós avisaremos</h4>
                <img src={imageSite} alt="Imagem de um personagem editando um site com a mão" />
                </div>
            </div>
            </div>

    )
}