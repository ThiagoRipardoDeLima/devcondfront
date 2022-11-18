/**
 * hook de serviços
 */

const baseUrl = 'https://fakerapi.it/api/v1';

/**
 * Request Generico
 */
const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
            break;
    
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
            break;
    }

    let headers = {'Content-Type': 'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }
    
    let json;
    let req;
    try {
        req = await fetch(fullUrl, {method, headers, body});   
        json = await req.json(); 
    } catch (error) {
        json = {error: `Serviço indisponivel no momento.`}
    }
     
    return json;

}

const response = {
    error: '',
    token: ''
};

export default () => {
    return {
        getToken: ()=>{
            return localStorage.getItem('token');
        },
        validateToken: async()=>{
            let token = localStorage.getItem('token');
            //let json = await request("post", "/auth/validate", {}, token);
            response.token = token;
            let json = response;
            return json;
        },
        login: async (email, password) => {
            //let json = await request("post", "/auth/login", {email, password});
            let token = '123';
            localStorage.setItem('token','123');
            response.token = token;
            let json = response;
            return json;
        },
        logout: async () => {
            let token = localStorage.getItem('token');
            let json /*= await request("post", "/auth/logout", {}, token);*/
            localStorage.removeItem('token');
            return json;
        },
        getWall: async () => {
            let token = localStorage.getItem('token');
            let req = await request("get", "/books?_quantity=100", {}, token);
            response.list = [];
            if(req.code == 200)
                response.list = req.data;

            let json = response;
            return json;
        }
    };
}