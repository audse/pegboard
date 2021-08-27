
const drag_animation = {

    data: function () {

        return {
            drag: false,
        }

    },

    computed: {

        drag_animation_props: function () {

            return {

                componentData: {
                    tag: 'div',
                    name: !this.drag ? 'flip-list' : null
                },

                tag: 'transition-group',
                animation: 250,
                easing: "cubic-bezier(0.5, 0, 0, 0.5)",

                group: 'drag_group',

                disabled: false,

                ghostClass: 'ghost',
                dragClass: 'dragging',
                chosenClass: 'chosen',

                handle: '.handle',
                
            };
        }
    },

}

export { drag_animation }