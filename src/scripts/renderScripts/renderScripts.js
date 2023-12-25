// import tables from "./tables";
import filter from "./filter";
// import selectedTasks from "./selectedTasks";

export default function(page, fields) {
    switch (page) {
        // case 'selectedTasks':
        //     selectedTasks.renderElements(fields)
        //     break;
        // case 'tables':
        //     tables.renderElements(fields)
        //     break
        case 'filter':
            return filter.renderElements(fields)
        default:
            break;
    }
}