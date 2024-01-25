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

        // Изменение позиций картинок
        const changePositionImage = () => {
            // let section = selectedObjectOther.findSection(localStore, 'id', data.section.id)
            // selectedObjectOther.addSelectedItems(localStore, 'selectedItems', 'id', field)
            //
            // field.value = data.value.value.arr
            // field.state = section.state = localStore.state = 'edit'
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


