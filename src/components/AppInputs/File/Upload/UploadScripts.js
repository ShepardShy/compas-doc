// Добавление\Удаление изображения
export default (id, localItems, status) => {
    // Добавление изображения
    const addImage = () => {
        let downloadingItem = {
            id: id,
            name: "Загрузка",
            url: null,
            file: null,
            extension: '',
            status: 'loading'
        }

        localItems.value.splice(localItems.value.length - 1, 0, downloadingItem);
    }

    // Удаление изображения
    const deleteImage = () => {
        localItems.value = localItems.value.filter(image => Object.keys(image).length === 0 || image.id !== id)
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


