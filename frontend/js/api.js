const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '' ? 'http://localhost:5000/api/v1' : '/api/v1';

export const fetchProfile = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/profile`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { success: false, error: 'Failed to fetch profile' };
    }
};

export const fetchSkills = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/skills`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching skills:', error);
        return { success: false, error: 'Failed to fetch skills' };
    }
};

export const fetchProjects = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { success: false, error: 'Failed to fetch projects' };
    }
};

export const fetchSocials = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/socials`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching socials:', error);
        return { success: false, error: 'Failed to fetch socials' };
    }
};

export const submitContact = async (data) => {
    try {
        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error('Error submitting contact:', error);
        return { success: false, error: 'Failed to submit contact' };
    }
};
