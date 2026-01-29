import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, User, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();
    const [sheet, setSheet] = useState(null);

    const openSheet = (type) => {
        const contentMap = {
            account: {
                title: 'アカウント設定',
                body: 'ダミー画面です。プロフィール編集やメール変更などの設定項目がここに表示されます。'
            },
            notifications: {
                title: '通知設定',
                body: 'ダミー画面です。回収リマインドやポイント通知のON/OFFを設定できます。'
            },
            help: {
                title: 'ヘルプ・お問い合わせ',
                body: 'ダミー画面です。よくある質問や問い合わせフォームへの導線がここに表示されます。'
            }
        };

        setSheet(contentMap[type]);
    };

    return (
        <div className="page">
            <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--text-500))', padding: '4px' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="page-title">マイページ</h1>
            </header>

            <div className="profile-meta">
                <div className="profile-avatar">
                    <User size={40} />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{user.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'hsl(var(--text-500))', marginTop: '4px' }}>
                    <MapPin size={14} />
                    <span style={{ fontSize: '13px' }}>{user.address}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '14px' }}>
                <div className="list-card">
                    <button type="button" className="list-row" onClick={() => openSheet('account')}>
                        <span>アカウント設定</span>
                        <ArrowRightIcon />
                    </button>
                     <button type="button" className="list-row" onClick={() => openSheet('notifications')}>
                        <span>通知設定</span>
                        <ArrowRightIcon />
                    </button>
                     <button type="button" className="list-row" onClick={() => openSheet('help')}>
                        <span>ヘルプ・お問い合わせ</span>
                        <ArrowRightIcon />
                    </button>
                </div>

                <button className="button button--outline" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <LogOut size={18} />
                        ログアウト
                    </span>
                </button>
            </div>

            {sheet && (
                <div className="sheet-overlay" onClick={() => setSheet(null)}>
                    <div className="sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="sheet-header">
                            <div className="sheet-title">{sheet.title}</div>
                            <button type="button" className="sheet-close" onClick={() => setSheet(null)}>
                                閉じる
                            </button>
                        </div>
                        <div className="sheet-body">{sheet.body}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
        <path d="M9 18l6-6-6-6" />
    </svg>
)

export default Profile;
