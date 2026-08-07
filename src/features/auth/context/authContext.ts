import type { AuthContextInterface } from '../types/auth.types';
import {createContext} from 'react'


export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)