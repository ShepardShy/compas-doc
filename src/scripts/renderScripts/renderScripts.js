import table from "./table";
import filter from "./filter";
// import selectedTasks from "./selectedTasks";

export default function(page, fields) {
    switch (page) {
        // case 'selectedTasks':
        //     selectedTasks.renderElements(fields)
        //     break;
        case 'table':
            return table.renderElements(fields)
        case 'filter':
            return filter.renderElements(fields)
        default:
            break;
    }
}