import common from "../utils/common";

async function getAnimes(page = 1, pageSize = 24) {
    const params = new URLSearchParams({
        page: Math.max(1, Number(page) || 1),
        page_size: Math.min(100, Math.max(1, Number(pageSize) || 20)),
    });

    return await common.axiosCall("GET", `/anime/test?${params.toString()}`);
}

async function postAnime(params) {
    const value = await common.axiosCall("POST", "/anime/get_info", params);
    return value.message
}

async function createCommentAPI(params, token) {
    const value = await common.axiosCall("POST", '/comments/create', params, token)
    console.log(value)
}

async function getComments(params, page = 1, pageSize = 20) {
    const query = new URLSearchParams({
        page: Math.max(1, Number(page) || 1),
        page_size: Math.min(100, Math.max(1, Number(pageSize) || 20)),
    });

    return await common.axiosCall(
        "POST",
        `/comments/get_comments?${query.toString()}`,
        params
    )
}

async function getCommentsByUser(params, token, page = 1, pageSize = 20) {
    const query = new URLSearchParams({
        page: Math.max(1, Number(page) || 1),
        page_size: Math.min(100, Math.max(1, Number(pageSize) || 20)),
    });

    return await common.axiosCall(
        "POST",
        `/comments/get_comment_by_users/test?${query.toString()}`,
        params,
        token
    );
}

export {
    getAnimes, 
    postAnime, 
    createCommentAPI,
    getComments,
    getCommentsByUser
}
