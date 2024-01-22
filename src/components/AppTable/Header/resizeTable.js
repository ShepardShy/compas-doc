import _ from 'lodash'

export default {
    // Ресайз таблицы
    resizableGrid(table) {
        // Установка слушателей на движение мышкой с бордером
        const setListeners = (div) => {
            let info = {
                pageX: 0,
                curCol: undefined,
                nxtCol: 0,
                curColWidth: 0
            };
    
            if (div == null || div.getAttribute('setListener') === 'true') return
    
            // Прослушивание события, что на блок кликнули
            div.addEventListener('mousedown', function (e) {
                // Установка паддингов
                const paddingDiff = (col) => {
                    // Получение значений стилей
                    const getStyleVal = (elm, css) => {
                        return (window.getComputedStyle(elm, null).getPropertyValue(css))
                    }
    
                    if (getStyleVal(col, 'box-sizing') == 'border-box') {
                        return 0;
                    }
    
                    let padLeft = getStyleVal(col, 'padding-left');
                    let padRight = getStyleVal(col, 'padding-right');
                    return (parseInt(padLeft) + parseInt(padRight));
                }
    
                info.curCol = e.target.closest('.table__item');
                info.nxtCol = info.curCol.nextElementSibling;
                info.pageX = e.pageX;
    
                table.classList.add('table_resizing')
                let padding = paddingDiff(info.curCol);
                info.curCol.querySelector('.table-item__border').classList.add('table-item__border_changing')
                info.curColWidth = info.curCol.offsetWidth - padding;
            });
    
            // Прослушивание события, что на блок навелись
            div.addEventListener('mouseover', function (e) {
                e.target.style.height = `${table.offsetHeight}px`
            })
    
            // Прослушивание события, что у блока меняют ширину
            document.addEventListener('mousemove', (e) => {
                const resizeCell = (e, info) => {               
                    if (info.curCol) {
                        let diffX = info.curColWidth + e.pageX - info.pageX;
                        if ((diffX) >= 40) {
                            onMouseMoveThrottle(table, tableHeader, sectionBody, info.curCol, diffX)
                        }
                    }
                }
                
                resizeCell(e, info)
            });
    
            // Прослушивание события, что блок отпустили
            document.addEventListener('mouseup', (e) => {
                // Очищение редактируемой ячейки
                function clearCell() {
                    if (info.curCol != undefined) {
                        let borderBlock = info.curCol.querySelector('.table-item__border')
                        borderBlock.classList.remove('table-item__border_changing')
                        borderBlock.style.height = '';
            
                        info.nxtCol != undefined ? info.nxtCol.classList.remove('changeWidth') : ''
                        info.curCol.classList.remove('changeWidth')
                        info.curCol.classList.remove('table__item_resizing')
                        document.body.classList.remove('body__cursor-style')
            
                        info.curCol = undefined;
                        info.nxtCol = undefined;
                        info.pageX = undefined;
                        info.curColWidth = undefined;

                        setTimeout(() => {
                            table.classList.remove('table_resizing')
                        }, 10);
                    }
                }
                
                clearCell()
            });
    
            div.setAttribute('setListener', 'true')
        }
    
        let tableHeader = table.querySelector('.table__header')
        let sectionBody = table.parentNode
        let row = tableHeader.querySelector('tr');
        let cols = row ? row.children : undefined;
        if (!cols) return;
    
        setFixedCellsWidth(table)
        this.setCellsWidth(table)
    
        for (let i = 0; i < cols.length; i++) {
            let div = cols[i].querySelector('.table-item__border');
            setListeners(div);
        }
    },

    // Установка изначального положения ячеек если ширина таблицы меньше секции
    setCellsWidth(table) {
        let tableHeader = table.querySelector('.table__header')
        let sectionBody = table.parentNode
        setFixedCellsWidth(table)
        this.setStickyClass(table)

        if (tableHeader.offsetWidth + 10 <= sectionBody.offsetWidth) {
            setCellsWidthDefference(tableHeader, sectionBody)    
        }
    },

    // Установка цвета у зафиксированного столбца
    setStickyClass(table) {
        let rows = table.querySelectorAll('.table__row')
        let fixedFields = []
        let fieldPos = null

        let scrolledArea = table.parentNode.scrollLeft
        fixedFields = rows[0].querySelectorAll('.table__item_fixed:not(.table__item_hidden)')

        for (let row of rows) {
            fixedFields = row.querySelectorAll('.table__item_fixed:not(.table__item_hidden)')

            for (let index = 0; index < fixedFields.length; index++) {
                fieldPos = fixedFields[index].getBoundingClientRect().left - table.parentNode.getBoundingClientRect().left

                if (scrolledArea > fieldPos) {
                    fixedFields[index].classList.add('table__item_sticky')
                } else {
                    fixedFields[index].classList.remove('table__item_sticky')
                }
            }
        }
    }
}

// Тротлинг для получения отступа фиксированной ячейки
const onMouseMoveThrottle = _.throttle(async function (table, tableHeader, sectionBody, cell, width) {
    setCellWidth(cell, width)
    setVisibleTitle(cell)

    if (table.offsetWidth <= sectionBody.offsetWidth) {
        setCellsWidthDefference(tableHeader, sectionBody)
    }

    if (!cell.classList.contains('changeWidth')) {
        cell.classList.add('changeWidth')
        cell.classList.add('table__item_resizing')
    }
}, 10);

// Установка видимости заголовка у ячейки
const setVisibleTitle = (cell) => {
    let span = cell.querySelector('span') ?? cell.querySelector('.form-item__title')

    if (cell.offsetWidth <= 55) {
        span.style.display = 'none'
    } else {
        span.style.display = 'flex'
    }
}

// Установка изначального положения ячеек если ширина таблицы меньше секции
const setCellsWidthDefference = (tableHeader, sectionBody) => {
    let changingCell = tableHeader.querySelector('th.changeWidth')
    let cells = tableHeader.querySelectorAll('th:not(.changeWidth)')
    let widthData = null

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

    // Обновление ширины ячейки
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

    widthData = getProportionalСells(cells, tableHeader, sectionBody)
    widthData = updateWidth(changingCell, widthData, sectionBody)

    for (let i = 0; i <= cells.length - 1; i++) {
        setCellWidth(cells[i], widthData[i])
        setVisibleTitle(cells[i])
    }
}

// Установка ширины ячейки
const setCellWidth = (cell, width) => {
    if (typeof width == 'string') {
        width = Number(width.replace('px', ''))
    }
    cell.style.setProperty("--defaultWidth", `${width.toFixed(2)}px`)
}

// Устанвока ширины у фикисрованных столбцов
const setFixedCellsWidth = (table) => {
    let rows = table.querySelectorAll('.table__row')
    let fixedFields = []
    let summaryWidth = 0

    for (let row of rows) {
        summaryWidth = 0
        fixedFields = row.querySelectorAll('.table__item_fixed:not(.table__item_hidden)')

        for (let index = 0; index < fixedFields.length; index++) {
            if (index > 0) {
                summaryWidth += fixedFields[index - 1].offsetWidth
            }

            fixedFields[index].style.setProperty("--fixTarget", `${summaryWidth}px`)
        }
    }
}