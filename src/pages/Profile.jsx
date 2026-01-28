import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, User, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Profile = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="container pb-24">
            <header className="py-4 flex items-center gap-4 mb-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">マイページ</h1>
            </header>

            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <User size={40} />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{user.address}</span>
                </div>
            </div>

            <div className="space-y-4">
                <Card className="!p-0 overflow-hidden divide-y divide-gray-100">
                    <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                        <span>アカウント設定</span>
                        <ArrowRightIcon />
                    </div>
                     <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                        <span>通知設定</span>
                        <ArrowRightIcon />
                    </div>
                     <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                        <span>ヘルプ・お問い合わせ</span>
                        <ArrowRightIcon />
                    </div>
                </Card>

                <button className="w-full py-3 text-red-500 font-bold bg-red-50 rounded-xl flex items-center justify-center gap-2 mt-8">
                    <LogOut size={18} />
                    ログアウト
                </button>
            </div>
        </div>
    );
};

const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
        <path d="M9 18l6-6-6-6" />
    </svg>
)

export default Profile;
