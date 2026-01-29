import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrCode, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const BarcodeScan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addEntry } = useAppContext();
  const amount = location.state?.amount ?? null;
  const [isScanning, setIsScanning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleComplete = async () => {
    if (isScanning) return;
    setIsScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (amount) {
      addEntry('waste', amount);
    }

    setIsDone(true);
    setTimeout(() => {
      navigate('/');
    }, 1400);
  };

  return (
    <div className="page">
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="page-title">施設管理コード読み取り</h1>
      </header>

      <AnimatePresence>
        {isDone ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              style={{ color: 'hsl(var(--green-600))', marginBottom: '16px' }}
            >
              <CheckCircle2 size={72} />
            </motion.div>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>読み取り完了</div>
            <div style={{ fontSize: '13px', color: 'hsl(var(--text-600))' }}>記録を確定しました</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <Card className="card--center">
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '24px',
                  margin: '0 auto 16px',
                  background: 'linear-gradient(145deg, rgba(22,143,94,0.12), rgba(22,143,94,0.02))',
                  border: '1px dashed rgba(22,143,94,0.35)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'hsl(var(--green-600))'
                }}
              >
                <QrCode size={48} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                管理者コードを読み取ってください
              </div>
              <div style={{ fontSize: '12px', color: 'hsl(var(--text-600))' }}>
                虚偽申請防止のため、施設管理者のコード読み取りが必要です。
                <br />
                この画面はデモです。読み取り完了ボタンで進みます。
              </div>
            </Card>

            <Button onClick={handleComplete} disabled={isScanning}>
              {isScanning ? '読み取り中...' : '読み取り完了'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BarcodeScan;