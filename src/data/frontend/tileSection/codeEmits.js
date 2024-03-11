export default {
    '@callAction': [
        /*  Секция  */

        // Редактирование секции
        {
            action: "editSection",
            value: [
                {
                    "id": 2301,
                    "roles_read": [
                        4
                    ],
                    "roles_write": [
                        1,
                        3
                    ],
                    "set_color": 1,
                    "has_roles_read": 1,
                    "has_roles_write": 1,
                    "title": "Строка",
                    "key": "stroka_2301",
                    "type": "text",
                    "visible_always": 1,
                    "is_hidden": 0,
                    "is_plural": 0,
                    "is_external_link": 0,
                    "required": 0,
                    "read_only": 0,
                    "permanent_required": 1,
                    "permanent_name": 1,
                    "is_permanent": null,
                    "color": "#ff9300",
                    "value": "фывфывфывфыв",
                    "unit": "",
                    "module": null,
                    "mask": "",
                    "can_edit": 1,
                    "used_in_modules": []
                }
            ]
        },

        // Отслеживание состояния секции
        {
            action: "changeState",
            "value": true
        },

        // Сохранение изменения названия секции
        {
            "action": "changeSectionTitle",
            "value": {
                "id": 0,
                "title": "Первая секция"
            }
        },

        // Удаление секции
        {
            "action": "deleteSection",
            "value": 0
        },


        /*  Поле  */

        // Создание поля
        {
            "action": "createField",
            "value": {
                "options": [],
                "section_id": 0,
                "roles_read": [],
                "roles_write": [],
                "has_roles_read": 0,
                "has_roles_write": 0,
                "title": "31231231",
                "type": "text",
                "visible_always": 1,
                "is_plural": 0,
                "is_external_link": 0,
                "required": true,
                "set_color": 0,
                "color": "#000",
                "unit": null,
                "entity": "logistic_tasks"
            }
        },

        // Удаление поля
        {
            "action": "removeField",
            "value": 2301
        },

        // Скрытие поля
        {
            "action": "changeHiddenFields",
            "value": [
                {
                    "id": 2251,
                    "roles_read": [
                        4
                    ],
                    "roles_write": [
                        1,
                        3
                    ],
                    "set_color": 0,
                    "has_roles_read": 1,
                    "has_roles_write": 0,
                    "title": "Число",
                    "key": "cislo_2251",
                    "type": "number",
                    "visible_always": 1,
                    "is_hidden": 0,
                    "is_plural": 0,
                    "is_external_link": 0,
                    "external_link": "",
                    "required": 0,
                    "read_only": 0,
                    "permanent_required": 0,
                    "permanent_name": 0,
                    "is_permanent": null,
                    "color": null,
                    "value": {
                        "external_link": "",
                        "value": "34"
                    },
                    "unit": "шт.",
                    "module": null,
                    "mask": "",
                    "can_edit": 1,
                    "used_in_modules": [],
                    "focus": true
                }
            ]
        },

        // Обновление настроек поля
        {
            "action": "updateSettings",
            "value": {
                "visible_always": true,
                "id": 795
            }
        },

        // Открытие модального окна
        {
            "action": "showModal",
            "value": {
                "id": 112,
                "slug": "clients",
                "tab": null
            }
        }
    ]
}