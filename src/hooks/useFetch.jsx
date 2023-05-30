import useSWR from 'swr'
import api from '../services/api';

export function useFetch(url) {
    const { data, error} = useSWR(url, async url => {
        const res = await api.get(url);
        const data = await res.data;

        return data;
    },{
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 1000
    })

    return {data, error}
}
export function useFetchPost(url) {
    const { data, error} = useSWR(url, async url => {
        const res = await api.post(url);
        const data = await res.data;

        return data;
    },{
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 1000
    })

    return {data, error}
}

export function useFetchRooms(id) {

    const { data, error} = useSWR(`/rooms/company/${id}`, async url => {
        let data = [];
        const res = await api.get(url);
        console.log(id);
        async function loadRoomsRefresh() {
            res.data.forEach((chatLists) => {
                async function loadData() {
                    const result = await api.get(`/messages/${chatLists.room}`)
                    const dados = {
                        dateLastMessage: result.data[0].created_at,
                        id: chatLists.id,
                        room: chatLists.room,
                        idCompany: chatLists.idCompany,
                        idClient: chatLists.idClient,
                        idProperty: chatLists.idProperty,
                        imageProperty: chatLists.imageProperty,
                        created_at: chatLists.created_at
                    } 

                    data.push(dados);
    
                }

                loadData()
            })
        }

        loadRoomsRefresh()

        if(data) {
            data.sort(function(a,b) {
                if(a.dateLastMessage > b.dateLastMessage ) {
                    return -1
                } else {
                    return true
                }
            })
        }
        
        
        return data;
    },{
        revalidateOnMount: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 1000
    })

    return {data, error}
}