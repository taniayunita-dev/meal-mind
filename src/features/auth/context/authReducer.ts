import type { AuthAction, AuthState } from "../types/auth.types";

export function authReducer(_state: AuthState, action:AuthAction) : AuthState{
    switch (action.type){
        case 'SESSION_CHECK_START':
            return {status: 'loading', user: null}
        case 'SESSION_RESOLVED':
            return action.user ? { status: 'authenticated', user: action.user }: { status: 'unauthenticated', user: null }
        case 'LOGIN_SUCCESS' :
            return {status: 'authenticated', user: action.user}
        case 'LOGOUT' :
            return {status:'unauthenticated', user:null}
    }
}