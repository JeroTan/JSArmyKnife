
export class AuthToken{
    verifierFromAPI(){
        return new Promise((resolve, reject)=>{
            resolve(true);
        });
    }
    constructor(api = false){
        if(api)
            this.verifierFromAPI = api;
    }
    addVerifier(api){
        this.verifierFromAPI = api;
    }


    store(token){
        localStorage.setItem('token', token);
    }
    exist(){
        if(localStorage.getItem('token') === null){
            return false;
        }
        return true;

    }
    get(){
        if(this.exist()){
            return localStorage.getItem('token');
        }
        return "";

    }
    remove(){
        if(localStorage.getItem('token') === null)
            return false;

        localStorage.removeItem('token');
    }
    verify(){
        const THIS = this;
        return new Promise((resolve, reject)=>{
            if(!THIS.exist()){
                return resolve(false);
            }
            THIS.verifierFromAPI().then(x=>{
                if(x?.status ===  200){
                    return resolve(true);
                }
                THIS.remove();
                return resolve(false);
            });
        });
    }
}

