import "./uploadImagesAWSModal.css";

import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoCloseOutline, IoDocumentAttachOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { mask as masker, unMask } from "remask";
import { toNumber } from "vanilla-masker";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Auth";
import { MyButtonDocument } from "../UploadDocuments/UploadDocuments";
import { useState } from "react";
import api from "../../services/api";
import UploadAWS from "../UploadAWS/UploadAWS";
import {v4 as uuidv4} from 'uuid';
import {filesize} from 'filesize';
import FileList from "../FileList";


export function UploadImagesAWSModal() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
    const [isOpenModalUpload, setIsOpenModaUpload] = useState(false);


    function handleOpenModalUpload(e) {
        e.preventDefault();
          setIsOpenModaUpload(true)
        }
      
        function handleCloseModalUpload(e) {
          e.preventDefault();
          setIsOpenModaUpload(false);
        }


          //Upload de images AWS
const [uploadFilesData, setUploadFilesData] = useState([])

  function handleUpload (files) {
    console.log(files)
    const uploadedFiles = files.map(file => ({
      file,
      id: uuidv4(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));


    setUploadFilesData(uploadFilesData.concat(uploadedFiles))

  
      //uploadedFiles.forEach(this.processUpload);
    };

    async function handleDelete() {
        console.log("Delete")
    }



      Modal.setAppElement('#root');

    return (
        
        <>
         <button className="uploadButton" onClick={handleOpenModalUpload}>Adicionar imagens</button>


         <Modal isOpen={isOpenModalUpload} onRequestClose={handleCloseModalUpload}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalUpload}>
            <IoCloseOutline color={"#fff"}/> 
            </button>
            <div className="content-modal-home-Upload">
            <div className="itensModalHome-Upload">
                <h4>Faça upload das suas imagens:</h4>
                    <UploadAWS onUpload={handleUpload}/>
                    {!!uploadFilesData.length && (
                    <div className="listImages">
                        <FileList files={uploadFilesData} onDelete={handleDelete} />
                        </div>
                        )}
                        

                    <button className="btnSave" onClick={handleOpenModalUpload}>Finalizar</button>
            </div>
            </div>
            </Modal>
        </>
    )
}