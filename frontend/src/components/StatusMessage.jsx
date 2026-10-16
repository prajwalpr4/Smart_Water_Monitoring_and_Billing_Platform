import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
export default function StatusMessage({ type = 'info', children }) { const Icon = type === 'error' ? AlertCircle : type === 'success' ? CheckCircle2 : Info; return <div className={`status-message status-${type}`}><Icon size={18} /><span>{children}</span></div>; }
