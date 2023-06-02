import axios from "axios";

export const getPostsRequests = async () => await axios.get('/posts')

export const createPostRequest = async (post) => {
    const form = new FormData();
    for (let key in post) {
        form.append(key, post[key]);
    }

    return await axios.post("/posts", form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const deletePostRequest = async (id) => await axios.delete("/posts/" + id);
export const updatePostRequest = async (id, newPostFields) => {
    const form = new FormData();
    for (let key in newPostFields) {
        form.append(key, newPostFields[key]);
    }
    return await axios.put("/posts/" + id, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const getPostRequest = async (id) => await axios.get("/posts/" + id);
