import { defineAsyncComponent, markRaw } from 'vue';

export default {
    // Установка компонентов для рендеринга
    async renderElements(fields) {
        let data = []
        
        for (let field of fields) {
            field.component = await this.setComponent(field)
            data.push(field)
        }

        return data
    },

    // Установка связей между элементом и компонентом при отрисовке
    async setComponent(element) {
        switch (element.type) {
            case 'checkbox':
                return markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Checkbox/Checkbox.vue')))
            case 'relation':
               return markRaw(defineAsyncComponent(() => import('@/components/AppSelects/Relation/Relation.vue')))
            case 'text':
                if (element.key == 'product_name') {
                   return markRaw(defineAsyncComponent(() => import('@/components/AppSelects/Relation/Relation.vue')))
                } else {
                   return markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Textarea/Textarea.vue')))
                }
            default:
                return null
               return markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Textarea/Textarea.vue')))
        }
    },
}
