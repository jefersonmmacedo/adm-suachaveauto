import { useFetch } from "../../hooks/useFetch"

export function CountersWhatsapp({id}) {
    const {data} = useFetch(`/contact/property/${id}`);

    const Contact = data?.filter((contactUser) => contactUser.type === "Whatsapp" )

    if(!data) {
        return (
            <div className="CountersWhatsapp">
                0
            </div>
        )

    }
    return (
        <div className="CountersWhatsapp" style={{marginRight: '2px'}}>
            {Contact.length}
        </div>
    )
}