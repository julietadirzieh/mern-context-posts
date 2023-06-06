import axios from "axios";

export const registerUserRequest = async (userData) => {
    try {
        const { data } = await axios.post('/users/register', userData);
        return data;
    } catch (e) {
        return e.response.message;
    }
}

export const loginUserRequest = async (userData) => {
    try {
        const { data } = await axios.post('/users/login', userData);
        return data;
    } catch (e) {
        return e.response.message;
    }
};

export const getUserRequest = async (id) => await axios.get("/users/" + id);

export const deleteUserRequest = async (id) => await axios.delete("/users/" + id);

export const updateUserRequest = async (id, newPostFields) => {
    const form = new FormData();
    for (let key in newPostFields) {
        form.append(key, newPostFields[key]);
    }
    return await axios.put("/users/" + id, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

