/* export class User {

  id!: number;
  email!: string;
  //Both the passwords are in a single object
  password!: {
    pwd: string;
    confirmPwd: string;
  };

  gender!: string;
  terms!: boolean;

  constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);
}

} */




export interface IUser {
  firstName: string,
  lastName: string,
  token: string,
  login: string,
  password: string,
  cart: [],
  favorites: [],
  orders: []
}

export class User implements IUser {
  firstName: string = '';
  lastName: string = '';
  token: string = '';
  login: string = '';
  password: string = '';
  cart: [] = [];
  favorites: [] = [];
  orders: [] = [];
  constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);
  }
}
