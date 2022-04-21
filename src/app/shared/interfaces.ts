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

export interface PollOption {
  text: string,
  voter_count: number
}

export interface TgUser {
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name: string,
  username?: string,
  language_code?: string,
  can_join_groups?: boolean,
  can_read_all_group_messages?: boolean,
  supports_inline_queries?: boolean
}

export interface MessageEntity {
  type: string,
  offset: number,
  length: number,
  url?: string,
  user?: 	TgUser,
  language?: string
}

export interface Poll {
  id: string,
  question:	string,
  options:	Array<PollOption>,
  total_voter_count: number,
  is_closed: boolean,
  is_anonymous: boolean,
  type: string,
  allows_multiple_answers: boolean
  correct_option_id?: number,
  explanation?: string,
  explanation_entities?:	Array<MessageEntity>,
  open_period?: number,
  close_date?: number,
}
