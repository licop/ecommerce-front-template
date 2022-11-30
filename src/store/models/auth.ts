export interface User {
  _id: string,
  name: string,
  role: number,
  email: string
}

export interface Jwt {
  token: string,
  user: User
}