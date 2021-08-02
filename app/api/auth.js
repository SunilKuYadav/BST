import client from './client';

const endPoint = '/users/login';

const login = (data) => client.post(endPoint, data);

export default {
    login,
}