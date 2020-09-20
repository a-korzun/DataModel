# DataModel

The data model layer from `{ type, payload }` weak typed array into fully typed class with ability to define custom accessors.

Imagine, you have an API response with data structure like:
```
[
  { type: 'fistname', payload: 'Alice' },
  { type: 'gender', payload: 'female' },
  ...
]
```

What will you do to convert it into data model? There are many different approaches, mine is make a Proxy object around this data structure.

Usage:

1. Define your data interface:
```ts
interface User {
  firstName: string;
  lastName: string;
  userPic: string;
  birthDate: string;
}
```

2. Then create a dummy object that represents data model:
```
export class UserModel {
  constructor(data: Raw<User>) {
    return this.construct(data);
  }
}
```

3. Mix model with proxy properties and types:
```
export interface UserModel extends ModelProxy<User>, User {};

applyProxy(UserModel);
```
4. Add useful accessors to data model and enjoy full typescript experience.



## Full example:

```ts
import { applyProxy, ModelProxy } from './lib';

interface User {
  firstName: string;
  lastName: string;
  userPic: string;
  birthDate: string;
}

export class UserModel {
  constructor(data: Raw<User>) {
    return this.construct(data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get dateOfBirth() {
    if (!this.birthDate) {
      return;
    }

    return new Date(this.birthDate);
  }

  get age() {
    if (!this.dateOfBirth) {
      return;
    }

    const today = new Date();
    return today.getFullYear() - this.dateOfBirth.getFullYear();
  }
}

export interface UserModel extends ModelProxy<User>, User {};

applyProxy(UserModel);

const user = new UserModel([
  { type: 'firstName', payload: 'Alice' },
  { type: 'lastName', payload: 'Kuk' },
  { type: 'birthDate', payload: '1990-01-01' }
]);

console.log(user.fullName); // Alice Kuk
console.log(user.age); // 30

user.birthDate = '1992-01-01';

console.log(user.age); // 28
```
