//Notif Can stack and if the whole screen don't fit then there should be 1 more 2 more etc

//Structure of Notif. NOTE! they should put this in array form
export const notifStructure = {
    id: Date.now().toString(),
    content: "Lorem ipsum dolor sit amet consectetur",
}

export function notifDispatch(state, action){
    state = [ ...state ];
    switch(action.notif){
        case "new":
            const newNotif = {
                id: Date.now().toString(),
                content: action.content,
            }
            state.push(newNotif);
        break;
        case "close":
            state = state.filter(notif=>notif.id!=action.id);
        break;
    }
    return [...state];
}


//Static class for creating new node of notif. This is a template since dispatch is not defined here
export class Notif{
    //-- In House--//
    //This can be overload
    static store(content){
        this.dispatch({notif:"new", content:content});
    }
    //-- In House--//
    static patch(dispatch){
        this.dispatch = dispatch;
        return this;
    }
    static new(content){
        this.store(content);
        return this;
    }
}
