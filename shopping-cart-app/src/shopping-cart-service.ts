import { fromEvent, merge, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

/**
 * Key of the shopping cart in the session storage.
 */
const SHOPPING_CART_STORAGE_KEY = 'SHOPPING_CART';
/**
 * Emits when the session storage as been modified in the context of this document.
 */
const localChange$ = new Subject<void>();
/**
 * Emits when the session storage as been modified in the context of another document.
 */
const otherDocumentChange$ = fromEvent<StorageEvent>(window, 'storage')
  .pipe(
    filter(event => event.storageArea === sessionStorage),
    filter(event => event.key === SHOPPING_CART_STORAGE_KEY),
  );

/**
 * Allows adding products to the shopping cart.
 */
export class ShoppingCartService {

  /**
   * Observes products contained in the shopping cart.
   */
  public static products$ = merge(localChange$, otherDocumentChange$)
    .pipe(
      startWith([]),
      map(() => ShoppingCartService.getProducts()),
    );

  /**
   * Adds a product to the shopping cart.
   */
  public static addProduct(product: Product): void {
    const products = ShoppingCartService.getProducts().concat(product);
    ShoppingCartService.setProducts(products);
    localChange$.next();
  }

  /**
   * Removes all products from the shopping cart.
   */
  public static clear(): void {
    ShoppingCartService.setProducts([]);
    localChange$.next();
  }

  private static getProducts(): Product[] {
    const products = sessionStorage.getItem(SHOPPING_CART_STORAGE_KEY);
    return products ? JSON.parse(products) : [];
  }

  private static setProducts(products: Product[]): void {
    sessionStorage.setItem(SHOPPING_CART_STORAGE_KEY, JSON.stringify(products));
    localChange$.next();
  }
}

export interface Product {
  id: number;
  name: string;
}
