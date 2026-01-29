import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import AnimatedCounter from '../components/AnimatedCounter';
import { Leaf, Recycle, Users, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user, stats } = useAppContext();

    return (
        <div className="page">
            <header className="page-header">
                <div>
                    <p className="page-subtitle">こんにちは</p>
                    <h1 className="page-title">{user.name}さん</h1>
                </div>
                <div className="badge-points">
                    <span>★</span>
                    <span>{user.points} pt</span>
                </div>
            </header>

            <section>
                <h2 className="section-title">個人の貢献</h2>
                <Card className="card--soft">
                   <div className="impact-row">
                       <div className="history-icon" style={{ background: 'rgba(22, 143, 94, 0.16)', color: 'hsl(var(--green-600))' }}>
                           <Leaf size={20} />
                       </div>
                       <div>
                           <div style={{ fontSize: '12px', color: 'hsl(var(--text-600))' }}>資源化した生ごみ</div>
                           <div style={{ fontSize: '26px', fontWeight: 700, color: 'hsl(var(--green-600))' }}>
                               {user.totalSavedKg} <span style={{ fontSize: '12px', fontWeight: 500 }}>kg</span>
                           </div>
                       </div>
                   </div>

                   <div className="impact-chip">
                        <Sprout size={18} style={{ color: 'hsl(var(--green-500))' }} />
                        <div style={{ fontSize: '13px' }}>
                            畑 <span style={{ fontWeight: 700, color: 'hsl(var(--green-600))' }}>{(user.totalSavedKg * 0.5).toFixed(1)}㎡</span> 分の栄養になりました
                        </div>
                   </div>
                </Card>
            </section>

            <section>
               <h2 className="section-title">地域の循環ステータス</h2>
               <div className="stat-grid">
                   <Card delay={0.1}>
                       <Recycle size={22} style={{ color: 'hsl(var(--blue-500))', marginBottom: '8px' }} />
                       <AnimatedCounter value={stats.regionalTotalKg} unit="kg" label="地域全体の循環量" color="text" />
                   </Card>
                   <Card delay={0.2}>
                       <Users size={22} style={{ color: 'hsl(var(--orange-500))', marginBottom: '8px' }} />
                       <AnimatedCounter value={stats.householdEquivalent} unit="世帯" label="参加世帯の廃棄分" color="text" />
                   </Card>
               </div>
               <div style={{ marginTop: '14px' }}>
                   <Card className="card--soft" delay={0.3}>
                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                           <div>
                               <div style={{ fontSize: '12px', color: 'hsl(var(--text-600))' }}>CO2削減効果</div>
                               <div style={{ fontSize: '20px', fontWeight: 700, color: 'hsl(var(--green-600))' }}>
                                   {stats.co2Reduced} <span style={{ fontSize: '12px' }}>kg-CO2</span>
                               </div>
                               <div style={{ fontSize: '11px', color: 'hsl(var(--text-500))', marginTop: '4px' }}>
                                   スギの木 約{(stats.co2Reduced / 14).toFixed(0)}本分の年間吸収量
                               </div>
                           </div>
                           <div className="history-icon" style={{ background: 'rgba(22, 143, 94, 0.14)', color: 'hsl(var(--green-600))' }}>
                               <Leaf size={22} />
                           </div>
                       </div>
                   </Card>
               </div>
            </section>

            <Link to="/scan" className="quick-action">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="history-icon" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                        <Recycle size={22} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700 }}>生ごみを記録する</div>
                        <div style={{ fontSize: '12px', opacity: 0.8 }}>今日のアクションを記録しましょう</div>
                    </div>
                </div>
                <ArrowRight />
            </Link>
        </div>
    );
};

export default Home;
