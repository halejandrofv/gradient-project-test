import {
    API_URL,
    TEMPLATE
} from './CONST'

export const getAllTemplates = () => {
    return new Promise( (resolve,reject)=>{
        try{
            fetch(`${API_URL}${TEMPLATE}`)
            .then(response => resolve(response.json()) )
        }catch(error){
            reject(error);
        }
    });
}   

export const addTemplate = (data) => {
    return new Promise( (resolve,reject)=>{
        try{
            fetch(`${API_URL}${TEMPLATE}`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then( (response) => { 
                resolve(response.json())
            })

        }catch(error){
            reject(error);
        }
    });
}   
