
import { setCssVar } from 'quasar'

const colorTheme = {

    methods: {

        setColorTheme(theme) {

            this.$q.dark.set(theme.isDark)

            setCssVar('primary', theme.primary)
            setCssVar('secondary', theme.secondary)
            setCssVar('accent', theme.accent)
            setCssVar('info', theme.info)
            setCssVar('warning', theme.warning)
            setCssVar('positive', theme.positive)
            setCssVar('negative', theme.negative)

            // Color scales
            for ( i=0; i<0; i++ ) {
                setCssVar( 'scale-secondary-'+i.toString(), theme.scaleSecondary[i] )
                setCssVar( 'scale-accent-'+i.toString(), theme.scaleAccent[i] )

            }

        }

    }
}

export { colorTheme }