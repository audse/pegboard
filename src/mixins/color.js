
import { colors } from 'quasar'
import chroma from 'chroma-js'


const color = {

    data: function () {
        return {

            name: null,

            advanced: false,
            primary: '#333333', // main ui background color
            accent: '#fefefe', // text color
            secondary: '#222222', // ui secondary color 
            info: '#00b4d8',
            warning: '#ffb703',
            positive: '#52b788',
            negative: '#9b2226',

            pickerOptions: {
                class: 'q-mt-sm full-width',
                defaultView: 'palette',
                palette: [
                    '#3f1a25','#362420','#312e23','#2a3a2a','#1e4d3b','#223f53','#273056','#2f2a50','#3a2a4e','#401f3e', // Deep Rainbow
                    '#f94144','#f3722c','#f8961e','#f9c74f','#a5be00','#679436','#43aa8b','#0081a7','#184e77','#9d4edd', // Bright rainbow
                    '#f2beb9','#f0d3b5','#ede7b1','#d3f8e2','#C6F9CA','#beeff1','#a9def9','#c7d0f9','#e4c1f9','#edabdd', // Pastel rainbow
                    
                    '#590817','#75101a','#94191d','#c22121','#cb3f1d','#da4e11','#e85d04','#f48c06','#ffba08','#ffda45', // Red/yellow
                    '#044a75','#145e8f','#2b79b5','#5191bf','#68a4ca','#67bba0','#4ea673','#2f8a4a','#1f7136','#19612e', // Blue/green
                    '#47126b','#571089','#6411ad','#6d23b6','#822faf','#973aa8','#ac46a1','#c05299','#d55d92','#ea698b', // Purple/pink
                    
                    '#f4f3ee','#e6e5df','#d8d6d0','#bcb8b1','#a39d97','#8a817c','#665c56','#493f39','#2c2723','#221e1b', // Warm grayscale
                    '#EEF0F7','#dddfed','#c6c9d8','#818496','#53566a','#3c3f54','#2b2e43','#25283d','#1f2132','#1b1c2b', // Cool grayscale
                    '#f8f9fa','#e9ecef','#dee2e6','#ced4da','#adb5bd','#9098a0','#6c757d','#495057','#343a40','#212529', // Grayscale


                    
                ],
                flat: true,
            }
        }
    },

    computed: {

        autoSecondary: function () {
            return chroma(this.primary).darken().hex()
        },

        autoAccent: function () {
            if ( this.isLight(this.primary) ) {
                return chroma.mix(this.primary, 'black', 0.9).hex()
            } else {
                return chroma.mix(this.primary, 'white', 0.9).hex()
            }
        },
    },

    watch: {

        primary: function () {
            if ( !this.advanced ) {
                this.autoEverything()
            }
        }
    },

    methods: {

        autoEverything: function () {
            this.accent = this.autoAccent
            this.secondary = this.autoSecondary
            this.info = this.autoColorMix(this.primary, '#00b4d8')
            this.warning = this.autoColorMix(this.primary, '#ffb703')
            this.positive = this.autoColorMix(this.primary, '#52b788')
            this.negative = this.autoColorMix(this.primary, '#9b2226')
        },

        autoColorMix: function (colorA, colorB) {
            colorB = chroma.mix(colorA, colorB, 0.75).hex()
            if ( chroma.contrast(colorA, colorB) < 3 ) {
                if ( this.isLight(colorA) ) return chroma(colorB).darken(1.5).hex()
                if ( this.isDark(colorA) ) return chroma(colorB).brighten(1.5).hex()
            } else {
                return colorB
            }
        },

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

        isDark: function (color) {
            if ( colors.brightness(color) < 128 ) {
                return true
            } else {
                return false
            }
        },

        isLight: function (color) {
            if ( colors.brightness(color) >= 128 ) {
                return true
            } else {
                return false
            }
        }
    },
}

export { color }