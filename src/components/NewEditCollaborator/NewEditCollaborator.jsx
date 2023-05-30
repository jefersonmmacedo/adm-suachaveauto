import "./newEditCollaborator.css";

import Modal from 'react-modal';
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

export function NewEditCollaborator({idClient}) {
    console.log(idClient)
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [tipeCollaborator, setTipeCollaborator] = useState("Pessoa Fícica");

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function handleNewTipeCollaborator(e) {
            setTipeCollaborator(e.target.value)
        }


        Modal.setAppElement('#root');
    return (
        <>
         <button className="btnControl" onClick={handleOpenModalProcess}><IoCreateOutline /></button>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Editar Colaborador</h3>

            <div className="form">
                <div className="DataInputs">
                <div className="dataInputUnic">
                    <h5>Função</h5>
                        <select value={tipeCollaborator} onChange={handleNewTipeCollaborator}>
                            <option value="Advogado(a)">Advogado(a)</option>
                            <option value="Corretor(a)">Corretor(a)</option>
                            <option value="Atendente">Atendente</option>
                            <option value="Secretária(o)">Secretária(o)</option>
                            <option value="Vendedor(a)">Vendedor(a)</option>
                            <option value="Designer">Designer</option>
                            <option value="Programador(a)">Programador(a)</option>
                            <option value="Diretor(a)">Diretor(a)</option>
                            <option value="Gerente">Gerente</option>
                            <option value="Supervisor(a)">Supervisor(a)</option>
                            <option value="CEO">CEO</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">

                        <h5>Nome completo</h5>
                          
                    
                    <input type="text" placeholder="Nome"/>
                       
                    </div>
                    <div className="dataInputUnic">
                        <h5>Nome de tratamento</h5>
                       
                    
                    <input type="text" placeholder="Nome"/>
                    </div>

                    <div className="dataInputUnic">
                        <h5>RG</h5>
                           
                   
                    <input type="text" placeholder="Nome"/>
                       
                    </div>
                    <div className="dataInputUnic">
                        <h5>CPF</h5>
                          
                    
                    <input type="text" placeholder="Nome"/>
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>E-mail</h5>
                    <input type="text" placeholder="Digite o prazo em números" />
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Telefone</h5>
                    <input type="text" placeholder="Digite o prazo em números" />
                    </div>
                    <div className="dataInputUnic">
                    <h5>Whatsapp</h5>
                        <input type="text" placeholder="Digite o número de parcelas" />
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Rua</h5>
                    <input type="text" placeholder="Nome"/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Número</h5>
                    <input type="text" placeholder="Nome"/>
                    </div>

                    <div className="dataInputUnic">
                    <h5>Bairro</h5>
                    <input type="text" placeholder="Digite o prazo em números" />
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Cidade</h5>
                    <select >
                            <option value="">Cidade</option>
                            <option value="">Rio Bonito</option>
                        </select>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Estado</h5>
                    <select >
                            <option value="">Estado</option>
                            <option value="">Rio de Jeneiro</option>
                        </select>
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Instagram</h5>
                    <input type="text" placeholder="Nome"/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Facebook</h5>
                    <input type="text" placeholder="Nome"/>
                    </div>

                <div className="dataInputUnic">
                    <h5>Linkedin</h5>
                    <input type="text" placeholder="Nome"/>
                    </div>
                <div className="dataInputUnic">
                    <h5>Twitter</h5>
                    <input type="text" placeholder="Nome"/>
                    </div>
                </div>

                <div className="ButtonsForm">
                <button className="send">Cadastrar Cliente</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}