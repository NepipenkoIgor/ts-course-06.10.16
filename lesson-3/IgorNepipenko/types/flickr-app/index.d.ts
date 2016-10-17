declare type opt = {
    elem: HTMLElement;
    uri: string;
    queryMethod: string;
    apiKey: string;
};
interface IPhoto {
    farm: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
}
