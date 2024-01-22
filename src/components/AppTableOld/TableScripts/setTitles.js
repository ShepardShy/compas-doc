export default {
    // Установка заголовков
    setTitle(row, item) {
        let itemValue = row[item.key]
        if ([null, undefined].includes(item) || [null, undefined].includes(itemValue) || [null, undefined].includes(itemValue.preview)) {
            return null
        } else {
            switch (item.type) {
                case 'file':
                    return this.setFileTitle(itemValue.preview)
                case 'select_dropdown':
                    return this.setSelectDropdownTitle(itemValue)
                case 'status':
                    return this.setStatusTitle(itemValue.preview)
                case 'json':
                    return this.setJsonTitle(itemValue.preview)
                default:
                    return itemValue.preview
            }
        }
    },

    // Заголовок для названий файлов
    setFileTitle(field) {
        let title = ''
        if (field != null) {
            if (Array.isArray(field)) {
                for (let file of field) {
                    title += `${file.name}; `
                }
            } else {
                title += `${field.name}; `
            }
        }
        return title
    },

    // Заголовок для выпадающих списков
    setSelectDropdownTitle(field) {
        if (typeof field.preview == 'string' || typeof field.preview == 'number') {
            return field.newOptions.find(option => option.value == field.preview).label
        } else {
            let title = ''
            for (let previewValue of field.preview) {
                title += `${field.newOptions.find(option => option.value == previewValue).label}; `
            }
            return title
        }
    },

    // Заголовок для статусов
    setStatusTitle(field) {
        return field.value
    },

    // Заголовок для json
    setJsonTitle(field) {
        var regex = /(<([^>]+)>)/ig
        return field.replace(regex, "");
    }
}
