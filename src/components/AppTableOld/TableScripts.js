import tableStoreOther from "@/stores/tableStoreScripts/tableStoreOther"

export default {
    setDefaultWidth(table, tableStore, selector) {
        let node = table.querySelectorAll(selector)
        for (let field of tableStore.tableKeysFiltered) {
            for (let cell of node) {
                if (cell.getAttribute('data-key') == field.key) {
                    this.setCellWidth(cell, field.width)
                }
            }
        }
    
        this.setStoreTableKeysMargin(table, tableStore)
    },

    // Установка ширины перемещаемой ячейки
    setCellWidth(cell, width) {
        if (typeof width == 'string') {
            width = Number(width.replace('px', ''))
        }
        cell.style.setProperty("--defaultWidth", `${width.toFixed(2)}px`)
    },

    // Установка отступа для фиксированной ячейки
    setStoreTableKeysMargin(table, tableStore) {
        if (table != null) {
            let differense = 0
            let cells = table.querySelectorAll('thead th') 
            for (let cell of cells) {
                let element = getTableKey(cell, tableStore)
                if (element != undefined) {
                    if (cell.classList.contains('table__item_fixed')) {
                        element.fixTarget = `${differense}px`
                        differense += cell.offsetWidth
                    } else {
                        element.isSticky = false
                        element.fixTarget = `0px`
                    }
                }
            }
        }
    },

    // Установка ширины для стора
    setStoreWidth(tableHeader, tableStore) {
        let cells = tableHeader.querySelectorAll('.table__item')
        for (let cell of cells) {
            setStoreTableKeysWidth(tableStore, cell)
        }
    },

    // Установка изначального положения ячеек если ширина таблицы меньше секции
    setCellsWidthDefference(tableHeader, sectionBody, state) {
        let changingCell = tableHeader.querySelector('th.changeWidth')
        let cells = tableHeader.querySelectorAll('th:not(.changeWidth)')
        let widthData = null

        if (state == 'equal') {
            widthData = getProportionalСellsEqual(cells, sectionBody)
        } else {
            widthData = getProportionalСells(cells, tableHeader, sectionBody)
        }

        widthData = updateWidth(changingCell, widthData, sectionBody)

        for (let i = 0; i <= cells.length - 1; i++) {
            this.setCellWidth(cells[i], widthData[i])
            this.setVisibleTitle(cells[i])
        }
    },

    // Установка ширины из сохраненных значений
    setDefaultStoreWidth(tableHeader, tableStore) {
        let cells = tableHeader.querySelectorAll('.table__item')
        for (let cell of cells) {
            setStoreTableKeysWidthDefault(cell, tableStore)
        }
    },

    // Установка изначального положения ячеек если ширина таблицы меньше секции
    setStoreCellsWidthDefference(tableHeader, sectionBody, tableStore) {
        let cells = tableHeader.querySelectorAll('th:not(.changeWidth)')
        let widthData = getStoreProportionalСells(cells, tableHeader, sectionBody, tableStore)

        for (let i = 0; i <= cells.length - 1; i++) {
            this.setCellWidth(cells[i], widthData[i])
            this.setVisibleTitle(cells[i])
        }
    },

    // Установка видимости заголовка у ячейки
    setVisibleTitle(event) {
        let span = event.querySelector('span') ?? event.querySelector('.form-item__title')
        if (event.offsetWidth <= 55) {
            span.style.display = 'none'
        } else {
            span.style.display = 'block'
        }
    },

    getSummaryWidth(cells) {
        let summaryWidth = 0
        for (let cell of cells) {
            summaryWidth += Number(cell.width.replace('px', ''))
        }
        return summaryWidth
    }
}

// Получение ширин для клеток
const getProportionalСells = (cells, tableHeader, sectionBody) => {
    let widthData = []
    for (let cell of cells) {
        let part = getWidthPercent(cell)
        let width = getPartWidth(part.toFixed(2))
        widthData.push(width)
    }

    return widthData

    // Нахождение доли ячейки в секции
    function getWidthPercent(cell) {
        return cell.offsetWidth * 100 / tableHeader.offsetWidth
    }

    // Нахождение пикселей для ячейки 
    function getPartWidth(part) {
        return sectionBody.offsetWidth * part / 100
    } 
}

const getProportionalСellsEqual = (cells, sectionBody) => {
    let widthData = []

    for (let cell of cells) {
        widthData.push((sectionBody.offsetWidth / cells.length).toFixed(2))
    }
    
    // return widthData
}

// Получение ширин для клеток
const getStoreProportionalСells = (cells, tableHeader, sectionBody, tableStore) => {
    let widthData = []
    let summaryWidth = getSummaryWidth(cells)

    for (let cell of cells) {
        let field = tableStoreOther.findTableFilteredKey(cell.getAttribute('data-key'), 'key', tableStore)
        let part = getWidthPercent(field, summaryWidth)
        let width = getPartWidth(part.toFixed(2))
        widthData.push(width)
        field.width = `${width.toFixed(2)}px`
    }

    return widthData

    function getSummaryWidth(cells) {
        let summaryWidth = 0
        for (let cell of cells) {
            let item = tableStoreOther.findTableFilteredKey(cell.getAttribute('data-key'), 'key', tableStore)
            summaryWidth += Number(item.width.replace('px', ''))
        }
        return summaryWidth
    }

    // Нахождение доли ячейки в секции
    function getWidthPercent(field, summaryWidth) {
        return field.width.replace('px', '') * 100 / summaryWidth
    }

    // Нахождение пикселей для ячейки 
    function getPartWidth(part) {
        return sectionBody.offsetWidth * part / 100
    } 
}

// Установка ширины блока в связке с хранилищем
const setStoreTableKeysWidth = (tableStore, cell) => {
    let element = getTableKey(cell, tableStore)
    element.width = `${cell.offsetWidth.toFixed(2)}px`
}

const setStoreTableKeysWidthDefault = (cell, tableStore) => {
    let element = getDefaultTableKey(cell, tableStore)
    cell.style.setProperty("--defaultWidth", element.width)
}

// Получение ключа таблицы
const getTableKey = (cell, tableStore) => {
    return tableStore.tableKeysFiltered.find(item => item.key == cell.getAttribute('data-key'))
}

const getDefaultTableKey = (cell, tableStore) => {
    return tableStore.tableKeysBackup.find(item => item.key == cell.getAttribute('data-key'))
}

const updateWidth = (changingCell, array, sectionBody) => {
    let summaryWidth = changingCell == null ? 0 : changingCell.offsetWidth
    for (let i = 0; i <= array.length - 1; i++) {
        summaryWidth += array[i]
    }

    if (summaryWidth < sectionBody.offsetWidth) {
        array[array.length - 1] += sectionBody.offsetWidth - summaryWidth
    } 

    return array
}