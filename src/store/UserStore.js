import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._policies = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setPolicies(policies){
    this._policies = policies;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get policies(){
    return this._policies;
  }
}
