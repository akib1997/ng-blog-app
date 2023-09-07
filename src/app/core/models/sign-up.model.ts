import { Login } from "./login.model";

export interface SignUp extends Login {
  confirmPassword: string
}
