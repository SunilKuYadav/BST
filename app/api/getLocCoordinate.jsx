import client from './client';

const endPoint = "/users/getData";

const getLocCoordinate = (userInfo) => client.post(endPoint, userInfo);

export default {
    getLocCoordinate,
     };