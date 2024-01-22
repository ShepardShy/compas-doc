import callActionRow from "./callActionScripts/callActionRow";

export default function (action, store) {
    switch (action.action) {
        // Добавление новой строки
        case 'addNewRow':
            callActionRow.addNewRow(store)
            break;
        case 'deleteRow':
            callActionRow.deleteRow(action.item, store)
        default:
            break;
    }
}