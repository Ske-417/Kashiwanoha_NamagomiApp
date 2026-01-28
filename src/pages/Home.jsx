import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import AnimatedCounter from '../components/AnimatedCounter';
import { Leaf, Recycle, Users, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user, stats } = useAppContext();

    return (
        <div className="container pb-24">
            {/* Header Section */}
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">こんにちは</p>
                    <h1 className="text-xl font-bold">{user.name}さん</h1>
                </div>
                <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-yellow-600 font-bold">★</span>
                    <span className="text-yellow-800 font-bold">{user.points} pt</span>
                </div>
            </header>

            {/* Main Call to Action - Visualization of Personal Impact */}
            <section className="mb-6">
                <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">個人の貢献</h2>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-100">
                   <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-green-500 rounded-lg text-white">
                           <Leaf size={20} />
                       </div>
                       <div>
                           <div className="text-xs text-green-800 opacity-80">資源化した生ごみ</div>
                           <div className="text-2xl font-bold text-green-900">{user.totalSavedKg} <span className="text-sm font-normal">kg</span></div>
                       </div>
                   </div>
                   
                   <div className="space-y-3">
                        <div className="bg-white/60 rounded-xl p-3 flex items-center gap-3">
                            <Sprout size={18} className="text-secondary" />
                            <div className="text-sm text-gray-700">
                                畑 <span className="font-bold text-secondary">{(user.totalSavedKg * 0.5).toFixed(1)}㎡</span> 分の栄養になりました
                            </div>
                        </div>
                   </div>
                </Card>
            </section>

            {/* Regional Impact - The "Show" not just "Tell" part */}
            <section className="mb-8">
               <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">地域の循環ステータス</h2>
               <div className="grid grid-cols-2 gap-4">
                   <Card delay={0.1}>
                       <Recycle size={24} className="text-blue-500 mb-2" />
                       <AnimatedCounter value={stats.regionalTotalKg} unit="kg" label="地域全体の循環量" color="text-text" />
                   </Card>
                   <Card delay={0.2}>
                       <Users size={24} className="text-orange-500 mb-2" />
                       <AnimatedCounter value={stats.householdEquivalent} unit="世帯" label="参加世帯の廃棄分" color="text-text" />
                   </Card>
               </div>
               <Card className="mt-4" delay={0.3}>
                   <div className="flex items-center justify-between">
                       <div>
                           <div className="text-sm text-gray-500">CO2削減効果</div>
                           <div className="text-xl font-bold text-green-700">{stats.co2Reduced} <span className="text-sm">kg-CO2</span></div>
                           <div className="text-xs text-gray-400 mt-1">スギの木 約{(stats.co2Reduced / 14).toFixed(0)}本分の年間吸収量</div>
                       </div>
                       <div className="p-3 bg-green-100 rounded-full text-green-600">
                           <Leaf size={24} />
                       </div>
                   </div>
               </Card>
            </section>

            {/* Quick Action */}
            <Link to="/scan" className="no-underline">
                <div className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-green-900/20 flex items-center justify-between transform transition-transform active:scale-98">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Recycle size={24} />
                        </div>
                        <div>
                            <div className="font-bold">生ごみを記録する</div>
                            <div className="text-xs text-green-100">今日のアクションを記録しましょう</div>
                        </div>
                    </div>
                    <ArrowRight />
                </div>
            </Link>
        </div>
    );
};

export default Home;
