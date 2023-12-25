export default {
    // Закрытие выпадающего списка
    hideDetails(element) {
        switch (element) {
            // Вывод в консоль, если элемент не был получен
            case null:
                console.error('Element not found');
                break;
            // Вывод в консоль, если элемент не был получен
            case undefined:
                console.error('Element not found');
                break;
            // Удаление у всех элементов
            case 'All':
                let data = document.querySelectorAll('.popup')
                data.forEach(element => {
                    element.removeAttribute('open')
                });
                break
            // Удаление у определенного элемента 
            default:
                element.removeAttribute('open')
            break;
        }

    }
}