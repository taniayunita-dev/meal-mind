import { AuthContext } from './authContext';
import { useEffect, useReducer, type ReactNode } from 'react';
import type { AuthContextInterface, AuthState, LoginCredentials, RegisterPayload, User } from "../types/auth.types";
import { authReducer } from './authReducer';
import { sessionOnlyStorage, storage, STORAGE_KEYS } from '@/lib/storage';
import { login, logout, register } from '../services/AuthServices';

const initialState: AuthState = { status: 'idle', user: null };

const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SESSION_CHECK_START' });
        // localStorage dicek dulu (Remember Me = true),
        // fallback ke sessionStorage kalau tidak ada (Remember Me = false, tab masih terbuka).
        const persistReducer = storage.get<User>(STORAGE_KEYS.AUTH_SESSION) ?? sessionOnlyStorage.get<User>(STORAGE_KEYS.AUTH_SESSION);
        dispatch({ type: 'SESSION_RESOLVED', user: persistReducer });
    }, []);

    const handleLogin = async (credentials: LoginCredentials): Promise<void> => {


        try {
            const user = await login(credentials);
            // Simpan ke storage sesuai pilihan Remember Me.
            if (credentials.rememberMe) {
                storage.set(STORAGE_KEYS.AUTH_SESSION, user);
            } else {
                sessionOnlyStorage.set(STORAGE_KEYS.AUTH_SESSION, user);
            }

            dispatch({ type: 'LOGIN_SUCCESS', user });

        } catch {
            console.log("login faileds");

        }

    };

    const handleRegister = async (payload: RegisterPayload): Promise<void> => {
        try {
            // register TIDAK auto-login.
            // Fungsi ini hanya meneruskan ke service; AuthState tidak berubah.
            await register(payload);

        } catch {
            console.log("error login");
        }
    };

    const handleLogout = async () => {

        try {
            await logout();

        } catch {
            console.log("failed logout");
        }

    };

    const value: AuthContextInterface = {
        authState: authState,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister

    };

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);


};

export default AuthProvider;