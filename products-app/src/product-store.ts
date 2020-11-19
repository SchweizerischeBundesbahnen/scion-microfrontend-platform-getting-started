export const products = new Map<string, Product>()
  .set('1', {id: '1', name: 'Apple', image: '/apple.jpg', description: 'Fresh apples directly from the farmer'})
  .set('2', {id: '2', name: 'Milk', image: '/milk.jpg', description: 'Milk from happy cows'})
  .set('3', {id: '3', name: 'Bred', image: '/bred.jpg', description: 'Crispy bread'})
  .set('4', {id: '4', name: 'Banana', image: '/banana.jpg', description: 'Banana from sustainable cultivation'})
  .set('5', {id: '5', name: 'Salad', image: '/lettuce.jpg', description: 'Organic salad'});

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}
