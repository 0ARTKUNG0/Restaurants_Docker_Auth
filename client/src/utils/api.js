// Utility function for making authenticated API requests
const API_BASE_URL = 'http://localhost:5000/api';

const fetchWithAuth = async (url, options = {}) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    
    if (user.accessToken) {
        defaultHeaders['Authorization'] = 'Bearer ' + user.accessToken;
    }
    
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);
        
        // If unauthorized, clear localStorage and redirect to login
        if (response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }
        
        return response;
    } catch (error) {
        throw error;
    }
};

export default fetchWithAuth;
