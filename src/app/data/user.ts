export interface registeruser{
    photo:File,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    lastSeen:string,
    verifcationcode:string
}
export interface user{
    photo?:string,
    firstName:string,
    lastName:string,
    email:string,
    lastSeen:string
}
export interface loginUser{
    email:string,
    password:string,
}