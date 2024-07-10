interface SVG{
    viewBox: string;
    width: string;
    height: string;
    xmlns: string;
}
export interface VECTORS{
    element: string;
    d?: string;
    fillRule?: string;
    clipRule?: string;
    [key: (string|number)]:any
}
export interface ICON{
    svg: SVG;
    vectors: VECTORS[];
}
export interface ICONLIST{
    [key: (string|number)]: ICON
}

//A class that you will be use to add those Icons
class MakeIcon{
    private svg: SVG = {
        viewBox:"0 0 24 24",
        width:"100%",
        height:"100%",
        xmlns:"http://www.w3.org/2000/svg",
    };
    private vectors: VECTORS[] = [];

    constructor(){
        this.reset();
    }
    reset(){
        //This.svg is the parent of all vectors
        this.svg = {
            viewBox:"0 0 24 24",
            width:"100%",
            height:"100%",
            xmlns:"http://www.w3.org/2000/svg",
        }
        //This.vectors is the child of svg that will be use to show a graphics
        this.vectors = [];
        return this;
    }
    addFill(d:string){
        this.vectors.push({
            element:"path",
            d:d,
        })
        return this;
    }
    addStroke(d:string, fillRule:string="evenodd", clipRule:string="evenodd"){
        this.vectors.push({
            element: "path",
            fillRule: fillRule,
            clipRule: clipRule,
            d:d,
        })
        return this;
    }
    addPath(element:object){
        this.vectors.push({
            element: "path",
            ...element
        })
        return this;
    }
    addViewBox(viewBox:string){
        this.svg.viewBox = viewBox;
        return this;
    }
    get(){
        const iconData: ICON = {
            svg: this.svg,
            vectors: this.vectors,
        }
        return iconData;
    }
}

//iconNew is use to make an icons
function iconNew(){
    return new MakeIcon();
}


export const IconList:ICONLIST = {
    person: iconNew().addFill("M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z").get(),

    close: iconNew().addFill("M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z").addViewBox("0 0 1024 1024").get(),

    add: iconNew().addFill("M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20z").addViewBox("0 0 20 29").get(),

    search: iconNew().addFill("M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z").get(),

    filter: iconNew().addFill("M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14Z").get(),

    edit: iconNew().addFill("M10 14v-2.615l8.944-8.945q.166-.165.348-.228t.385-.064q.188 0 .368.064q.18.063.326.21L21.483 3.5q.16.165.242.364t.083.401t-.06.382t-.227.345L12.52 14zm9.465-8.354l1.348-1.361l-1.111-1.17l-1.387 1.381zM5.615 20q-.69 0-1.152-.462T4 18.385V5.615q0-.69.463-1.152T5.615 4h8.387l-6.387 6.387v5.998h5.897L20 9.896v8.489q0 .69-.462 1.152T18.385 20z").get(),

    delete: iconNew().addFill("M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z").get(),

    back: iconNew().addFill("M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z").get(),

    check: iconNew().addFill("M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z").get(),

    cross: iconNew().addFill("M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8l-1.4 1.4z").get(),

    warning: iconNew().addFill("M1 21L12 2l11 19H1Zm3.45-2h15.1L12 6L4.45 19ZM12 18q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18Zm-1-3h2v-5h-2v5Zm1-2.5Z").get(),

    i: iconNew().addFill("M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm1 13h-2v2h2v-2zm-2-2h2l.5-6h-3l.5 6z").get(),

    crown: iconNew().addFill("M14 5c0 .53-.206 1.012-.543 1.37l2.624 3.28a.25.25 0 0 0 .307.068l2.65-1.326A2.004 2.004 0 0 1 21 6a2 2 0 0 1 .444 3.95l-1.804 9.623A1.75 1.75 0 0 1 17.92 21H6.08a1.75 1.75 0 0 1-1.72-1.427L2.556 9.95a2 2 0 1 1 2.406-1.559l2.65 1.326a.25.25 0 0 0 .307-.068l2.624-3.28A2 2 0 1 1 14 5Zm-2 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z").get(),

    up: iconNew().addFill("m12 8l7 8H5z").get(),

    down: iconNew().addFill("m5 8l7 8l7-8").get(),

    upload: iconNew().addFill("M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z").get(),

    eye: iconNew().addFill("M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5").get(),

    right: iconNew().addFill("M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886").get(),

    lastNext: iconNew().addFill("M3 4.753c0-1.408 1.578-2.24 2.74-1.444l10.498 7.194a1.75 1.75 0 0 1 .01 2.88L5.749 20.685C4.59 21.492 3 20.66 3 19.248zM21 3.75a.75.75 0 0 0-1.5 0v16.5a.75.75 0 0 0 1.5 0z").get(),

    firstPrev: iconNew().addFill("M3 3.75a.75.75 0 0 1 1.5 0v16.5a.75.75 0 0 1-1.5 0zm18 1.003c0-1.408-1.578-2.24-2.74-1.444L7.763 10.503a1.75 1.75 0 0 0-.01 2.88l10.499 7.302c1.16.807 2.749-.024 2.749-1.437z").get(),

    next: iconNew().addFill("m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17").addViewBox("0 0 256 256").get(),

    prev: iconNew().addFill("M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z").addViewBox("0 0 256 256").get(),

    facebook: iconNew().addFill("M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95").get(),

    twitter: iconNew().addFill("M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23").get(),

    youtube: iconNew().addFill("m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73").get(),

    compactView: iconNew().addFill("M3 11V3h8v8zm0 10v-8h8v8zm10-10V3h8v8zm0 10v-8h8v8z").get(),

    wideView: iconNew().addFill("M9 20h13v-4H9zM2 8h5V4H2zm0 6h5v-4H2zm0 6h5v-4H2zm7-6h13v-4H9zm0-6h13V4H9z").get(),

    plus: iconNew().addFill("M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2").get(),

    save: iconNew().addFill("M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6z").get(),

    loadingDonut: iconNew().addFill("M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75").get(),

    hamburgerMenu: iconNew().addFill("M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1").get(),

    collapseLeft: iconNew().addFill("M11.92 19.92L4 12l7.92-7.92l1.41 1.42l-5.5 5.5H22v2H7.83l5.51 5.5zM4 12V2H2v20h2z").get(),

    upDown: iconNew().addFill("M18.79 8.387a1 1 0 0 1-1.497 1.32L12 4.414L6.707 9.707l-.094.083a1 1 0 0 1-1.32-1.497l6-6l.094-.083a1 1 0 0 1 1.32.083l6 6zM5.21 15.613a1 1 0 0 1 1.497-1.32L12 19.586l5.293-5.293l.094-.083a1 1 0 0 1 1.32 1.497l-6 6l-.094.083a1 1 0 0 1-1.32-.083l-6-6z").get(),

    calendar: iconNew().addFill("M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64").addViewBox("0 0 512 512").get(),

    cash: iconNew().addFill("M3 6h18v12H3zm9 3a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3M7 8a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2v-4a2 2 0 0 1-2-2z").get(),

    trash: iconNew().addFill("7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z").get(),

    naturalNote: iconNew().addFill("M10 8.75V3.5H8v14l6-2.25v5.25h2v-14l-6 2.25m4 4.5l-4 1.5v-4l4-1.5v4Z").get(),

    house: iconNew().addFill("M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120").addViewBox("0 0 256 256").get(),

    refresh: iconNew().addFill("M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20").get(),

    email: iconNew().addFill("m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2").get(),

    smartphone: iconNew().addFill("M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-3 19h-2v-1h2zm3-2H8V5h8z").get(),
}