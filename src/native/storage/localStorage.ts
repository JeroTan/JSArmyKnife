import { anyToStr } from "../parse/conversion";

/**
 * @description - This one will do the trick to store multiple keys or array or object using json and conversely convert it back to back. It uses local storage
 * @template Type - The type of data that you want to store
 * @class Storage
 * @example
 * const storage = new Storage<string>("key");
 * storage.store("value");
 * storage.get(); // "value"
 * storage.remove();
 * storage.store(["value1","value2"]);
 * storage.get(); // ["value1","value2"]
 * storage.remove();
 * storage.store({key:"value"});
 * storage.get(); // {key:"value"}
 * storage.remove();
 */
export class Storage<Type>{
  //structure
  public key: string = "1";

  constructor(key?:string|number|undefined){
      if(key)
          this.setKey(key);
  }
  //methods
  /**
   * @param key - The key that you want to use to store the data in local storage
   * @returns 
   */
  setKey(key:string|number){
      this.key = String(key);
      return this;
  }
  /**
   * @returns - Returns true if the storage with the current key exists in the local storage
   */
  isExist():boolean{
      return localStorage.getItem(this.key) !== null
  }
  /**
   * @param value - The value that you want to store in the local storage
   * @returns 
   */
  store(value: Type){
      localStorage.setItem(this.key, anyToStr(value as any));
      return this;
  }
  /**
   * 
   * @returns - Remove the current data along with its key in the local storage
   */
  remove(){
      localStorage.removeItem(this.key);
      return this;
  }

  /**
   * @param parseJSON - If you want to parse the value to JSON or not
   * @returns - The value that is stored in the local storage
   */
  get( ): Type;
  get( parseJSON: true ): Type;
  get( parseJSON: false ): string;
  get(parseJSON = true):Type|string{ 
      let value:string | null = localStorage.getItem(this.key);
      if(value === null)
          return "";
      if(parseJSON ){
          return JSON.parse(value) as Type;
      }
      return value as string;
  }
}