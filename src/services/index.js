import { useState, useEffect } from 'react';
import { basePath } from './config';

async function SuperFetch(
    url,
    method = 'GET',
    headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body = {}
) {
    let options = {
        method,
        headers,
    };
    if (method === 'POST' || method === 'PUT') options = { ...options, body };

    // authentication
    // we will had custom headers here.

    return fetch(url, options)
        .then(res => {
            return Promise.resolve(res.json());
        })
        .catch(error => Promise.reject(error));
}

const useDataApi = (initialUrl, initialData = []) => {
    const [state, setState] = useState({
        loading: true,
        error: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;
        setState({ ...state, loading: true })
        const fetchData = async () => {

            try {
                const result = await SuperFetch(`${basePath}/${initialUrl}`);
                if (!didCancel) {
                    setState({ ...state, data: result, loading: false })
                }
            } catch (error) {
                if (!didCancel) {
                    setState({ ...state, error: true, loading: false })
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, []);


    return { ...state };
};

export default useDataApi;
