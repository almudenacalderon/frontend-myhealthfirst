import api from "./api"

  export async function Registro(
    name: string,
    emailAddress: string,
    password: string,
    role: string
  ): Promise<LoginResponse> {
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
  ): Promise<LoginResponse> {
    const { data } = await api.post("Login", {
        email,
        password,
    });
    console.log(data)
    return data;
  }
    
  export async function ChangeEmail(
    newEmail: string,
    userId: string,
  ): Promise<LoginResponse> {
    const { data } = await api.post("ChangeEmail", {
        newEmail,
        userId

    });
    console.log(data)
    return data;
  }
    