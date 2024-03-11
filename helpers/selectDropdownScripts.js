export default {
    // Нахождение открытого меню
    async findOpenMenu(status) {
        let node = document.querySelectorAll('body > .v-binder-follower-container')
        await this.optionAction(status, node)
    },

    // Действие с выпадающим списком
    async optionAction(status, node) {
        if (status) {
            let elemContent = this.findElemContent()
            if (elemContent != null) {
                let elemRect = elemContent.getBoundingClientRect()
                if (window.innerHeight < elemRect.y + elemRect.height) {
                    elemContent.classList.add('v-binder-follower-content_up')
                    elemContent.setAttribute('v-placement', 'none')
                }
            }
        } else {
            for (let elem of node) {
                let elemContent = elem.querySelector('.v-binder-follower-content')
                if (elemContent.children[0].style.display == 'none') {
                    elemContent.classList.remove('v-binder-follower-content_up')
                }
            }
        }
    },

    // Нахождение открытого селекта
    findElemContent() {
        let node = document.querySelectorAll('body > .v-binder-follower-container')
        for (let elem of node) {
            let elemContent = elem.querySelector('.v-binder-follower-content')
            if (elemContent.children[0].style.display != 'none') {
                return elemContent
            }
        } 
        return null 
    },
}