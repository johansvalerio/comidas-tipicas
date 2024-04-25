import { user_role } from "@prisma/client"
export type Users = User[]

export interface User {
  user_id: number
  user_name: string
  user_password: string
  user_created_on: Date
  user_updated_at: Date
  user_email: string
  user_role?: user_role | null
}

export interface UserFormData {
  user_name: string,
  user_email: string,
  user_password: string,
  confirmPassword: string
}
