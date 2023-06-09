import axios from "axios";

export const registerUserRequest = async (userData) => {
    try {
        const { data } = await axios.post('/auth/register', userData);
        return data;
    } catch (e) {
        return e.response.message;
    }
}

export const loginUserRequest = async (userData) => {
    try {
        const { data } = await axios.post('/auth/login', userData);
        return data;
    } catch (e) {
        return e.response.message;
    }
};

export const tokenAuth = async (token) => {
    try {
        const { data } = await axios.get('/auth/me', {
            headers: {
                Authorization: token,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};




export const deleteUserRequest = async (id) => await axios.delete("/auth/" + id);

export const updateUserRequest = async (id, newPostFields) => {
    const form = new FormData();
    for (let key in newPostFields) {
        form.append(key, newPostFields[key]);
    }
    return await axios.put("/auth/" + id, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

