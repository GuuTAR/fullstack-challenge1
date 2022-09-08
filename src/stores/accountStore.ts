import { makeAutoObservable } from 'mobx'

class AccountStore {
  address: string

  constructor() {
    this.address = ''
    makeAutoObservable(this)
  }

  setAddress = (address: string) => {
    this.address = address.toLowerCase()
  }
}

export const accountStore = new AccountStore()
