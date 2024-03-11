export default {
    // Основная информация
    "detail": {
        // Секции
        "columns": {
            "column_1": [
                {
                    "id": 281,
                    "name": "Секция",
                    "fields": [
                        {
                            "id": 1,
                            "key": null,
                            "type": "text",
                            "title": "Строка",
                            "value": null,
                            "can_edit": 1,
                            "unit": "",
                            "mask": "",
                            "options": [],

                            "roles_read": [],
                            "roles_write": [],
                            "has_roles_read": 1,
                            "has_roles_write": 1,
                            
                            "set_color": 1,
                            "color": "#000",
                            
                            "visible_always": 1,
                            "is_plural": 0,
                            "is_external_link": 0,

                            "required": 0,
                            "permanent_name": 1,
                            "permanent_required": 1,
                            "is_permanent": null,

                            "module": null,
                            "used_in_modules": []
                        }
                    ]
                }
            ],
            "column_2": [
                {
                    "id": 281,
                    "name": "Секция",
                    "fields": []
                }
            ]
        },
        // Таблица продуктов
        "products": {
            "table": [
                {
                    "id": null,
                    "title": "Перетаскивание",
                    "key": "iconDrag",
                    "width": "40px",
                    "enabled": 1,
                    "sort_order": null,
                    "type": "iconDrag",
                    "fixed": null,
                    "index": 0,
                    "fixTarget": "0px",
                    "read_only": 1,
                    "mask": null
                },
                {
                    "id": 2036,
                    "title": "ID",
                    "key": "id",
                    "width": "67px",
                    "enabled": true,
                    "sort_order": "desc",
                    "type": "number",
                    "is_plural": 0,
                    "external_link": null,
                    "is_external_link": 0,
                    "is_link": 0,
                    "required": 1,
                    "fixed": null,
                    "index": 1,
                    "fixTarget": "0px",
                    "read_only": 1,
                    "unit": null,
                    "mask": null,
                    "can_edit": 1,
                    "color": null,
                    "is_hidden": 0,
                    "visible_always": 1,
                    "options": []
                }
            ],
            "data": []
        }
    },
    // Плашки
    "menu": [
        {
            "id": 0,
            "title": "Общие",
            "tab": "order",
            "enabled": true,
        },
        {
            "id": 2,
            "title": "Товары и услуги",
            "tab": "products",
            "enabled": true,
        },
        {
            "id": 3,
            "title": "Клиенты",
            "tab": "client_id",
            "slug": "clients",
            "enabled": true,
        },
        {
            "id": 1,
            "title": "История изменений",
            "tab": "history",
            "enabled": true,
        }
    ],
    // История
    "history": {
        "data": [
            {
                "id": 24266,
                "event": "FIELD_UPDATED",
                "date": "2024-03-06",
                "created_at": "14:59:52",
                "field": {
                    "title": "Поле 1",
                    "prev_value": "Старый <b> текст </b>",
                    "next_value": "Новый текст"
                },
                "user": {
                    "id": 1,
                    "ab": "ДП",
                    "name": "Денис Потемкин",
                    "color": "linear-gradient(to bottom, #ee9090 2%, #6765dd 100%)",
                    "icon": "https://compas.pro/storage/thumbnails/default/i0/t4/ekc3cm8gw8ogcs0s40wo.jpg"
                }
            }
        ],
        "last_page": 2,
        "per_page": 20,
        "current_page": 1
    }
}