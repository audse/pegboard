
import { date } from 'quasar'

const sort_by_order_and_updated = (list) => {

    // Items in list are sorted primarily, by their set order.
    // They are secondarily sorted by their last updated time.
    // Items without a set order are at the front of the list.

    return list.sort( (a, b) => {

        const date_a = date.formatDate(a.updated, 'x')
        const date_b = date.formatDate(b.updated, 'x')
        const order_a_defined = a.order !== undefined ? true : false
        const order_b_defined = a.order !== undefined ? true : false

        // Both items have a set order, which are different
        if ( order_a_defined && order_b_defined && a.order !== b.order ) {
            return a.order - b.order
        }

        // Both items have a set order, but they are the same (which can happen when adding a new item)
        if ( order_a_defined && order_b_defined && a.order === b.order ) {
            return date_a > date_b ? -1 : 1
        }

        // One of the items doesn't have an order. This means it goes to the top of the list.
        if ( order_a_defined && !order_b_defined ) return 1
        if ( !order_a_defined && order_b_defined ) return -1

        // Neither item has an order, so the newer gets sorted first.
        if ( !order_a_defined && !order_b_defined ) return date_a - date_b

        else return 0

    })

}

export { sort_by_order_and_updated }