import api from './api';
import { saveSession as persistSession } from './session';

export const login = async (credentials) => (await api.post('/auth/login', credentials)).data;
export const register = async (details) => (await api.post('/auth/register', details)).data;
export const saveSession = (response) => persistSession(response?.data || response);
