import React from 'react';
import './AvatarSelector.css';

const AvatarSelector = ({ isOpen, onClose, onSelect, currentAvatar }) => {
  // 異なる色のアバター画像を使用
  const avatars = [
    { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'デフォルト' },
    { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター1' },
    { id: 3, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター2' },
    { id: 4, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター3' },
    { id: 5, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター4' },
    { id: 6, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター5' },
    { id: 7, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター6' },
    { id: 8, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター7' },
    { id: 9, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター8' },
    { id: 10, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター9' },
    { id: 11, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター10' },
    { id: 12, src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', name: 'アバター11' }
  ];

  if (!isOpen) return null;

  const handleAvatarClick = (avatar) => {
    onSelect(avatar);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 現在選択されているアバターのIDを取得
  const getCurrentAvatarId = () => {
    const currentAvatarItem = avatars.find(avatar => avatar.src === currentAvatar);
    return currentAvatarItem ? currentAvatarItem.id : 1; // デフォルトは1
  };

  const currentAvatarId = getCurrentAvatarId();

  return (
    <div className="avatar-selector-overlay" onClick={handleOverlayClick}>
      <div className="avatar-selector-modal">
        <div className="avatar-selector-header">
          <h3>プロフィール画像を選択</h3>
          <button className="avatar-selector-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="avatar-selector-content">
          <div className="avatar-grid">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`avatar-item ${currentAvatarId === avatar.id ? 'selected' : ''}`}
                onClick={() => handleAvatarClick(avatar)}
              >
                <div 
                  className="avatar-item__image"
                  style={{
                    backgroundColor: `hsl(${(avatar.id - 1) * 30}, 70%, 60%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  {avatar.id}
                </div>
                <span className="avatar-item__name">{avatar.name}</span>
                {currentAvatarId === avatar.id && (
                  <div className="avatar-item__checkmark">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="avatar-selector-footer">
          <button className="avatar-selector-cancel" onClick={onClose}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector; 