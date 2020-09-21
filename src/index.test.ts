import {  ModelProxy, Raw } from '.';

interface User {
  firstName: string;
  lastName: string;
  age?: number;
}

describe('DataModel', () => {
  class UserModel extends ModelProxy<User> {
    constructor(data: Raw<User>) {
      super(data);
    }

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  interface UserModel extends User {};

  const user = new UserModel([
    { type: 'firstName', payload: 'Alice' },
    { type: 'lastName', payload: 'Kuk' },
  ]);

  test('Create model', () => {
    expect(user.firstName).toBe('Alice');
    expect(user.lastName).toBe('Kuk');
  });

  test('Update values', () => {
    user.firstName = 'Bob';
    expect(user.fullName).toBe('Bob Kuk');
  });

  test('Add values', () => {
    expect(user.age).toBeUndefined();
    user.age = 30;

    expect(user.age).toBe(30);
  });
});
