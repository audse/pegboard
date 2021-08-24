
const dragTransition = {

    data: function () {
        return {
            drag: false,
        }
    },

    computed: {
        dragTransitionProps: function () {
            return {
                componentData: {
                    tag: 'div',
                    type: 'transition-group',
                    name: !this.drag ? 'flip-list' : null
                },
                tag: 'transition-group',
                animation: 250,
                // group: 'drag-group',
                disabled: false,
                ghostClass: 'ghost',
                dragClass: 'dragging',
                chosenClass: 'chosen',
                handle: '.handle',
                easing: "cubic-bezier(0.5, 0, 0, 0.5)"
            };
        }
    },

}

export { dragTransition }