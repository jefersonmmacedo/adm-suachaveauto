import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./faq.css"

export function Faq() {

    const Questions = [
        {
            id: 1,
            question: "O que é o Sua Chave?",
            reply: "Somos um marketplace para imobiliárias e corretores, com foco em conectar seus imóveis a clientes interessados."
        },
        {
            id: 2,
            question: "como me cadastrar no Sua Chave?",
            reply: "Em vários lugares do site você encontra um botão ou link para a página de cadastro. O Cadastro é simples e bem rápido."
        },
        {
            id: 3,
            question: "Quais os planos?",
            reply: "Possuímos 3 planos atualmente: Plano Básico, Plano Web e Plano WebApp, Acesse a nossa página de planos e tenha mais detalhes."
        },
        {
            id: 4,
            question: "Para quem é o Sua Chave?",
            reply: "Para corretores e imobiliárias que querm divulgar seus imóveis e clientes que buscam um imóvel para sua moradia."
        },
        {
            id: 5,
            question: "Porque desejo criar conta de cliente?",
            reply: "Com a conta como cliente você aproveita as funcionalidades de salvar favoritos, mandar mensagem no chat, agendar vistas e muito mais."
        },
        {
            id: 6,
            question: "Os planos possuem fidelidade?",
            reply: "Não. Nossos planos não possuem fidelidade e são cobrados mensalmente."
        },
        {
            id: 7,
            question: "Preciso ter cartão de crédito?",
            reply: "Não. Neste primeiro momento estamos trabalhando apenas com pagamentos na modalidade PIX."
        },
    ]
    return (
        <div className="Faq">
            <Navbar2 />
            <h2>Faq</h2>
            <h4>Tire suas dúvidas com as perguntas mais feitas por nossos clientes e colaboradores.</h4>

            <div className="blocFaq">
                <input type="search" placeholder="Digite sua dúvida"/>

                    {Questions.map((faqs) => {
                        return (
                <div className="faqUnic" key={faqs.id}>
                    <div className="Question">
                            <h4>{faqs.question}</h4>
                    </div>
                    <div className="Reply">
                        <h5>{faqs.reply}</h5>
                    </div>
                </div>
                        )
                    })}
            </div>
            <Footer />
        </div>
    )
}