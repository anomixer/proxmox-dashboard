# Proxmox VE ダッシュボード

シンプルでモダンなレスポンシブ Proxmox VE ダッシュボード。ノード、仮想マシン、コンテナの監視インターフェースを直感的に提供します。

[![Proxmox Dashboard](https://img.shields.io/badge/Proxmox-VE%20Dashboard-blue?style=for-the-badge&logo=proxmox)](README.md)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](README.md)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## 📸 スクリーンショット

![Proxmox Dashboard スクリーンショット](./public/screenshot_ja.png)

## 🌍 利用可能な言語

- [English](README.md) (デフォルト)
- [繁體中文](README.zh-TW.md)
- [简体中文](README.zh-CN.md)
- [日本語](README.ja.md)
- [한국어](README.ko.md)

## ✨ 機能一覧

### 🖥️ 監視機能
- **リアルタイムノード監視**：CPU、メモリ使用率、ノード状態
- **仮想マシン・コンテナ監視**：VM/LXC 状態、リソース使用状況、リアルタイム更新
- **自動更新**：15秒ごとにデータ自動更新

### 🎨 ユーザーインターフェース
- **レスポンシブデザイン**：デスクトップ、タブレット、スマートフォンなど様々なデバイス対応
- **ダーク/ライトテーマ**：切り替え可能なモダンテーマ
- **多言語サポート**：繁体字中国語、簡体字中国語、英語、日本語、韓国語
- **直感的な操作**：カードをクリックして個別項目の状態を更新

### ⚙️ 設定管理
- **初回実行時設定**：自動的に設定ダイアログを表示
- **接続テスト**：設定前に Proxmox 接続テスト可能
- **設定の永続化**：設定は `settings.json` に保存
- **動的設定**：再起動なしで新しい設定を適用

## 🚀 クイックスタート

### システム要件
- Node.js 18+ 
- Proxmox VE サーバーへのネットワーク接続
- Proxmox VE API トークン

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

4. **ブラウザで開く**
   `http://localhost:3000` にアクセス

### 初回設定

1. **Proxmox API トークンの取得**
   - Proxmox VE Web インターフェースにログイン
   - `Datacenter` → `Permissions` → `API Tokens` へ移動
   - 新しいトークンを作成（Token ID: token-name、「権限分離(Privilege Separation)」のチェックを外し、「追加(Add)」をクリック）
   - トークンシークレットを安全な場所に保存（Token ID: root@pam!token-name、「シークレット値をコピー(Copy Secret Value)」をクリック）

2. **接続情報の設定**
   - 初回起動時に自動で設定ダイアログが表示されます
   - Proxmox VE ホストの IP アドレスを入力（例：192.168.1.100）
   - トークン名を入力（例：root@pam!token-name）
   - トークン値を入力（API トークンシークレット、例：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）
   - 「接続テスト」をクリックして接続確認
   - 「保存して開始」をクリック

## 📖 利用ガイド

### 主な機能

#### ノード監視
- すべての Proxmox VE ノード状態を表示
- リアルタイム CPU・メモリ使用率
- ノードカードをクリックして状態更新

#### 仮想マシン・コンテナ監視
- すべての VM および LXC コンテナを表示
- 状態インジケーター（稼働中/停止中）- 稼働中が優先表示
- リソース使用統計
- カードをクリックして個別項目を更新

#### 設定管理
- 右上の「⚙️ 設定」ボタンをクリック
- Proxmox VE 接続情報を編集
- 接続テスト対応

### テーマと多言語
- **テーマ切替**：「🌙 テーマ」ボタンをクリック
- **言語切替**：「🇯🇵 言語」ボタンをクリックして循環切替

## 🛠️ 技術構成

### バックエンド技術
- **Node.js**：サーバーランタイム
- **Express.js**：Web フレームワーク
- **Axios**：HTTP クライアント
- **File System**：設定ファイル管理

### フロントエンド技術
- **ネイティブ JavaScript**：フレームワーク依存なし
- **CSS3**：モダンなスタイルとアニメーション
- **HTML5**：セマンティックマークアップ
- **レスポンシブデザイン**：自動レイアウト

### API エンドポイント
- `GET /api/status` - ノードと VM の状態取得
- `GET /api/settings` - 現在の設定取得
- `POST /api/settings` - 設定更新
- `POST /api/test-connection` - 接続テスト
- `GET /api/check-first-run` - 初回実行確認

## 📁 プロジェクト構成

```
proxmox-dashboard/
├── server.js              # メインサーバーファイル
├── package.json           # プロジェクト設定
├── settings.json          # 設定ファイル（自動生成）
├── README.md              # プロジェクトドキュメント
├── public/                # 静的ファイル
│   ├── index.html         # メインページ
│   ├── script.js          # フロントエンドロジック
│   ├── style.css          # スタイルファイル
│   └── *.svg              # Proxmox ロゴ
└── node_modules/          # 依存パッケージ
```

## 🔧 設定ファイル

### 設定ファイル形式（`settings.json`）
```json
{
  "proxmox_host": "192.168.1.100",
  "proxmox_token_name": "root@pam!token-name",
  "proxmox_token_value": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### 環境変数
現在サポートされている環境変数：
- `PORT`：サーバーポート番号（デフォルト：3000）

## 🐛 トラブルシューティング

### よくある質問

**Q: Proxmox サーバーに接続できない**
- Proxmox ホストの IP アドレスが正しいか確認
- ファイアウォール設定を確認（ポート 8006）
- API トークンの権限が十分か確認

**Q: 設定ダイアログが表示されない**
- ブラウザキャッシュをクリア
- `settings.json` ファイルが存在しないことを確認
- ブラウザの Console エラーを確認

**Q: データが更新されない**
- ネットワーク接続を確認
- Proxmox API トークンが有効か確認
- サーバー Console のエラーを確認

### デバッグモード
ブラウザの開発者ツール（F12）を開き、Console タブのエラーを確認してください。

## 🤝 コントリビュート

Issue や Pull Request の提出を歓迎します！

### 開発環境セットアップ
1. プロジェクトを Fork
2. 機能ブランチ作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. ブランチをプッシュ：`git push origin feature/amazing-feature`
5. Pull Request を作成

### コードスタイル
- 2スペースインデントを使用
- ESLint ルールに従う
- 適切なコメントを追加

## 📄 ライセンス

本プロジェクトは MIT ライセンスの下で公開されています - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- [Proxmox VE](https://www.proxmox.com/) - 優れた仮想化プラットフォーム
- [Node.js](https://nodejs.org/) - JavaScript ランタイム
- [Express.js](https://expressjs.com/) - Web アプリケーションフレームワーク

---

⭐ このプロジェクトが役立ったら Star をお願いします！

---

**このアプリは [Cursor](https://github.com/cursor/cursor) と [Gemini-CLI](https://github.com/google-gemini/gemini-cli) の協力で作成されました**