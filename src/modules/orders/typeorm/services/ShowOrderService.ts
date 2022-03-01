import createErrorMessage from 'src/utils/functions';
import { getCustomRepository } from 'typeorm';
import Order from '../entities/Order';
import { OrdersRepository } from '../repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw createErrorMessage(
        400,
        'Could not find any order with the given id',
      );
    }

    return order;
  }
}

export default ShowOrderService;
