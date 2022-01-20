import createErrorMessage from 'src/utils/functions';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer | unknown> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw createErrorMessage(401, 'Email already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
