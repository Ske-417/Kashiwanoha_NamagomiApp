import React from 'react';
import { useAppContext } from '../context/AppContext';
import {ArrowLeft, Leaf, Recycle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const { history } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="container pb-24">
            <header className="py-4 flex items-center gap-4 mb-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">活動履歴</h1>
            </header>

            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">まだ履歴がありません</div>
                ) : (
                    history.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${item.type === 'waste' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {item.type === 'waste' ? <Recycle size={20} /> : <Leaf size={20} />}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800">
                                        {item.type === 'waste' ? '生ごみ回収' : '堆肥提供'}
                                    </div>
                                    <div className="text-xs text-gray-500">{item.date}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg">{item.amount}<span className="text-xs font-normal">kg</span></div>
                                <div className="text-xs font-bold text-yellow-600">+{item.points} pt</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
