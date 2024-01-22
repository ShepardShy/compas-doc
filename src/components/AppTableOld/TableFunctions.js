import commonScripts from "@/helpers/commonScripts";
import TableScripts from "./TableScripts";
import _ from 'lodash'

export default function resizableGrid(tableStore = null, table, enabled = false) {
    let tableHeader = table.querySelector('.table__header')
    let sectionBody = table.parentNode
    let row = table.getElementsByTagName('tr')[0],
    cols = row ? row.children : undefined;
    if (!cols) return;
    TableScripts.setDefaultWidth(table, tableStore, 'th')

    if (enabled) {
        TableScripts.setDefaultStoreWidth(tableHeader, tableStore)
    }

    if (tableHeader.offsetWidth + 10 <= sectionBody.offsetWidth) {
        TableScripts.setCellsWidthDefference(tableHeader, sectionBody)
        TableScripts.setStoreWidth(tableHeader, tableStore)
    }

    for (let i = 0; i < cols.length; i++) {
        let div = cols[i].querySelector('.table__item-border');
        setListeners(div);
        TableScripts.setVisibleTitle(cols[i])
    }

    function changeWidth(e, info) {
        if (info.curCol) {

            let diffX = e.pageX - info.pageX;
            commonScripts.clearSelection()
            if ((info.curColWidth + diffX) >= 40) {
                setCursor(document.body)
                onMouseMoveThrottle(table, tableHeader, sectionBody, tableStore, info.curCol, (info.curColWidth + diffX))
            }

            // Установка курсора во время перетаскивания
            function setCursor (body) {
                body.classList.add('body__cursor-style')
                commonScripts.setCursor('col-resize')
            }
        }
    }

    function dismissBlock(e, info) {
        if (info.curCol != undefined) {
            let borderBlock = info.curCol.querySelector('.table__item-border')
            borderBlock.classList.remove('table__item-border_changeWidth')
            borderBlock.style.height = '';
            TableScripts.setStoreWidth(tableHeader, tableStore)
            commonScripts.clearSelection()
            setChangedColumns(tableStore, tableHeader)

            info.nxtCol != undefined ? info.nxtCol.classList.remove('changeWidth') : ''
            info.curCol.classList.remove('changeWidth')
            info.curCol.classList.remove('borderVisible')
            commonScripts.setCursor('default')
            document.body.classList.remove('body__cursor-style')

            info.curCol = undefined;
            info.nxtCol = undefined;
            info.pageX = undefined;
            info.curColWidth = undefined;
        }
    }

    // Установка слушателей на движение мышкой с бордером
    function setListeners(div) {
        let info = {
            pageX: 0,
            curCo: 0,
            nxtCol: 0,
            curColWidth: 0
        };

        if (div.getAttribute('setListener') === 'true') return

        // Прослушивание события, что на блок кликнули
        div.addEventListener('mousedown', function (e) {
            info.curCol = e.target.parentElement;
            info.nxtCol = info.curCol.nextElementSibling;
            info.pageX = e.pageX;

            let padding = paddingDiff(info.curCol);
            info.curCol.querySelector('.table__item-border').classList.add('table__item-border_changeWidth')
            info.curColWidth = info.curCol.offsetWidth - padding;
        });

        // Прослушивание события, что на блок навелись
        div.addEventListener('mouseover', function (e) {
            e.target.style.height = `${table.offsetHeight}px`
        })

        // Прослушивание события, что у блока меняют ширину
        document.addEventListener('mousemove', (e) => changeWidth(e, info));

        // Прослушивание события, что блок отпустили
        document.addEventListener('mouseup', (e) => dismissBlock(e, info));

        div.setAttribute('setListener', 'true')
    }

    // Установка паддингов
    function paddingDiff(col) {
        if (getStyleVal(col, 'box-sizing') == 'border-box') {
            return 0;
        }

        let padLeft = getStyleVal(col, 'padding-left');
        let padRight = getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

    }

    // Получение значений стилей
    function getStyleVal(elm, css) {
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
    }
};

// Тротлинг для получения отступа фиксированной ячейки
const onMouseMoveThrottle = _.throttle(async function (table, tableHeader, sectionBody, tableStore, cell, width) {
    TableScripts.setCellWidth(cell, width)
    TableScripts.setVisibleTitle(cell)
    TableScripts.setStoreTableKeysMargin(table, tableStore)

    if (table.offsetWidth <= sectionBody.offsetWidth) {
        TableScripts.setCellsWidthDefference(tableHeader, sectionBody, null)
    }

    if (!cell.classList.contains('changeWidth')) {
        cell.classList.add('changeWidth')
        cell.classList.add('borderVisible')
    }
}, 10);


const setChangedColumns = (tableStore, tableHeader) => {
    let node = tableHeader.querySelectorAll('.table__item')
    let request = []
    let findedKey = null

    for (let item of node) {
        findedKey = tableStore.tableKeysFiltered.find(tableItem => tableItem.key == item.getAttribute('data-key'))
        findedKey.width = item.offsetWidth + 'px'
        request.push(findedKey)
    }

    tableStore.changedColumns = request
}