import tableActions from './tableActions.json'

export default {
    // Поиск в селекте
    async setSearchOptions(row, item, data) {
        return row[item.key].newOptions.filter(p => p.value.includes(data.value))
    },

    // Установка значения и превью
    setValue(row, item, state, restore, tableKey) {
        if (item.type == 'actions') {
            if (state == 'edit') {
                return tableActions.edit
            } else {
                if (restore) {
                    return tableActions.restore
                } else if (tableKey == 'tableRoutes') {
                    return tableActions.routes
                } else if (tableKey == 'tableTasksOfRoutes') {
                    return tableActions.tasksOfRoutes
                }
                return tableActions.default
            }
        } else if (item.type == 'password' && item.state != 'edit') {
            return "●●●●●●●●●●"
        }
        else if ((row.state == 'edit') && (item.type == 'checkbox')) {
            return row[item.key]
        }
        else if ((row.state == 'edit') && item.type == 'address') {
            return row[item.key].value
        }
        else if (item.key == 'isChoose') {
            return row[item.key]
        } else if ((row.state == 'edit') && item.type == 'relation') {
            return row[item.key].value
        }
        else {
            if (row[item.key]) {
                if (item.type == 'text') {
                    return row[item.key].preview == null || row[item.key].preview.value == undefined ? row[item.key].preview : row[item.key].preview.value
                } else {
                    return row[item.key].preview
                }
            } else {
                return ''
            }
        }
    },

    // Установка классов
    setClass(item, clickedClass = null) {
        let response = []
        if (item.fixed) {
            response.push('table__item_fixed')
        }
        if (item.hover) {
            response.push('table__item_hover')
        }
        if (item.isSticky) {
            response.push('table__item_sticky')
        }
        if (item.isDrag) {
            response.push('sortable-ghost')
        }
        if (clickedClass) {
            response.push('table__item_clicked')
        }
        switch (item.type) {
            case 'checkbox':
                response.push('table__item_checkbox')
                break;
            case 'actions':
                response.push('table__item_actions');
                break;
            case 'status':
                response.push('table__item_status')
                break;
            case 'file':
                response.push('table__item_file')
                break;
            default:
                break;
        }


        if (item.read_only || item.read_only == undefined) {
            response.push('table__item_read-only')
        }
        return response
    },

    // Установка стилей
    setStyle(row, item) {
        let style = `--defaultWidth: 30px;`
        style += `--factedWidth: ${item.width}; `

        if (((row[item.key] != undefined) && (row[item.key].color != undefined))) {
            style += `--colorItem: ${row[item.key].color};`
        }
    },

    // Установка выключенных значений
    setDisabled(row, item, state) {
        if (((state == 'edit') && (item.type == 'checkbox')) || ((state == 'edit') && (row.state != 'edit') && (item.type == 'actions'))) {
            return true
        } else {
            false
        }
    },


    // Проверка наличия значения
    checkValue(event, state, type) {
        if (state == 'edit') {
            return false
        }


        if (event.closest('.form__item') != null) {
            if (event.classList.contains('form-item__checkbox') || event.classList.contains('table__item-content_actions')) {
                return true
            } else if (event.closest('.form__item').classList.contains('relation__item')) {
                if (event.classList.contains('popup__summary')) {
                    return true
                } else {
                    return false
                }
            }
            else {
                return false
            }
        }

        if (event.closest('.table__action') == null) {
            if (type == 'desctop') {
                if (event.closest('.item__value') != null) {
                    if (event.closest('.item__value').textContent != '') {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return false
        }
    },
}
