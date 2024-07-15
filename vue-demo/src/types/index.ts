
// 用户
export interface IUser {
    id?: number | string,
    account?: string,
    userName?: string,
    userMobile: string,
    userEmail?: string,
    userImage?: string,
    sex?: number | string,
    workPhone?: string,
    [propName: string]: any,
}

// 菜单
export interface IMenu {
    id?: string | number,
    menuName?: string,
    children?: IMenu[],
    [propName: string]: any,
}