import "./topHeadHomeV3.css"
import { SearchPropertyHomeCenter } from "../SearchPropertyHomeCenter/SearchPropertyHomeCenter";

export function TopHeadHomeV3() {
    return (
        <div className="TopHeadHomeV3">
            <div className="blockTop">
            <div className="SearchText">
                <div className="TextTopSearch">
                <h1>Seu novo imóvel, você encontra aqui!</h1>
                <h4>Mais de 5000 imóveis disponíveis para você!</h4>
                </div>

                <SearchPropertyHomeCenter />
            </div>

            </div>
        </div>
    )
}