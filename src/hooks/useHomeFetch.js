import { useState, useEffect, useRef } from 'react';
// API
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_resaults: 0
};

export const useHomeFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev =>({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));


        } catch (error){
            setError(true);
        }
        setLoading(false);
    }
    
    // Initial renders
    useEffect(() => {
        fetchMovies(1)
    }, [])

    return {state, loading, error};
}