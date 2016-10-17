type TMenuItem = {title: string, id?: string, items?: TMenuItem[]};
type TMenuList = TMenuItem[];

enum EAction {toggle, open, close}

interface IMenu {
  getElem(): HTMLElement;
  toggle(id: string): void;
  open(id: string): void;
  close(id: string): void;
}

interface IDOMStringMapAction extends DOMStringMap {
  action: string;
}

class Menu implements IMenu {
  private _element: HTMLElement;

  public constructor(menu: TMenuList, element: HTMLElement) {
    this._element = element;
    this._element.innerHTML = this.make(menu);
    this._element.onclick = this.handleClick;
  };

  private make(menu: TMenuList): string {
    let result: string = '<ul>';

    menu.forEach(item => {
      result += `<li>
<a ${item.items ? 'class="title"' : ''}
${item.id ? ' id="' + item.id + '"' : ''}>${item.title}</a>
${item.items ? this.make(item.items) : ''}</li>`;
    });

    return `${result}</ul>`;
  }

  private static doAction(action: EAction, evOrId: MouseEvent | string): void {
    let element: HTMLAnchorElement | null = null;

    if (typeof evOrId === 'string') {
      element = <HTMLAnchorElement>document.getElementById(evOrId);
    }

    if (evOrId instanceof MouseEvent) {
      element = <HTMLAnchorElement>evOrId.target;
    }

    if (!element) {
      return;
    }

    const classList = element.classList;

    if (classList.contains('title')) {
      const classMenu = 'menu-open';
      const parentLi = <HTMLLIElement>element.parentNode;

      switch (action) {
        case EAction.toggle:
          parentLi.classList.toggle(classMenu);
          break;
        case EAction.open:
          parentLi.classList.add(classMenu);
          break;
        case EAction.close:
          parentLi.classList.remove(classMenu);
          break;
      }
    }
  }

  private handleClick = (ev: MouseEvent) => {
    Menu.doAction(EAction.toggle, ev);
  };

  public getElem(): HTMLElement {
    return this._element;
  }

  public toggle(id: string): void {
    Menu.doAction(EAction.toggle, id);
  }

  public open(id: string): void {
    Menu.doAction(EAction.open, id);
  }

  public close(id: string): void {
    Menu.doAction(EAction.close, id);
  }
}

class ButtonActions {
  private _menu: Menu;

  public constructor(menu: Menu, element: HTMLElement) {
    this._menu = menu;

    element.innerHTML = ButtonActions.make();
    element.onclick = this.handleClick;
  }

  private static make(): string {
    return `
<button data-action="toggle">toggle Рыбы</button>
<button data-action="open">open Рыбы</button>
<button data-action="close">close Рыбы</button>
`;
  }

  private handleClick = (ev: MouseEvent) => {
    const id = 'fish';
    const {action} = (
      <IDOMStringMapAction>(<HTMLAnchorElement>ev.target).dataset
    );

    if (!action) {
      return;
    }

    switch (action) {
      case 'toggle':
        this._menu.toggle(id);
        break;
      case 'open':
        this._menu.open(id);
        break;
      case 'close':
        this._menu.close(id);
        break;
    }
  };
}

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
    id: 'fish',
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

const menu = new Menu(MENU, <HTMLElement>document.querySelector('.menu'));
const actions = new ButtonActions(
  menu,
  <HTMLElement>document.querySelector('.actions')
);
