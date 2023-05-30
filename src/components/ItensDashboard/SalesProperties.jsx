import { useFetch } from "../../hooks/useFetch";

export function SalesProperties() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);

    const Sale = data?.filter((property) => property.availability === "Vendido")



const valuesTotalSales = Sale?.reduce(function (acumulador, objetoAtual){
    const valueSale = parseInt(objetoAtual.priceSale?.replace(/[^0-9]/gi, ""));
    const valueText = valueSale.toString()
    const valueTextFormat = valueText?.replace("00", "");

return acumulador + parseFloat(valueTextFormat);
}, 0);


var ResultBRL = valuesTotalSales?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})


    
    return (
        <div className="SalesProperties">
            {ResultBRL}
        </div>
    )
}
