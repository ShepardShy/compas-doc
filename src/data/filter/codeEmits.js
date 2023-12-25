export default {
    '@actionFilter': {
        action: 'actionFilter', 
        value: [
            {
                /* Поиск по фильтру */
                search: {
                    field_key: null,
                    field_key_2: null
                },

                /* Удаление сохраненного фильтра */
                delete: 'id',

                /* Cохранение нового фильтра */
                create: {
                    id: 0,
                    sort: 2,
                    is_new: true,
                    is_hidden: 0,
                    title: "Title",
                    fields: [
                        {
                            id: 1,
                            key: "field_key",
                            value: null
                        }
                    ],
                    requestFields: {
                        field_key: null
                    }
                },

                /* Обновление сохраненного фильтра */
                update: {
                    id: 0,
                    sort: 2,
                    is_hidden: 0,
                    title: "Title",
                    fields: [
                        {
                            id: 1,
                            key: "field_key",
                            value: null
                        }
                    ],
                    requestFields: {
                        field_key: null
                    }
                },

                /* Смена сортировки сохраненных фильтров */
                sort: ['id_1', 'id_3', 'id_3']
            }
        ]
    }
}