var menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки ' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' }
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
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];
function generateMenu(list) {
    if (typeof list === 'undefined')
        return '';
    var z = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        z += "<li><a class=\"title\">" + a.title + "</a>" + generateMenu(a.items) + "</li>";
    }
    return z + "</ul>";
}
var navMenuList = document.querySelector('.menu');
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = function (ev) {
    var el = ev.target;
    var classList = el.classList;
    if (classList.contains('title')) {
        var parentLi = el.parentNode;
        parentLi.classList.toggle('menu-open');
    }
};
