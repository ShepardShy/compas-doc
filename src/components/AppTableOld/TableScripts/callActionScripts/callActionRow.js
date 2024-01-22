export default {
    addNewRow(store) {
        let newRow = {}
        try {
            if (store.table.tableKeys.findIndex(item => item.key == 'id') == -1) {
                newRow['id'] = {
                    value: store.table.tableData.length + 1,
                    preview: null,
                    options: null,
                }
            }
    
            for (let field of store.table.tableKeys) {
                newRow[field.key] = setRowNullValues()
            }

            newRow.state = 'edit'
            newRow.isChoose = true
        } catch (error) {
            console.log(error);
        } finally {
            store.table.tableData.push(newRow)
        }
    },

    // Удаление строки
    deleteRow(data, store) {
        for (let row of data) {
            store.table.tableData = store.table.tableData.filter(p => p.id.value != row.id.value)
        }
    }
}

// Пустые значения для создаваемой строки
const setRowNullValues = () => {
    return {
        value: null,
        preview: null,
        options: null,
    }
}