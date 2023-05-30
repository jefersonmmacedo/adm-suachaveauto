import "./contact.css";
import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import {IoMailOpenOutline, IoCallOutline, IoPhonePortraitOutline} from "react-icons/io5"

export function Contact() {
    return (
        <div className="Contact">
            <Navbar2/>
                <h2>Fale conosco</h2>
                <h4>Entre em contato conosco, estamos prontos para atendê-lo.</h4>


            <div className="form">
                <div className="inputsContact">               
                <input type="text" placeholder="Nome"/>
                <input type="text" placeholder="Empresa (Opcional)"/>
                </div>
                <div className="inputsContact">               
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Telefone"/>
                </div>
                <select name="" id="">
                    <option value="">Assunto</option>
                    <option value="">Dúvida</option>
                    <option value="">Dica</option>
                    <option value="">Sujestão</option>
                    <option value="">Solução de problemas </option>
                </select>

                <textarea name="" id="" cols="30" rows="10" placeholder="Mensagem"></textarea>

                <button>Enviar mensagem</button>
            </div>

            <div className="BlocksContact">
                <div className="blockContact">
                        <h3><IoMailOpenOutline /> Email</h3>
                        <h5>contato@suachave.com.br</h5>
                </div>
                <div className="blockContact">
                        <h3><IoCallOutline  /> Telefone</h3>
                        <h5>21 99742-9585</h5>
                </div>
                <div className="blockContact">
                    <h3><IoPhonePortraitOutline /> Whatsapp </h3>
                    <h5>21 99742-9585</h5>
                </div>
            </div> 

            <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12290.419599284141!2d-42.62790332892239!3d-22.711818016034076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1664680466523!5m2!1spt-BR!2sbr"
                    width="100%" height="400" style={{border:"0px", borderRadius: "6px"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

            <Footer/>
        </div>
    )
}