import React from 'react';
import { useAppContext } from '../context/AppContext';
import {ArrowLeft, Leaf, Recycle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const { history } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="page">
            <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">活動履歴</h1>
            </header>

            <div className="history-list">
                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'hsl(var(--text-500))', padding: '24px 0' }}>まだ履歴がありません</div>
                ) : (
                    history.map((item) => (
                        <div key={item.id} className="history-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div
                                  className="history-icon"
                                  style={{
                                    background: item.type === 'waste' ? 'rgba(22, 143, 94, 0.16)' : 'rgba(245, 158, 11, 0.18)',
                                    color: item.type === 'waste' ? 'hsl(var(--green-600))' : 'hsl(var(--orange-500))'
                                  }}
                                >
                                    {item.type === 'waste' ? <Recycle size={20} /> : <Leaf size={20} />}
                                </div>
                                <div className="history-meta">
                                    <div style={{ fontWeight: 700 }}>
                                        {item.type === 'waste' ? '生ごみ回収' : '堆肥提供'}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'hsl(var(--text-500))' }}>{item.date}</div>
                                </div>
                            </div>
                            <div className="history-amount">
                                {item.amount}<span style={{ fontSize: '12px', fontWeight: 500 }}>kg</span>
                                <div style={{ fontSize: '12px', color: 'hsl(var(--gold-500))', marginTop: '2px' }}>+{item.points} pt</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
