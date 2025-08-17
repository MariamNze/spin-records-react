import { useCart } from '../../context/CartContext.tsx'
import type { Product } from '../../types/product.type.ts'

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart()

    return (
        <button onClick={() => addToCart(product, 1)}>
            Ajouter {product.title} au panier
        </button>
    )
}
