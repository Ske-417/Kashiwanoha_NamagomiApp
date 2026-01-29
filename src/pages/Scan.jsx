import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { motion, AnimatePresence } from 'framer-motion';

const Scan = () => {
    const { addEntry } = useAppContext();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const numericAmount = parseFloat(amount);
    const canSubmit = !Number.isNaN(numericAmount) && numericAmount > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        addEntry('waste', numericAmount);
        setIsSubmitting(false);
        setShowSuccess(true);

        // Auto redirect after success animation
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="page">
            <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">回収記録</h1>
            </header>

            <AnimatePresence>
                {showSuccess ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            style={{ color: 'hsl(var(--green-600))', marginBottom: '24px' }}
                        >
                            <CheckCircle2 size={80} />
                        </motion.div>
                        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>記録完了！</h2>
                        <p style={{ color: 'hsl(var(--text-600))' }}>ナイスアクション！<br/>ポイントを獲得しました。</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                        <Card className="card--center">
                            <div className="history-icon" style={{ width: '64px', height: '64px', background: 'rgba(22, 143, 94, 0.16)', color: 'hsl(var(--green-600))', margin: '0 auto 16px' }}>
                                <Scale size={48} />
                            </div>
                            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>生ごみの重さを入力</h2>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'center', position: 'relative' }}>
                                <input 
                                    type="number" 
                                    value={amount} 
                                    onChange={(e) => setAmount(e.target.value)} 
                                    className="weight-input"
                                    placeholder="0.0"
                                    step="0.1"
                                    autoFocus
                                />
                                <span style={{ fontSize: '16px', color: 'hsl(var(--text-500))', fontWeight: 700, position: 'absolute', right: '-4px', bottom: '8px' }}>kg</span>
                            </div>
                        </Card>

                        <div style={{ marginTop: 'auto' }}>
                            <Button 
                                onClick={handleSubmit} 
                                disabled={!canSubmit || isSubmitting}
                            >
                                {isSubmitting ? '送信中...' : '記録する'}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Scan;
