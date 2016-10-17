import  'whatwg-fetch';

export const getPhoto = (input:string | Request):PromiseLike<any> => {
    return fetch(input)
        .then((response:Response):PromiseLike<any> =>{
            return response.json();
        });
};
