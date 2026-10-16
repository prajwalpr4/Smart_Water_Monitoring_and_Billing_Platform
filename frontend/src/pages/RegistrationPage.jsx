import { useState } from 'react';
import { ArrowRight, LoaderCircle, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import FormField from '../components/FormField';
import StatusMessage from '../components/StatusMessage';
import { register, saveSession } from '../services/auth';

export default function RegistrationPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { saveSession(await register(form)); navigate('/login', { replace: true, state: { message: 'Account created successfully. Please sign in.' } }); } catch (requestError) { setError(requestError.response?.data?.message || requestError.message || 'Unable to create your account.'); setLoading(false); } };
  return <AuthLayout title="Create your account" description="Register as a resident to access your water account."><form className="auth-form" onSubmit={submit}><div className="form-grid"><FormField label="First name" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} required /><FormField label="Last name" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} required /></div><FormField label="Email address" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /><FormField label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength="6" required />{error && <StatusMessage type="error">{error}</StatusMessage>}<button className="primary-button full-width" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18} /> : <UserPlus size={18} />}{loading ? 'Creating account...' : 'Create resident account'}<ArrowRight size={17} /></button></form><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></AuthLayout>;
}
