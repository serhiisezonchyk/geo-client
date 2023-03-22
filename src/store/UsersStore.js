import { makeAutoObservable } from "mobx";

export default class UsersStore {
  constructor() {
    this._roles = [];
    this._users = [];
    this._selectedRole = {};
    makeAutoObservable(this);
  }

  setRoles(roles) {
    this._roles = roles;
  }
  setUsers(users) {
    this._users = users;
  }

  setSelectedRole(role) {
    this._selectedRole = role;
  }

  get roles() {
    return this._roles;
  }
  get users() {
    return this._users;
  }
  get selectedRole() {
    return this._selectedRole;
  }

}
