interface typeProps {
    [key: string]: string | number;
}

// 用户
export interface IUser {
    id?: number | string;
    account?: string;
    userName?: string;
    userMobile: string;
    userEmail?: string;
    userImage?: string;
    sex?: number | string;
    workPhone?: string;
    [propName: string]: any;
}
