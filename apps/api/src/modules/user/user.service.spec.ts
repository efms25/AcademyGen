import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService = new UserService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return message of missing required params', () => {
    return service
      .createUser({ username: 'test', password: null, email: null })
      .then((res) => {
        expect(res).toMatchObject({
          error: true,
          message: 'email and password are required',
        });
      });
  });

  it('user creation should return true', () => {
    return service
      .createUser({
        username: 'test',
        password: 'testtest',
        email: 'test@example',
      })
      .then((res) => {
        expect(res).toBe(true);
      });
  });
  it('should return message that password have insufficient characters', () => {
    return service
      .createUser({ username: 'test', password: 'test', email: 'test@example' })
      .then((res) => {
        expect(res).toMatchObject({
          error: true,
          message: 'the password should have 8 characters or more',
        });
      });
  });

  it('should return message of missing id param', async () => {
    const user = await service.getUserById(null);
    expect(user).toBe('Id is required');
  });

  it('should return message of missing', async () => {
    const user = await service.getUserByAccess('123abc123');
    expect(user).toBe('missing parameters');
  });

  it('should return user with the id', async () => {
    const user = await service.getUserById('123345abc');
    expect(user).toMatchObject({
      _id: '123345abc',
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });
  it('should return user with the access data', async () => {
    const user = await service.getUserByAccess('password123', 'john.doe@example.com');
    expect(user).toMatchObject({
      _id: '123345abc',
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });
  it('user not found', async () => {
    const user = await service.getUserByAccess('badPass', 'john.doe@example.com');
    expect(user).toBe('user not found')
  })
});
