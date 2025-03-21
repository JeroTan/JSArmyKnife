import type { APIContext, MiddlewareNext } from "astro";
import { escapeToRegex } from "@jsarmyknife/native--parse";


/*|---------------------------------------------------------------------------------------|*/
/*|  For Astro Middleware                                                                 |*/
/*|---------------------------------------------------------------------------------------|*/
export class Middleware {
  /** Required Middleware */
  private context: APIContext<Record<string, any>, Record<string, string | undefined>>;
  private next: MiddlewareNext;
  private pathList: Path[] = [];
  private groupings: { result: Response | undefined }[] = [];
  /** Stacker */

  /** Constructor */
  constructor(context: APIContext<Record<string, any>, Record<string, string | undefined>>, next: MiddlewareNext) {
    this.context = context;
    this.next = next;
  }

  async group(callback: (mid: Middleware) => Promise<Response | undefined>) {
    const mid = new Middleware(this.context, this.next);
    this.groupings.push({ result: await callback(mid) });
  }

  path() {
    const pathWare = new Path(this.context);
    this.pathList.push(pathWare);
    return pathWare;
  }

  async fin() {
    //Prepare the result
    for (let i = 0; i < this.pathList.length; i++) {
      const result = await this.pathList[i].get();
      if (result != undefined) {
        return result;
      }
    }
    return undefined;
  }

  private async groupCheck() {
    //Prepare the result
    for (let i = 0; i < this.groupings.length; i++) {
      if (this.groupings[i].result != undefined) {
        return this.groupings[i].result;
      }
    }
    return undefined;
  }

  // Use this to run your middleware
  async result() {
    //Check Groupings First
    const groupCheckResult = await this.groupCheck();
    if (groupCheckResult != undefined) return groupCheckResult;

    //Then For individual
    const singleResult = await this.fin();

    if (singleResult == undefined) {
      return this.next();
    } else {
      return singleResult;
    }
  }
}

export class Path {
  private pathList: { type: "include" | "exclude"; paths: string[]; allowProceeding?: boolean }[] = [];
  private context: APIContext<Record<string, any>, Record<string, string | undefined>>;
  response: Response | undefined;

  constructor(context: APIContext<Record<string, any>, Record<string, string | undefined>>) {
    this.context = context;
  }
  setContext(context: APIContext<Record<string, any>, Record<string, string | undefined>>) {
    this.context = context;
    return this;
  }
  select(paths: string[], allowProceeding = false) {
    this.pathList.push({ type: "include", paths, allowProceeding });
    return this;
  }
  except(paths: string[], allowProceeding = false) {
    this.pathList.push({ type: "exclude", paths, allowProceeding });
    return this;
  }

  checkMatch() {
    const pathName = this.context.url.pathname;

    //Iterate through the pathList in which pathList contains another group of paths
    //Since it is every the pathName should match all the requirements
    const result = this.pathList.length > 0 ? this.pathList.every((pathData) => {
      let result = false;
      //Check if path from pathname exist in pathData List
      if (pathData.allowProceeding) { //Allow proceeding means that the path can allow to be a subpath of the pathData
        result = pathData.paths.some((path) => {
          return new RegExp(`^${escapeToRegex(path)}.*$`).test(pathName);
        });
      } else {
        result = pathData.paths.some((path) => path == pathName);
      }
      
      if (pathData.type == "include") {
        return result;
      } else {
        return !result;
      }
    }) : true;
    return result;
  }

  async do(callback: (context: ASTRO_CONTEXT) => Promise<undefined | Response> | (undefined | Response)) {
    if (!this.checkMatch()) {
      this.response = undefined;
      return undefined;
    }

    const result = callback(this.context);
    if (result instanceof Promise) {
      this.response = await result;
    } else {
      this.response = result;
    }
    return result;
  }

  async get() {
    return this.response;
  }
}

export type ASTRO_CONTEXT = APIContext<Record<string, any>, Record<string, string | undefined>>;