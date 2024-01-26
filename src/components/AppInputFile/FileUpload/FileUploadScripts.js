export default {
    changeFile(uid, localItems, status) {
        // Добавление изображения
        const addImage = () => {
            let downloadingItem = {
                id: uid,
                name: "Загрузка",
                url: null,
                file: null,
                extension: '',
                sort: 0,
                uid: uid,
                status: 'loading'
            }

            // Вставляем новый элемент перед последним элементом
            localItems.splice(localItems.length - 1, 0, downloadingItem);

            // field.preview = await valuesScripts(null, field)
        }

        // Удаление изображения
        const deleteImage = () => {
            localItems = localItems.filter(image => image.uid != data.value.uid)
        }

        switch (status) {
            // Предзагрузка
            case 'ready':
                addImage()
                break;
            // Ошибка загрузки
            case 'fail':
                deleteImage()
                break;
            // Успешная загрузка
            default:
                break;
        }

    }
}


