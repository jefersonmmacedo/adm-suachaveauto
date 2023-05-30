import "./paymentRent.css"


export function PaymentRent(idContract, value, maturity, idClient, cpfCnpjClient, nameClient) {

    const Vencimento = 27;
    const hoje = new Date().getDate();

    return (
        <div className="dataContractsUnic">
            {Vencimento > hoje ?
            <>
                <h6>Aluguel vencido:</h6>
                <button> Registrar pagamento</button>
            </>
            : Vencimento < hoje ?
            <>
            <h6>Vencimento de aluguel: 10/05/2023</h6>
            <button className="btn"> Registrar pagamento</button>
            
            </>
            : Vencimento === hoje ?
            <>
            <h6>Aluguel pago em:</h6>
            <h5 className="btn2"> 20/05/2023</h5>
            </>
            : ""
        }
    </div>
    )
}

{/* <DateFormat date={contract.readjustedRentDate} /> */}