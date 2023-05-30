import "./mapAccess.css";

import Modal from 'react-modal';
import { useState } from "react";

export function MapAccess({latitude, longitude}) {
    console.log({latitude, longitude})
    
    const [isOpenModalAccess, setIsOpenModaAccess] = useState(false);


    function handleOpenModalAccess(e) {
        e.preventDefault();
          setIsOpenModaAccess(true)
        }
      
        function handleCloseModalAccess(e) {
          e.preventDefault();
          setIsOpenModaAccess(false);
        }


        Modal.setAppElement('#root');
    return (
        <>
         <a onClick={handleOpenModalAccess}>Ver localização</a>


        <Modal isOpen={isOpenModalAccess} onRequestClose={handleCloseModalAccess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
 
        <div className="content-moda-Access">
        <div className="itensModal-Access">
        <div className="map">
                            <iframe
                            width="100%" height="300"
                            frameBorder="0" style={{border:"0px", borderRadius: "6px"}}
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8&q=${latitude},${longitude}`}
                            allowFullScreen>
                            </iframe>
                           <h6> * Endereço aproximado</h6>
                        </div>

        </div>
        </div>
        </Modal>
        </>
    )
}