import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // ダミーユーザーデータ
  const user = {
    name: '田中太郎',
    email: 'tanaka@example.com',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    membership: 'プレミアム',
    joinDate: '2023年1月',
    watchHistory: [
      { id: 1, title: 'ストレンジャー・シングス', type: 'TV', lastWatched: '2024年1月15日' },
      { id: 2, title: 'アベンジャーズ', type: 'Movie', lastWatched: '2024年1月10日' },
      { id: 3, title: 'ブリジャートン家', type: 'TV', lastWatched: '2024年1月5日' }
    ],
    myList: [
      { id: 1, title: 'ウィッチャー', type: 'TV' },
      { id: 2, title: 'ダーク', type: 'TV' },
      { id: 3, title: 'インセプション', type: 'Movie' }
    ]
  };

  const handleLogout = () => {
    // ログアウト処理（実際のアプリでは認証状態をクリア）
    navigate('/');
  };

  return (
    <div className="my-account">
      <div className="my-account__header">
        <button 
          onClick={() => navigate('/')} 
          className="my-account__back-button"
        >
          ← 戻る
        </button>
        <h1>マイアカウント</h1>
      </div>

      <div className="my-account__content">
        <div className="my-account__sidebar">
          <div className="my-account__profile">
            <img 
              src={user.avatar} 
              alt="プロフィール画像" 
              className="my-account__avatar"
            />
            <h2>{user.name}</h2>
            <p className="my-account__email">{user.email}</p>
            <div className="my-account__membership">
              <span className="membership-badge">{user.membership}</span>
            </div>
          </div>

          <nav className="my-account__nav">
            <button 
              className={`my-account__nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              📋 プロフィール
            </button>
            <button 
              className={`my-account__nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              📺 視聴履歴
            </button>
            <button 
              className={`my-account__nav-item ${activeTab === 'mylist' ? 'active' : ''}`}
              onClick={() => setActiveTab('mylist')}
            >
              ❤️ マイリスト
            </button>
            <button 
              className={`my-account__nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ 設定
            </button>
          </nav>

          <button 
            onClick={handleLogout}
            className="my-account__logout-button"
          >
            🚪 ログアウト
          </button>
        </div>

        <div className="my-account__main">
          {activeTab === 'profile' && (
            <div className="my-account__section">
              <h3>プロフィール情報</h3>
              <div className="profile-info">
                <div className="profile-item">
                  <label>名前</label>
                  <input type="text" defaultValue={user.name} />
                </div>
                <div className="profile-item">
                  <label>メールアドレス</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="profile-item">
                  <label>メンバーシップ</label>
                  <span className="membership-info">{user.membership}</span>
                </div>
                <div className="profile-item">
                  <label>加入日</label>
                  <span>{user.joinDate}</span>
                </div>
                <button className="save-button">変更を保存</button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="my-account__section">
              <h3>視聴履歴</h3>
              <div className="history-list">
                {user.watchHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <div className="history-item__info">
                      <h4>{item.title}</h4>
                      <p>{item.type} • 最後に視聴: {item.lastWatched}</p>
                    </div>
                    <button className="history-item__button">続きを見る</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mylist' && (
            <div className="my-account__section">
              <h3>マイリスト</h3>
              <div className="mylist-grid">
                {user.myList.map(item => (
                  <div key={item.id} className="mylist-item">
                    <div className="mylist-item__poster">
                      <img 
                        src={`https://image.tmdb.org/t/p/w200/poster-placeholder.jpg`}
                        alt={item.title}
                      />
                    </div>
                    <div className="mylist-item__info">
                      <h4>{item.title}</h4>
                      <p>{item.type}</p>
                    </div>
                    <button className="mylist-item__remove">削除</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="my-account__section">
              <h3>設定</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-item__info">
                    <h4>通知設定</h4>
                    <p>新しいコンテンツの通知を受け取る</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-item__info">
                    <h4>自動再生</h4>
                    <p>次のエピソードを自動再生する</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-item__info">
                    <h4>字幕</h4>
                    <p>字幕を自動的に表示する</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-item__info">
                    <h4>データ使用量</h4>
                    <p>高画質での再生を許可する</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount; 