
import { colors } from 'quasar'
import chroma from 'chroma-js'

const palette = [
    '#fefefe', '#9db4c0', '#5c6b73', '#333333', '#f94144', '#f3722c', '#f8961e', '#f9c74f', '#a5be00', '#679436', '#43aa8b', '#0081a7', 
    '#184e77', '#9d4edd', '#ff70a6', 
]

const color = {

    data: function () {
        return {
            primary: '#333333', // main ui background color
            accent: '#fefefe', // text color
            secondary: '#000000', // ui secondary color 
            info: '#887700',
            warning: 'orange',
            positive: 'green',
            negative: '#bf0700',

            palette: [
                '#fefefe', '#9db4c0', '#5c6b73', '#333333', '#f94144', '#f3722c', '#f8961e', '#f9c74f', '#a5be00', '#679436', '#43aa8b', '#0081a7', 
                '#184e77', '#9d4edd', '#ff70a6', 
            ],

            pickerOptions: {
                class: 'q-mt-sm full-width',
                defaultView: 'palette',
                palette: palette,
                flat: true,
            }
        }
    },

    computed: {

        colorForm: function () {
            return { 
                primary: this.primary,
                accent: this.accent,
                secondary: this.secondary,
                info: this.info,
                warning: this.warning,
                positive: this.positive,
                negative: this.negative,
            }
        },
    },

    methods: {

        getScale: function (colorA, colorB) {
            let scale = chroma.scale( [colorA, colorB] )
            
            return [
                scale(0.1).hex(), 
                scale(0.2).hex(),
                scale(0.3).hex(), 
                scale(0.4).hex(), 
                scale(0.5).hex(), 
                scale(0.6).hex(), 
                scale(0.7).hex(), 
                scale(0.8).hex(), 
                scale(0.9).hex()
            ]
        },

        getBlend: function (colorA, colorB, blendMode) {
            return chroma.blend(colorA, colorB, blendMode).hex()
        },

        getPalette: function (color) {
            //
        },

        isDarkColor: function (color) {
            if ( colors.brightness(color) < 128 ) {
                return true
            } else {
                return false
            }
        },

        isLightColor: function (color) {
            if ( colors.brightness(color) >= 128 ) {
                return true
            } else {
                return false
            }
        }
    }
}

export { color }