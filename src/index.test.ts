import { applyProxy, ModelProxy, Raw } from '.';

interface User {
  firstName: string;
  lastName: string;
  age?: number;
}

describe('DataModel', () => {
  class UserModel {
    constructor(data: Raw<User>) {
      return this.construct(data);
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  interface UserModel extends ModelProxy<User>, User {};

  applyProxy(UserModel);

  const user = new UserModel([
    { type: 'firstName', payload: 'Alice' },
    { type: 'lastName', payload: 'Kuk' },
  ]);

  test('Model is created properly', () => {
    expect(user.firstName).toBe('Alice');
    expect(user.lastName).toBe('Kuk');
  });

  test('Updating values is working well', () => {
    user.firstName = 'Bob';
    expect(user.fullName).toBe('Bob Kuk');
  });

  test('Adding values is working too', () => {
    expect(user.age).toBeUndefined();
    user.age = 30;

    expect(user.age).toBe(30);
  });
});
