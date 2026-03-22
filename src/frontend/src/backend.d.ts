import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    category: Category;
    badge?: Badge;
    price: bigint;
}
export enum Badge {
    hot = "hot",
    new_ = "new",
    sale = "sale"
}
export enum Category {
    men = "men",
    newIn = "newIn",
    women = "women"
}
export interface backendInterface {
    addItemToCart(cartId: string, productId: bigint, quantity: bigint): Promise<void>;
    addToWishlist(productId: bigint): Promise<void>;
    clearCart(cartId: string): Promise<void>;
    clearWishlist(): Promise<void>;
    createCart(cartId: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCartItems(cartId: string): Promise<Array<CartItem>>;
    getProductById(productId: bigint): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getWishlist(): Promise<Array<bigint>>;
    removeFromWishlist(productId: bigint): Promise<void>;
    removeItemFromCart(cartId: string, productId: bigint): Promise<void>;
    seedProducts(): Promise<void>;
}
