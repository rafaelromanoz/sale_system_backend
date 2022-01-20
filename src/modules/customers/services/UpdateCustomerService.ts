import createErrorMessage from 'src/utils/functions';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) throw createErrorMessage(404, 'User not found');

    const customerExist = await customersRepository.findByEmail(email);

    if (customerExist && email !== customer.email)
      throw createErrorMessage(
        401,
        'There is already one customer with this email',
      );

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
