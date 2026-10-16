import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LoaderCircle, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import FormField from '../components/FormField';
import StatusMessage from '../components/StatusMessage';
import { login, saveSession } from '../services/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' }); const [show, setShow] = useState(false); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate(); const location = useLocation();
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { saveSession(await login(form)); navigate('/login', { replace: true, state: { message: 'Signed in successfully.' } }); } catch (requestError) { setError(requestError.response?.status === 401 ? 'Your email or password is incorrect.' : requestError.response?.data?.message || requestError.message || 'Unable to sign in.'); setLoading(false); } };
  return <AuthLayout title="Welcome back" description="Sign in to manage your community water workspace."><form className="auth-form" onSubmit={submit}>{location.state?.message && <StatusMessage>{location.state.message}</StatusMessage>}<FormField label="Email address" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /><label className="field"><span>Password</span><div className="password-field"><input type={show ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>{error && <StatusMessage type="error">{error}</StatusMessage>}<button className="primary-button full-width" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18} /> : <LogIn size={18} />}{loading ? 'Signing in...' : 'Sign in'}<ArrowRight size={17} /></button></form><p className="auth-switch">Need an account? <Link to="/register">Register here</Link></p></AuthLayout>;
}
