import {FlikrAppAsModuleHomework} from './flikr';

import {config} from './config';
import {getPhoto} from './fetchEvent';

let elem = <HTMLElement>document.querySelector('.flikr-box');
let flickr = new FlikrAppAsModuleHomework({
    elem: elem,
    uri: config.uri,
    queryMethod: 'flickr.photos.search',
    apiKey: config.apiKey
});
flickr.setSearchHandler = getPhoto;
