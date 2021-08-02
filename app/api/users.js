import client from './client';

const endPoint = "/users/register";

const register = (userInfo) => client.post(endPoint, userInfo);

export default {
     register,
     };