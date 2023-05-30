import "./chooseYourAccount.css"

export function ChooseYourAccount() {

    function handleRedirect(e) {
        e.preventDefault();
        window.open("/cadastro",  "_self");
    }
    function handleRedirectClient(e) {
        e.preventDefault();
        window.open("/cadastro-corretor", "_self")
    }
    return (
        <div className="ChooseYourAccount">
                        <div className="professional">
            <div className="block">
                    <button onClick={handleRedirect}>SOU CORRETOR/IMOBILIÁRIA</button>
                </div>
            </div>
            <div className="client">
                <div className="block">
                    <button onClick={handleRedirectClient}>CORRETOR DE IMOBILIÁRIA</button>
                </div>
            </div>
        </div>
    )
}