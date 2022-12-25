const host = 'https://blog-server-sable.vercel.app/api';
const getPostsApi = `${host}/post/`;
const getCategoriesApi = `${host}/category/`;
const registerApi = `${host}/user/register`;
const loginApi = `${host}/user/login`;
const createPostApi = `${host}/post/new`;
const deletePostApi = `${host}/post/delete`;
const editPostApi = `${host}/post/update`;
const getUserApi = `${host}/user`;
const editUserApi = `${host}/user/update`;
const deleteUserApi = `${host}/user/delete`;
const contactApi = `${host}/contact`

export {
  host,
  getPostsApi,
  getCategoriesApi,
  registerApi,
  loginApi,
  createPostApi,
  deletePostApi,
  editPostApi,
  getUserApi,
  editUserApi,
  deleteUserApi,
  contactApi
};
