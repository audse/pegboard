
const drag_animation = {

    data: function () {

        return {
            drag: false,
            row: true,
        }

    },

    computed: {

        drag_animation_props: function () {

            return {

                componentData: {
                    tag: 'div',
                    type: 'transition-group',
                    name: !this.drag ? 'flip-list' : null
                },

                tag: 'transition-group',
                animation: 250,
                easing: "cubic-bezier(0.5, 0, 0, 0.5)",

                disabled: false,

                class: this.row ? 'row q-col-gutter-sm' : '',
                ghostClass: 'ghost',
                dragClass: 'dragging',
                chosenClass: 'chosen',

                handle: '.handle',
                
            };
        }
    },

}

export { drag_animation }