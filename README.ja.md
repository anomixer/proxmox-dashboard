# Proxmox VE ダッシュボード <sub>v0.1</sub>

シンプルでモダンなレスポンシブ Proxmox VE ダッシュボードで、直感的なノード、仮想マシン、コンテナ監視インターフェースを提供します。

![Proxmox Dashboard](https://img.shields.io/badge/Proxmox-VE%20Dashboard-blue?style=for-the-badge&logo=proxmox)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 📸 スクリーンショット

![Proxmox Dashboard スクリーンショット](./public/screenshot_ja.png)

## ✨ 機能特色

### 🖥️ 監視機能
- **リアルタイムノード監視**：CPU、メモリ使用率、ノード状態
- **仮想マシン管理**：VM 状態、リソース使用状況、リアルタイム更新
- **LXC コンテナ管理**：コンテナ状態監視とリソース統計
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
   - `Datacenter` → `Permissions` → `API Tokens` に移動
   - 新しい Token を作成（推奨形式：`root@pam!dashboard-token`）

2. **接続情報の設定**
   - 初回起動時に自動的に設定ダイアログが表示されます
   - Proxmox ホスト IP アドレスを入力（例：192.168.1.100）
   - Token 名を入力（例：root@pam!token-name）
   - Token 値を入力（API Token の秘密鍵、例：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）
   - 「接続テスト」をクリックして接続を確認
   - 「保存して開始」をクリック

## 📖 使用方法

### 主要機能

#### ノード監視
- すべての Proxmox ノードの状態を表示
- リアルタイムの CPU とメモリ使用率
- ノードカードをクリックして状態を更新

#### 仮想マシン管理
- すべての VM と LXC コンテナを表示
- 状態インジケーター（実行中/停止）- 実行中の VM が優先表示
- リソース使用統計
- カードをクリックして個別項目を更新

#### 設定管理
- 右上の「⚙️ 設定」ボタンをクリック
- Proxmox 接続情報を変更可能
- 接続テスト機能をサポート

### テーマと言語
- **テーマ切り替え**：「🌙 テーマ」ボタンをクリック
- **言語切り替え**：「🇯🇵 言語」ボタンをクリックして循環切り替え

## 🛠️ 技術アーキテクチャ

### バックエンド技術
- **Node.js**：サーバー実行環境
- **Express.js**：Web フレームワーク
- **Axios**：HTTP クライアント
- **File System**：設定ファイル管理

### フロントエンド技術
- **ネイティブ JavaScript**：フレームワーク依存なし
- **CSS3**：モダンなスタイルとアニメーション
- **HTML5**：セマンティックマークアップ
- **Responsive Design**：レスポンシブレイアウト

### API エンドポイント
- `