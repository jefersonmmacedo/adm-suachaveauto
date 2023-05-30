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
export function useFetchPost(url, data2) {
    const { data, error} = useSWR(url, async url => {
        const res = await api.post(url, data2);
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