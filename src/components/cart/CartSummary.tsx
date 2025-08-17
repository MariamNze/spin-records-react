import { useCart } from '../../context/CartContext.tsx'

export function CartSummary() {
    const { totalItems, totalPrice, emptyCart } = useCart()

    return (
        <div>
            <p>Articles : {totalItems}</p>
            <p>Total : {totalPrice.toFixed(2)} €</p>
            <button onClick={emptyCart}>Vider le panier</button>
        </div>
    )
}
