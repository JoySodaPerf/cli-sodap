import axios from "axios";

axios.interceptors.response.use(res => {
    return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
export async function getRepoList() {
    return axios.get('https://api.github.com/orgs/sodaperf/repos');
}
export async function getTagList(repo) {
    return axios.get(`https://api.github.com/repos/sodaperf/${repo}/tags`);
}