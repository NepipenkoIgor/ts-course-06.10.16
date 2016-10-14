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

  menu.forEach(item => {
    result += `<li>
<a ${item.items ? 'class="title"' : ''}>${item.title}</a>
${item.items ? makeMenu(item.items) : ''}</li>`;
  });

  return `${result}</ul>`;
}

const menuElement: HTMLDivElement =
        <HTMLDivElement>document.querySelector('.menu');

menuElement.innerHTML = makeMenu(MENU);

menuElement.onclick = (ev: MouseEvent) => {
  const element = <HTMLAnchorElement>ev.target;
  const classList = element.classList;

  if (classList.contains('title')) {
    const parentLi = <HTMLLIElement>element.parentNode;
    parentLi.classList.toggle('menu-open');
  }
};
