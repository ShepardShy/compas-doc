import { defineAsyncComponent, markRaw } from 'vue';

export default {
    // Установка компонентов для рендеринга
    async renderElements(fields) {
        let data = []

        for (let field of fields) {
            field.value = null

            if (['actions', 'checkbox', 'json'].includes(field.type) || field.key == 'products') {
                continue
            } else {
                field.component = await this.setComponent(field)
                data.push(field)
            }
        }

        return data
    },

    // Установка компонентов
    async setComponent(field) {
        switch (field.type) {
            case 'status':
                // return markRaw(defineAsyncComponent(() => import('@/components/AppSelects/AppSelectStatus/AppSelectStatus.vue')))
            case 'select_dropdown':
                // return markRaw(defineAsyncComponent(() => import('@/components/AppSelects/AppSelectInput/AppSelectInput.vue')))
            case 'relation':
                // return markRaw(defineAsyncComponent(() => import('@/components/AppSelects/AppSelectInput/AppSelectInput.vue')))
            case 'date':
                // return markRaw(defineAsyncComponent(() => import('@/components/AppDate/AppDateInput/AppDateInput.vue')))
            default:
                return markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Input/Input.vue')))
        }
    }
}