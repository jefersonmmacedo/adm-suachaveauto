import { useFetch } from "../../hooks/useFetch";

export function Commissions() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);

    const Rent = data?.filter((property) => property.availability === "Alugado")
    const Sale = data?.filter((property) => property.availability === "Vendido")
    
    // const valueRent = parseInt(data[0]?.priceRent?.replace(/[^0-9]/gi, ""));
    // const valueText = valueRent.toString()
    // const valueTextFormat = valueText?.replace("00", "");


const valuesTotalRent = Rent?.reduce(function (acumulador, objetoAtual){
    const valueRent = parseInt(objetoAtual.priceRent?.replace(/[^0-9]/gi, ""));
    const valueText = valueRent.toString()
    const valueTextFormat = valueText?.replace("00", "");

return acumulador + parseFloat(valueTextFormat);
}, 0);


const valuesTotalSales = Sale?.reduce(function (acumulador, objetoAtual){
    const valueSale = parseInt(objetoAtual.priceSale?.replace(/[^0-9]/gi, ""));
    const valueText = valueSale.toString()
    const valueTextFormat = valueText?.replace("00", "");

return acumulador + parseFloat(valueTextFormat);
}, 0);

const commissionsRent = valuesTotalRent * 0.1
const commissionsSale = valuesTotalSales * 0.06

const valorTotal = commissionsRent + commissionsSale

var ResultBRL = valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    
    return (
        <div className="Commissions">
            {ResultBRL}
        </div>
    )
}
