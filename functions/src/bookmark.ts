let numberOfProperties = 3; // TODO: get that automatically

export interface IBookmark {
    name: string,
    url: string,
    category: string
};

export function isEmpty(prop: string) : boolean {
    var empties = /^\s*$/g;
    return empties.exec(prop) !== null;
}

export function isValid(b: IBookmark) : boolean {
    return  !isEmpty(b.name) && 
            !isEmpty(b.url) && 
            !isEmpty(b.category) &&
            Object.keys(b).length === numberOfProperties;
}

export function isSearchable(b: IBookmark) : boolean {
    if (Object.keys(b).length > 1) {
        return false;
    }
    // TODO: can do better...
    return Object.keys(b)[0] === "name" || Object.keys(b)[0] === "category"
}