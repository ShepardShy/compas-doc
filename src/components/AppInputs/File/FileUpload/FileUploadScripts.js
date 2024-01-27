// Добавление\Удаление изображения
export default (uid, localItems, status) => {
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

        localItems.splice(localItems.length - 1, 0, downloadingItem);
    }

    // Удаление изображения
    const deleteImage = () => {
        localItems = localItems.filter(image => Object.keys(image).length === 0 || image.uid !== uid)
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


