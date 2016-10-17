// Улучшить flickr app
//
// * 1. Избавтесь от `any`
//
// 2. Сортируйте фото по title
//
// 2.1 можете добавить debounce click
// на search( lodash) и сортировку по имени или названию
//
// 3. Реализуйте возможность отображение имени пользователя,
// которому пренадлежит фото
//   `${this.uri}method=flickr.people.getInfo&
//             api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`
//
// используйте  -> Promise / Q library
//
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts
//
//`${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
//
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: '7fbc4d0fd04492d32 fa9a2f718c6293e'
//
// interface Request {
//   method: string;
//   url: string;
//   context: string;
// }
//
// interface RequestInit {
//   mode: string;
//   method: string;
// }
//
// declare let Request: {
//   prototype: Request;
//   new (input: string|Request, init: RequestInit): Request;
// };
//
// interface ResponseInit {
//   status: string;
//   statusText: string;
// }
//
// interface ResponseBody {
//   blob: Blob;
//   formData: FormData
// }
//
// declare let Response: {
//   prototype: Response;
//   new (input: ResponseBody, init: ResponseInit): Response;
// };

interface IFlickrPhoto {
  farm: number;
  id: string;
  isfamily: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string
}

interface IFlickrResponse {
  stat: string,
  photos: {
    photo: IFlickrPhoto[]
  }
}

interface IFetchResponse {
  ok: boolean,
  json: () => Promise<IFlickrResponse>
}

declare function fetch(input: string): Promise<IFetchResponse>

type TFlickrOpt = {
  elem: HTMLElement,
  sortElement: HTMLSelectElement,
  uri: string,
  queryMethod: string,
  apiKey: string
}

enum EOrderBy {title, user}

class Flickr {
  protected elem: HTMLElement;
  private sortElement: HTMLSelectElement;
  protected uri: string;
  protected queryMethod: string;
  protected apiKey: string;

  protected input: HTMLInputElement;
  protected searchButton: HTMLButtonElement;
  protected imagesBox: HTMLDivElement;
  private photos: IFlickrPhoto[];

  private orderBy: EOrderBy;

  public constructor(opt: TFlickrOpt) {
    Object.assign(this, opt);

    this.orderBy = EOrderBy.title;

    this.input = <HTMLInputElement>this.elem.querySelector(".flickr-search-input");
    this.imagesBox = <HTMLDivElement>this.elem.querySelector(".image-area");
    this.searchButton = <HTMLButtonElement>this.elem.querySelector(".flickr-search-button");

    this.searchButton.addEventListener('click', this.handleSearch);
    this.sortElement.addEventListener('change', this.handleSortChange)
  }

  private render(): void {
    let content = '';

    for (let photo of this.photos) {
      content += `
<div class='image-box'>
  <div class='caption'>
    <span>Title: ${photo.title}</span>
    <br>
    <span>Owner: ${photo.owner}</span>
  </div>
<img src='https://farm${photo.farm}
.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg'/>
</div>`
    }

    this.imagesBox.innerHTML = content;
  }

  private sort(): void {
    this.photos.sort((a: IFlickrPhoto, b: IFlickrPhoto): number => {
      // TODO: Write generic for it
      if (this.orderBy === EOrderBy.title) {
        if (a.title > b.title) {
          return 1
        } else if (a.title < b.title) {
          return -1;
        }

        return 0;
      }

      if (this.orderBy === EOrderBy.user) {
        if (a.owner > b.owner) {
          return 1
        } else if (a.owner < b.owner) {
          return -1;
        }

        return 0;
      }

      return 0;
    })
  }

  private handleSortChange = (): void => {
    this.orderBy = <EOrderBy>this.sortElement.selectedIndex;
    this.sort();
    this.render();
  };

  private handleSearch = (): void => {
    const text: string = this.input.value.trim();

    if (!text) {
      return;
    }

    const url = `${this.uri}method=${this.queryMethod}
&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`;

    this.fetchPhotos(url);
  };

  private fetchPhotos(input: string): void {
    fetch(input)
    .then((res: IFetchResponse): Promise<IFlickrResponse> => {
      if (!res.ok) {
        throw new Error("'can't load photos")
      }

      return res.json();
    })
    .then((res: IFlickrResponse) => {
      this.photos = res.photos.photo;
      this.sort();
      this.render();
    });
    // .catch() // TODO: add catch
  }
}

const sortElement: HTMLSelectElement | null =
        <HTMLSelectElement>document.getElementById('sort');

const flickr = new Flickr({
  elem: <HTMLDivElement>document.querySelector('.flikr-box'),
  sortElement: sortElement,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});
