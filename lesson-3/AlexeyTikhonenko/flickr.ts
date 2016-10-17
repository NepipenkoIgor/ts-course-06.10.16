// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts

//`${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`

// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'AlexeyTikhonenko.photos.search',
//     apiKey: '7fbc4d0fd04492d32 fa9a2f718c6293e'

interface RequestInit {
    mode: string;
    method: string;
}


interface Request {
    method: string;
    url: string;
    context: string;
}

declare let Request: {
    prototype: Request;
    new (input: string|Request, init: RequestInit): Request;
};


interface ResponseInit {
    status: string;
    statusText: string;
}

interface ResponseBody {
    blob: Blob;
    formData: FormData
}
interface Response {
    blob: ()=> Promise<Blob>
    formData: ()=> Promise<FormData>
    json: ()=>any;
}

declare let Response: {
    prototype: Response;
    new (input: ResponseBody, init: ResponseInit): Response;
};


declare function fetch(input: string|Request): Promise<Response>


type opt={
    elem: HTMLElement;
    uri: string;
    queryMethod: string;
    apiKey: string;
}

interface IPhoto {
    farm: number;
    id: string;
    isfamily: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string
}

type personInfo = {person: {username: {_content: string}}};
type photosInfo = {photos: {photo: IPhoto[]}};
type renderCb = (body: photosInfo) => void;


class Flickr {
    protected elem: HTMLElement;
    protected input: HTMLInputElement;
    protected searchButton: HTMLButtonElement;
    protected imagesBox: HTMLDivElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;

    protected photos: IPhoto[];

    public constructor(opt: opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.queryMethod = opt.queryMethod;
        this.apiKey = opt.apiKey;

        this.input = <HTMLInputElement>this.elem.querySelector(".flickr-search-input");
        this.imagesBox = <HTMLDivElement>this.elem.querySelector(".image-area");
        this.searchButton = <HTMLButtonElement>this.elem.querySelector(".flickr-search-button");
        this.searchButton.addEventListener('click', _.debounce(this.search.bind(this, this.render.bind(this)), 400));
    }


    protected render(body: photosInfo): void {
        this.photos = body.photos.photo;
        this.photos.sort((a: IPhoto, b: IPhoto): number => {
            if (a.title > b.title) {
                return 1;
            }

            return -1;
        });

        this.imagesBox.innerHTML = "";
        for (let photo of this.photos) {
            //Добавим элемент с фото на страницу
            let photoElem:HTMLElement = document.createElement("div");
            photoElem.className = "image-box";
            photoElem.innerHTML = `<img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
                                   <p>Название: ${photo.title}</p>`;
            this.imagesBox.insertAdjacentElement("beforeEnd", photoElem);

            //Асинхронно добавим автора фотки в блок с фоткой
            let url:string = `${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`;
            fetch(url)
                .then((response: Response): Promise<personInfo> => response.json())
                .then((body: personInfo) => {
                    let author: string = `<p>Автор: ${body.person.username._content}</p>`;
                    photoElem.insertAdjacentHTML("beforeEnd", author);
                });
        }
    }


    protected search(cb: renderCb): void {
        if (!this.input.value) {
            return;
        }
        let text:string = this.input.value;
        let url:string = `${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
        this.getPhoto(url, cb)
    }


    protected getPhoto(input: string|Request, cb: renderCb): void {
        fetch(input)
            .then((response: Response): Promise<photosInfo> => response.json())
            .then(cb)
    }
}

let elem = document.querySelector('.flikr-box') as HTMLDivElement;

let flickr = new Flickr({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});