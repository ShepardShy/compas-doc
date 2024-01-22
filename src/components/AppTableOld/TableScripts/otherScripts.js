import commonScripts from '~/helpers/commonScripts';

export default {
    // Очистка ячейки от выделения
    clearSelections(localTarget, event) {
        if (localTarget !== event.target.closest('.table__item')) {
            commonScripts.clearSelection()
        }
    },

    // Смена индексов при нажатии на элемент
    changePositionElems(event, tableItemRef, table = null) {
        this.clearClickedItems(table)
        if (event.target && event.target.closest('details') != null || !event && tableItemRef.querySelector('.form__item_datepicker')) {
            tableItemRef.classList.add('table__item_clicked')
        }
    },

    // Снятие со всех блоков класса клика
    clearClickedItems(table = null, event = null) {
        if (event && event.target.closest('.icon__delete')) return

        if (table == null) {
            table = document.querySelectorAll('table')
            
            for (let elem of table) {
                elem.querySelectorAll('.table__item_clicked').forEach(elem => {
                    elem.classList.remove('table__item_clicked')
                })
            }
        } else {
            table.querySelectorAll('.table__item_clicked').forEach(elem => {
                elem.classList.remove('table__item_clicked')
            })
        }
    }
}
