interface IUserInfo {
  username: string;
  profileurl: string;
}

interface IFlickrPhoto {
  farm: number;
  id: string;
  isfamily: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
  user: IUserInfo;
}

interface IFlickrPhotoResponse {
  stat: string;
  photos: {
    photo: IFlickrPhoto[]
  };
}

interface IFlickrUserResponse {
  person: {
    username: {
      _content: string;
    },
    profileurl: {
      _content: string;
    }
  };
}

interface IFetchResponse {
  ok: boolean;
  json: () => Promise<IFlickrPhotoResponse | IFlickrUserResponse>;
}

declare function fetch(input: string): Promise<IFetchResponse>

type TFlickrOpt = {
  searchDivElement: HTMLDivElement,
  apiKey: string
}

enum EOrderBy {title, user}

const URI: string = 'https://api.flickr.com/services/rest/?';

class Flickr {
  private static readonly uri: string = URI;
  private apiKey: string;
  private searchInputElement: HTMLInputElement;
  private searchButtonElement: HTMLButtonElement;
  private sortElement: HTMLSelectElement;
  private imagesElement: HTMLDivElement;
  private orderBy: EOrderBy;
  private photos: IFlickrPhoto[];

  public constructor(opt: TFlickrOpt) {
    this.apiKey = opt.apiKey;
    this.orderBy = EOrderBy.title;
    this.photos = [];
    this.bindElements(opt.searchDivElement);
    this.addEventListeners();
  }

  private bindElements(searchDivElement: HTMLDivElement): void {
    this.searchInputElement = <HTMLInputElement>searchDivElement
    .querySelector('.flickr-search-input');
    this.imagesElement = <HTMLDivElement>searchDivElement
    .querySelector('.image-area');
    this.searchButtonElement = <HTMLButtonElement>searchDivElement
    .querySelector('.flickr-search-button');
    this.sortElement = <HTMLSelectElement>searchDivElement
    .querySelector('.flickr-sort-select');
  }

  private addEventListeners(): void {
    this.searchButtonElement.addEventListener('click', this.handleSearch);
    this.sortElement.addEventListener('change', this.handleSortChange);
    this.searchInputElement.addEventListener(
      'input', _.debounce(this.handleSearch, 1000)
    );
  }

  private render(): void {
    let content = '';

    for (let photo of this.photos) {
      content += `
        <div class='image-box'>
          <div class='caption'>
            <span>Title: ${photo.title}</span>
            <br>
            User: <a href='${photo.user.profileurl}'>${photo.user.username}</a>
          </div>
          <img src='https://farm${photo.farm}.
staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg'/>
        </div>`;
    }

    this.imagesElement.innerHTML = content;
  }

  private sort(): void {
    this.photos = _.sortBy(
      this.photos,
      this.orderBy === EOrderBy.title ? ['title'] : ['user.username']
    );
  }

  private handleSortChange = (): void => {
    this.orderBy = <EOrderBy>this.sortElement.selectedIndex;

    if (this.photos.length === 0) {
      return;
    }

    this.sort();
    this.render();
  };

  private handleSearch = (): void => {
    const text: string = this.searchInputElement.value.trim();

    if (!text) {
      return;
    }

    this.getPhotos(text)
    .then(() => {
      return this.getUsers();
    })
    .then(() => {
      this.sort();
      this.render();
    })
    .catch((err: Error) => {
      console.error(err.message);
    });
  };

  private getPhotos(text: string): Q.Promise<void> {
    const url = `${Flickr.uri}method=flickr.photos.search
&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`;

    return Q.Promise<void>(
      (resolve: () => void, reject: (err: Error) => void) => {
        fetch(url)
        .then((res: IFetchResponse): Promise<IFlickrPhotoResponse> => {
          if (!res.ok) {
            throw new Error("'can't load photos");
          }
          return res.json();
        })
        .then((res: IFlickrPhotoResponse) => {
          this.photos = res.photos.photo;
          resolve();
        })
        .catch((err: Error) => { // it's not work
          this.photos = [];
          reject(err);
        });
      });
  }

  private getUserPromise(owner: string): Q.Promise<IUserInfo> {
    const url = `${Flickr.uri}method=flickr.people.getInfo
&api_key=${this.apiKey}&user_id=${owner}&format=json&nojsoncallback=1`;

    return Q.Promise<IUserInfo>((resolve: (user: IUserInfo) => void) => {
      fetch(url)
      .then((res: IFetchResponse): Promise<IFlickrUserResponse> => {
        if (!res.ok) {
          throw new Error("'can't load user");
        }

        return res.json();
      })
      .then((res: IFlickrUserResponse) => {
        resolve({
          username: res.person.username._content,
          profileurl: res.person.profileurl._content,
        });
      });
    });
  }

  private getUsers(): Q.Promise<void> {
    return Q.Promise<void>((resolve: () => void) => {
      if (this.photos.length === 0) {
        return resolve();
      }
      const owners: string[] = [];
      const promises: Q.Promise<IUserInfo>[] = [];

      this.photos.forEach((item: IFlickrPhoto) => {
        if (!owners.includes(item.owner)) {
          owners.push(item.owner);
        }
      });

      if (owners.length === 0) {
        return resolve();
      }

      owners.forEach((item: string) => {
        promises.push(this.getUserPromise(item));
      });

      Q.all(promises)
      .then((res: IUserInfo[]) => {

        this.photos.forEach((item: IFlickrPhoto) => {
          const indexOwner = owners.indexOf(item.owner);

          item.user = {
            username: res[indexOwner].username,
            profileurl: res[indexOwner].profileurl
          };
        });

        resolve();
      });
    });
  }
}

const flickr = new Flickr({
  searchDivElement: <HTMLDivElement>document.querySelector('.flikr-box'),
  apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});
