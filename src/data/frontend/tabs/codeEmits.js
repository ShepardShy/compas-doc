export default {
    '@callAction': [
        {
            action: 'saveFields', 
            value: {
                role: 'all',
                fields: [
                    {
                        "title": "Модули",
                        "tab": "modules",
                        "enabled": 1,
                        "id": 0,
                        "childs": [
                            {
                                "title": "Штрафы ГИБДД",
                                "sort": 1,
                                "enabled": 1,
                                "id": 1,
                                "alias": "gibdd"
                            }
                        ]
                    }
                ]
            } 
        },
        {
            action: 'changeTab', 
            value: 'client_id' 
        },
    ]
}