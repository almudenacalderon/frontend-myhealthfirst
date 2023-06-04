import api from "./api"
import type { Register } from '../interfaces/Users/IRegister'
import type { Login } from '../interfaces/Users/ILogin'

  export async function Registro(
    name: string,
    emailAddress: string,
    password: string,
    role: string
  ): Promise<number> {
    const { data } = await api.post("Register",  {
        name,
        emailAddress,
        password,
        role, 
    });
    console.log(data)
    return data;
  }
  export async function Loggeo(
    email: string,
    password: string
  ): Promise<number> {
    const { data } = await api.post("Login", {
        email,
        password,
    });
    console.log(data)
    return data;
  }
    
  