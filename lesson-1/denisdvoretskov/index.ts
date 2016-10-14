type TMenuItem = {title: string, items?: TMenuItem[]};
type TMenuList = TMenuItem[];

const MENU: TMenuList = [
  {
    title: 'Животные',
    items: [
      {
        title: 'Млекопитающие',
        items: [
          {title: 'Коровы'},
          {title: 'Ослы'},
          {title: 'Собаки'},
          {title: 'Тигры'}
        ]
      },
      {
        title: 'Другие',
        items: [
          {title: 'Змеи'},
          {title: 'Птицы'},
          {title: 'Ящерицы'},
        ],
      },
    ]
  }, {
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

function makeMenu(menu: TMenuList): string {
  let result: string = '<ul>';

  for (let item of menu) {
    result += '<li>' +
      `<a ${item.items ? 'class="title"' : ''}>${item.title}</a>` +
      `${item.items ? makeMenu(item.items) : ''}</li>`;
  }

  return result + '</ul>';
}

const menuElement: HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;

menuElement.innerHTML = makeMenu(MENU);

menuElement.onclick = (ev: MouseEvent) => {
  const element = ev.target as HTMLAnchorElement;
  const classList = element.classList;

  if (classList.contains('title')) {
    const parentLi = element.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open');
  }
};

// TODO: Add linter
