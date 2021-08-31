
import { ref, reactive, computed } from 'vue'
import chroma from 'chroma-js'
import { colors } from 'quasar'

const use_color_form = ( current_theme ) => {

    const form = current_theme ? reactive(current_theme) : reactive({
        name: null,
        primary: '#333333', // main ui background color
        text: '#fefefe', // text color
        secondary: '#222222', // ui secondary color 
        emphasis: '#00b4d8',
        warning: '#ffb703',
        negative: '#9b2226',
    })

    const advanced = ref(false)

    const options_picker = {
        class: 'q-mt-sm full-width no-border',
        defaultView: 'palette',
        flat: true,
        bordered: false,

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
    }

    return {
        form,
        advanced,
        options_picker
    }

}

const use_auto_color = () => {

    const auto_all = (form, advanced) => {
        if ( !advanced && form ) {
            form.text = auto_text(form)
            form.secondary = auto_secondary(form)
            form.emphasis = auto_mix(form.primary, '#00b4d8')
            form.warning = auto_mix(form.primary, '#ffb703')
            form.negative = auto_mix(form.primary, '#9b2226')
        }
    }


    const auto_secondary = (form) => {
        return chroma(form.primary).darken(1.5).hex()
    }

    const auto_text = (form) => {
        if ( is_light(form.primary) ) return chroma.mix(form.primary, 'black', 0.9).hex()
        else return chroma.mix(form.primary, 'white', 0.9).hex()
    }

    const auto_mix = (colorA, colorB) => {

        colorB = chroma.mix(colorA, colorB, 0.75).hex()
        if ( chroma.contrast(colorA, colorB) < 3 ) {
            if ( is_light(colorA) ) return chroma(colorB).darken(1.5).hex()
            if ( is_dark(colorA) ) return chroma(colorB).brighten(1.5).hex()
        } else return colorB

    }

    const auto_scale = (colorA, colorB) => {
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
    }

    const is_dark = (color) => {
        return ( colors.brightness(color) < 128 )
    }

    const is_light = (color) => {
        return ( colors.brightness(color) >= 128 )
    }

    return {
        auto_all,
        auto_mix,
        auto_scale,
        is_dark,
        is_light
    }
}

export { use_color_form, use_auto_color }