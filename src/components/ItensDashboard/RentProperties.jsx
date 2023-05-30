import { useFetch } from "../../hooks/useFetch";

export function RentProperties() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);

    const Rent = data?.filter((property) => property.availability === "Alugado")

const valuesTotalRent = Rent?.reduce(function (acumulador, objetoAtual){
    const valueRent = parseInt(objetoAtual.priceRent?.replace(/[^0-9]/gi, ""));
    const valueText = valueRent.toString()
    const valueTextFormat = valueText?.replace("00", "");

return acumulador + parseFloat(valueTextFormat);
}, 0);



var ResultBRL = valuesTotalRent?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})


    
    return (
        <div className="RentProperties">
            {ResultBRL}
        </div>
    )
}
