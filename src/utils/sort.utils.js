
import { date } from 'quasar'

const sort_by_order_and_updated = (list) => {

    // Items in list are sorted primarily, by their set order.
    // They are secondarily sorted by their last updated time.
    // Items without a set order are at the front of the list.

    return list.sort( (a, b) => {

        if ( a.order && b.order ) return a.order - b.order
        if ( a.order && !b.order ) return 1
        if ( !a.order && b.order ) return -1
        if ( !a.order && !b.order ) return date.formatDate(a.updated, 'x') - date.formatDate(b.updated, 'x')
        else return 0


    })

}

export { sort_by_order_and_updated }