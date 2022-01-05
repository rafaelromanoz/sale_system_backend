import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new Error('Token does not exists.');
    }
    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired.');
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
