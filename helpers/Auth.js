import { ApiVerifyAuth } from "./API";

//Insert the AuthVerifier Here
async function AuthVerifier(){
    return await new Promise((resolve, reject)=>{
        resolve(true);
    });
}


class Auth{
    storeToken(token){
        localStorage.setItem('token', token);
    }
    tokenExist(){
        if(localStorage.getItem('token') === null){
            return false;
        }
        return true;

    }
    getToken(){
        if(this.tokenExist()){
            return localStorage.getItem('token');
        }
        return "";
        
    }
    removeToken(){
        if(localStorage.getItem('token') === null)
            return false;
        
        localStorage.removeItem('token');
    }
    verifyToken(){
        const THIS = this;
        return new Promise((resolve, reject)=>{
            if(!THIS.tokenExist()){
                return resolve(false);
            }
            AuthVerifier().then(x=>{
                if(x?.status ===  200){
                    return resolve(true);
                }
                THIS.removeToken();
                return resolve(false);
            });
        });
    }
}



//CALL THIS
export const auth = new Auth;