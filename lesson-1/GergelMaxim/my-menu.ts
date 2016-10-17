type MenuList = { title: string, items?: MenuList }[];

let menuList: MenuList =
    [
        {
            title: 'Животные',
            items: [
                {
                    title: 'Млекопитающие',
                    items: [
                        {title: 'Коровы'},
                        {title: 'Ослы'},
                        {title: 'Собаки '},
                        {title: 'Тигры'}
                    ]
                },
                {
                    title: 'Другие',
                    items: [
                        {title: 'Змеи'},
                        {title: 'Птицы'},
                        {title: 'Ящерицы'}
                    ],
                },
            ]
        },
        {
            title: 'Рыбы',
            items: [
                {
                    title: 'Аквариумные',
                    items: [
                        {title: 'Гуппи'},
                        {title: 'Скалярии'}
                    ]
                },
                {
                    title: 'Форель',
                    items: [
                        {title: 'Морская форель'}
                    ]
                },
            ]
        }
    ];

function generateMenu(list: MenuList): string {
    if (typeof list === 'undefined') return '';

    let z: string = `<ul>`;
    for (let a of list) {
        z += `<li><a class="title">${a.title}</a>${generateMenu(a.items)}</li>`;
    }

    return `${z}</ul>`;
}

const navMenuList: HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev: MouseEvent) => {
    const el : HTMLAnchorElement = ev.target as HTMLAnchorElement;
    const classList : DOMTokenList = el.classList;
    if (classList.contains('title')) {
        const parentLi : HTMLElement = el.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open');
    }
}
