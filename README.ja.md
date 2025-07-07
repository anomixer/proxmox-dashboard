# Proxmox VE ダッシュボード

シンプルでモダンなレスポンシブ Proxmox VE ダッシュボードで、直感的なノード、仮想マシン、コンテナ監視インターフェースを提供します。

![Proxmox Dashboard](https://img.shields.io/badge/Proxmox-VE%20Dashboard-blue?style=for-the-badge&logo=proxmox)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 📸 スクリーンショット

![Proxmox Dashboard スクリーンショット](./public/screenshot_ja.png)

## ✨ 機能特色

### 🖥️ 監視機能
- **リアルタイムノード監視**：CPU、メモリ使用率、ノード状態
- **仮想マシン・コンテナ監視**：VM/LXCの状態、リソース使用状況、リアルタイム更新
- **自動更新**：15秒ごとにデータを自動更新

### 🎨 ユーザーインターフェース
- **レスポンシブデザイン**：デスクトップ、タブレット、スマートフォンなど様々なデバイスをサポート
- **ダーク/ライトテーマ**：切り替え可能なモダンテーマ
- **多言語サポート**：繁体中国語、簡体中国語、英語、日本語、韓国語
- **直感的操作**：カードをクリックして個別項目の状態を更新

### ⚙️ 設定管理
- **初回実行設定**：自動的に設定ダイアログを表示
- **接続テスト**：設定前に Proxmox 接続をテスト
- **設定の永続化**：設定を `settings.json` に保存
- **動的設定**：再起動なしで新しい設定を適用

## 🚀 クイックスタート

### システム要件
- Node.js 18+ 
- Proxmox VE サーバーへのネットワーク接続
- Proxmox VE API Token

### インストール手順

1. **プロジェクトのクローン**
   ```bash
   git clone https://github.com/anomixer/proxmox-dashboard.git
   cd proxmox-dashboard
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **サービスの起動**
   ```bash
   node server.js
   ```

4. **ブラウザを開く**
   `http://localhost:3000` にアクセス

### 初回設定

1. **Proxmox API Token の取得**
   - Proxmox VE Web インターフェースにログイン
   - `Datacenter` → `Permissions` → `API Tokens`
   - 新しい Token を作成（Token ID: dashboard-token、「Privilege Separation」のチェックを外し、「Add」をクリック）
   - Token Secret を安全な場所に保存（Token ID: root@pam!dashboard-token、「Copy Secret Value」をクリック）