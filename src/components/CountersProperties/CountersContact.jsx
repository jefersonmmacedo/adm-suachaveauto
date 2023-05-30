import { useFetch } from "../../hooks/useFetch"

export function CountersContact({id}) {
    const {data} = useFetch(`/contact/property/${id}`);

    const Contact = data?.filter((contactUser) => contactUser.type === "Ligação" )

    if(!data) {
        return (
            <div className="CountersContact">
                0
            </div>
        )

    }
    return (
        <div className="CountersContact" style={{marginRight: '2px'}}>
           {Contact.length}
        </div>
    )
}