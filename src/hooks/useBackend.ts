import {useApi} from './useApi'

//----------------------------
//  LOGIN
//----------------------------
interface LoginBody {
    email: string;
    password: string;
}
interface LoginResponse{
    message: string;
    token: string;
    user: {};
}

export function useLogin(body: LoginBody | null) {
    return useApi<LoginResponse, LoginBody>({
        endpoint: '/api/login',
        method: 'POST',
        body: body ?? undefined,
        headers: {'Content-Types': "application/json"}
        },
        !!body
    )
}
//----------------------------
//  REGISTER
//----------------------------
interface RegisterBody {
    name: string;
    email: string;
    password: string;
    secretWord: string;
}
interface RegisterResponse{
    message: string;
    token: string;
    user: {};
}
export function useRegister(body: RegisterBody | null){
    return useApi<RegisterResponse, RegisterBody>({
        endpoint: '/api/usuario',
        method: 'POST',
        body: body ?? undefined,
        headers: {'Content-Type': "application/json"}
        },
        !!body
    )
}
// --------------------
// Get Accounts
// --------------------
interface Account {
}

export function useGetAccounts() {
  return useApi<Account[], undefined>({
    endpoint: "/api/accounts",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}
