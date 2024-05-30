import fetchApi from "./lib";

export interface LoggedUser {
  token: string;
  username: string;
}

export async function register(
  username: string | undefined,
  email: string | undefined,
  password: string | undefined,
  confirmPassword: string | undefined
): Promise<LoggedUser> {
  console.log(username, email, password, confirmPassword);
 
  fetchApi(register)

  throw new Error('Oh god nooooo');
}
