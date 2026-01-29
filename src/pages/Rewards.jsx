import React, { useState } from 'react';
import { ArrowLeft, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Rewards = () => {
    const navigate = useNavigate();
    const { user, redeemPoints } = useAppContext();
    const [notice, setNotice] = useState(null);

    const rewards = [
        { title: "地元野菜 100円OFF", points: 500, color: "hsl(var(--green-600))", category: "ticket" },
        { title: "コーヒー 1杯無料", points: 800, color: "hsl(var(--orange-500))", category: "ticket" },
        { title: "スーパー商品券 500円", points: 2000, color: "hsl(var(--blue-500))", category: "ticket" },
        { title: "PayPayポイント", points: 1000, color: "#ef4444", category: "partner" },
        { title: "楽天ポイント", points: 1000, color: "#dc2626", category: "partner" },
    ];

    const handleRedeem = (reward) => {
        const success = redeemPoints(reward.points);
        if (success) {
            setNotice({ type: 'success', message: `${reward.title} に交換しました（-${reward.points} pt）`, phase: 'enter' });
        } else {
            setNotice({ type: 'error', message: 'ポイントが不足しています', phase: 'enter' });
        }

        setTimeout(() => {
            setNotice((prev) => (prev ? { ...prev, phase: 'exit' } : prev));
        }, 1800);

        setTimeout(() => setNotice(null), 2100);
    };

    const RewardItem = ({ reward }) => {
        const { title, points, color } = reward;
        return (
        <div className="reward-item">
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div className="reward-icon" style={{ background: color }}>
                     <Gift size={20}/>
                 </div>
                 <div>
                     <div style={{ fontWeight: 700, fontSize: '14px' }}>{title}</div>
                     <div style={{ fontSize: '12px', color: 'hsl(var(--text-500))' }}>{points} pt</div>
                 </div>
             </div>
            <button
                className="reward-cta"
                onClick={() => handleRedeem(reward)}
                disabled={user.points < points}
                style={user.points < points ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
                交換
            </button>
        </div>
        );
    };

    return (
        <div className="page">
             <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">ポイント交換</h1>
            </header>
            
            {notice && (
                <div className={`toast toast--${notice.type} ${notice.phase === 'exit' ? 'is-exit' : ''}`}>
                    {notice.message}
                </div>
            )}

            <div className="soft-panel">
                <span style={{ fontWeight: 700 }}>現在のポイント</span>
                <span style={{ fontSize: '22px', fontWeight: 700 }}>{user.points} pt</span>
            </div>

            <h2 style={{ fontWeight: 700, color: 'hsl(var(--text-600))' }}>チケットに交換</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
                      {rewards.filter((r) => r.category === 'ticket').map((reward) => (
                          <RewardItem key={reward.title} reward={reward} />
                      ))}
            </div>

             <h2 style={{ fontWeight: 700, color: 'hsl(var(--text-600))', marginTop: '18px' }}>他社ポイントに交換</h2>
             <div style={{ display: 'grid', gap: '10px' }}>
                      {rewards.filter((r) => r.category === 'partner').map((reward) => (
                          <RewardItem key={reward.title} reward={reward} />
                      ))}
            </div>
        </div>
    );
};

export default Rewards;
