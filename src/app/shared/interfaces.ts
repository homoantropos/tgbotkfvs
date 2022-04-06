export interface User {
  email: string,
  password: string,
  role?: string,
  status?: string,
  id?: number
}

export interface Subscriber {
  tgId: number,
  username: string,
  events?: Array<number>,
  first_name?: string,
  last_name?: string,
  status?: string,
  id?: number
}
