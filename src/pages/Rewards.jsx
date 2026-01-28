import React from 'react';
import { ArrowLeft, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const Rewards = () => {
    const navigate = useNavigate();
    const { user } = useAppContext();

    const RewardItem = ({ title, points, color }) => (
        <Card className="flex items-center justify-between !p-3">
             <div className="flex items-center gap-3">
                 <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white`}>
                     <Gift size={20}/>
                 </div>
                 <div>
                     <div className="font-bold text-sm">{title}</div>
                     <div className="text-xs text-gray-500">{points} pt</div>
                 </div>
             </div>
             <button className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-bold">
                 交換
             </button>
        </Card>
    );

    return (
        <div className="container pb-24">
             <header className="py-4 flex items-center gap-4 mb-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">ポイント交換</h1>
            </header>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 flex justify-between items-center">
                <span className="text-yellow-800 font-bold">現在のポイント</span>
                <span className="text-2xl font-bold text-yellow-900">{user.points} pt</span>
            </div>

            <h2 className="font-bold text-gray-700 mb-4">チケットに交換</h2>
            <div className="space-y-3 mb-8">
                 <RewardItem title="地元野菜 100円OFF" points="500" color="bg-green-500" />
                 <RewardItem title="コーヒー 1杯無料" points="800" color="bg-amber-600" />
                 <RewardItem title="スーパー商品券 500円" points="2000" color="bg-blue-500" />
            </div>

             <h2 className="font-bold text-gray-700 mb-4">他社ポイントに交換</h2>
             <div className="space-y-3">
                 <RewardItem title="PayPayポイント" points="1000" color="bg-red-500" />
                 <RewardItem title="楽天ポイント" points="1000" color="bg-red-600" />
            </div>
        </div>
    );
};

export default Rewards;
