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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!amount) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        addEntry('waste', amount);
        setIsSubmitting(false);
        setShowSuccess(true);

        // Auto redirect after success animation
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="container min-h-screen bg-gray-50 flex flex-col">
            <header className="py-4 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">回収記録</h1>
            </header>

            <AnimatePresence>
                {showSuccess ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center text-center p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="text-green-500 mb-6"
                        >
                            <CheckCircle2 size={80} />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">記録完了！</h2>
                        <p className="text-gray-500">ナイスアクション！<br/>ポイントを獲得しました。</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col"
                    >
                        <Card className="mb-6 flex-1 flex flex-col justify-center items-center py-12">
                            <div className="bg-green-100 p-6 rounded-full text-green-600 mb-6">
                                <Scale size={48} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-8">生ごみの重さを入力</h2>
                            
                            <div className="flex items-baseline gap-2 mb-8 relative">
                                <input 
                                    type="number" 
                                    value={amount} 
                                    onChange={(e) => setAmount(e.target.value)} 
                                    className="text-5xl font-bold text-center w-40 bg-transparent border-b-2 border-green-500 focus:outline-none focus:border-green-700 transition-colors p-2"
                                    placeholder="0.0"
                                    step="0.1"
                                    autoFocus
                                />
                                <span className="text-xl text-gray-500 font-bold absolute right-4 bottom-4">kg</span>
                            </div>
                        </Card>

                        <div className="mt-auto mb-8">
                            <Button 
                                onClick={handleSubmit} 
                                disabled={!amount || isSubmitting}
                                className={isSubmitting ? "opacity-80" : ""}
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
