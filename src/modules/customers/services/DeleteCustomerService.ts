import createErrorMessage from 'src/utils/functions';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}
class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw createErrorMessage(404, 'User not found');
    }
    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
