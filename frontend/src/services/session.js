const SESSION_KEY = 'aquatrack_session';

export const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { sessionStorage.removeItem(SESSION_KEY); return null; }
};
export const saveSession = (session) => { if (session?.token) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); return session; };
export const getRole = () => getSession()?.role || null;
export const isAuthenticated = () => Boolean(getSession()?.token);
export const clearSession = () => sessionStorage.removeItem(SESSION_KEY);
