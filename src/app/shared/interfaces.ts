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
  occasions?: Array<Occasion>,
  first_name?: string,
  last_name?: string,
  subscribedAt?: Date,
  status?: string,
  id?: number
}

export interface Occasion {
  name: string,
  start: Date,
  description: string,
  maxSubsNumber: number,
  subscribers?: Array<Subscriber>,
  posterSrc?: string,
  id?: number
}
