export default {
    '@callAction': [
        {
            action: 'getTableData', 
            value: {
                "sortItem": {
                    "key": "id",
                    "order": "desc"
                },
                "footerData": {
                    "pages": 1,
                    "activePage": 1,
                    "count": 50
                }
            }
        },
        {
            action: 'downloadExcel',
            value: [
                {
                    "id": 105,
                    "title": "Название",
                    "key": "name",
                    "width": "368px",
                    "enabled": true,
                    "sort_order": "desc",
                    "type": "text",
                    "is_plural": 0,
                    "external_link": "https://avixo.ru/logistics",
                    "is_external_link": 1,
                    "is_link": 0,
                    "required": 1,
                    "fixed": null,
                    "index": 0,
                    "fixTarget": "0px",
                    "read_only": 0,
                    "unit": "",
                    "mask": "",
                    "can_edit": 0,
                    "color": "",
                    "is_hidden": 0,
                    "visible_always": 1,
                    "options": []
                }
            ]
        },
        {
            action: 'saveFields', 
            value: {
                role: 'all',
                fields: [
                    {
                        "id": 105,
                        "title": "Название",
                        "key": "name",
                        "width": "368px",
                        "enabled": true,
                        "sort_order": "desc",
                        "type": "text",
                        "is_plural": 0,
                        "external_link": "https://avixo.ru/logistics",
                        "is_external_link": 1,
                        "is_link": 0,
                        "required": 1,
                        "fixed": null,
                        "index": 0,
                        "fixTarget": "0px",
                        "read_only": 0,
                        "unit": "",
                        "mask": "",
                        "can_edit": 0,
                        "color": "",
                        "is_hidden": 0,
                        "visible_always": 1,
                        "options": []
                    }
                ]
            } 
        },
    ]
    
}