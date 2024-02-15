export default {
    // Данные для тела и подвала таблицы
    "list": {
        // Футер таблицы
        "count": 1,
        "current_page": 1,
        "last_page": 1,
        "per_page": 25,
        "total": 1,
        "from": 1,
        "to": 1,
        // Строки таблицы
        "data": [
            {
                "number": 1120,
                "date": "2024-02-02T12:46:46.000000Z",
                "status": 524,
                "json": "<span> text </span>",
                "relation": {
                    "key": {
                        "value": [
                            8
                        ],
                        "localOptions": [
                            {
                                "label": {
                                    "id": 8,
                                    "sort": 1,
                                    "file": null,
                                    "is_hidden": 0,
                                    "field_id": 458,
                                    "color": "linear-gradient(to bottom, #aeee90 2%, #48b85a 99%)",
                                    "text": "Вадим Сыропятов"
                                },
                                "value": 8
                            }
                        ]
                    }
                },
                "select_dropdown": [
                    null,
                    "ТК, ПЭК",
                    "ТК, Почта России 1231"
                ],
                "text": {
                    "value": "фывфывф",
                    "external_link": "https://google.com"
                },
                "address": {
                    "text": "Москва",
                    "coords": [
                        "56.416794",
                        "58.532544"
                    ]
                },
                "text_is_plural": "Text \n\n\n\n\n\n continue",
                "file": [
                    {
                        "id": 1700634111214,
                        "name": "1.2.png",
                        "url": 'https://preview.png',
                        "file": 'https://image.png',
                        "extension": "png",
                        "uid": "1700634111214",
                    }
                ],
            }
        ],
        // Отображаемые кнопки в шапке страницы
        "buttons": []
    },
    // Шапка таблицы
    "table": [
        {
            "id": 798,
            "title": "ID",
            "key": "id",
            "width": "88px",
            "enabled": true,
            "sort_order": "desc",
            "type": "number",
            "is_plural": 0,
            "external_link": "",
            "is_external_link": 0,
            "is_link": 0,
            "required": 1,
            "fixed": null,
            "index": 2,
            "fixTarget": "0px",
            "read_only": 1,
            "unit": "",
            "mask": "",
            "can_edit": 0,
            "color": "#109054ff",
            "is_hidden": 0,
            "visible_always": 1,
            "options": []
        },
    ],
    // Поля для фильтров
    "fields": {
        "id": {
            "id": 798,
            "title": "ID",
            "type": "number",
            "read_only": 1,
            "can_edit": 0,
            "color": "#109054ff",
            "is_plural": 0,
            "required": 1
        },
    },
    // Отображение плашек закрытия в модальном окне
    "entities": [
        {
            "slug": "users",
            "display_name_singular": "Пользователь",
            "display_name_plural": "Пользователи",
            "color": "#13A276"
        }
    ],
    // Роли
    "roles": [
        {
            "id": 1,
            "label": "Администратор",
            "value": 1,
            "is_admin": 1,
            "is_permanent": 1
        }
    ],
    // Данные активного пользователя
    "profile": {
        "id": 1,
        "role_id": "1",
        "name": "Денис",
        "email": "denis@opt6.ru",
        "avatar": null,
        "last_name": "Потемкин",
        "token": null,
        "color": "linear-gradient(to bottom, #ee9090 2%, #6765dd 100%)",
    },
    // Меню
    "sidebar": [
        {
            "id": 1,
            "name": "Задачи логистики",
            "slug": "logistic_tasks",
            "sort": 0,
            "link": "/objects/logistic_tasks",
            "is_hidden": 0,
            "enabled": 1,
            "children": []
        }
    ],
    // Сохраненные фильтры
    "filters": [
        {
            "id": 325,
            "title": "Фильтр 2",
            "sort": 0,
            "is_hidden": null,
            "fields": [
                {
                    "id": 798,
                    "title": "ID",
                    "key": "id",
                    "type": "number",
                    "options": [],
                    "value": "132723"
                }
            ]
        },
    ],
    // Категории
    "categories": []
}