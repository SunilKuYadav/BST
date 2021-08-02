import {create} from 'apisauce';


const apiClient = create({
    baseURL:'http://192.168.2.67:3000/api',
});

export default apiClient;

// apiClient.get("sunil").then((responce) => {
//     if (!responce.ok){
//         responce.problem
//     }
//     console.log(responce);
// });
