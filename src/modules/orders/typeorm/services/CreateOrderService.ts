import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import createErrorMessage from 'src/utils/functions';
import { getCustomRepository } from 'typeorm';
import Order from '../entities/Order';
import { OrdersRepository } from '../repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw createErrorMessage(
        400,
        'Could not find any customer with the given id',
      );
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw createErrorMessage(
        400,
        'Could not find any products with the given ids.',
      );
    }
  }
}

export default CreateOrderService;
