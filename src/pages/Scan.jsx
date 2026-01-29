import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const Scan = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const numericAmount = parseFloat(amount);
    const canSubmit = !Number.isNaN(numericAmount) && numericAmount > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setIsSubmitting(false);
        navigate('/scan/verify', { state: { amount: numericAmount } });
    };

    return (
        <div className="page">
            <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">回収記録</h1>
            </header>

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
        </div>
    );
};

export default Scan;
