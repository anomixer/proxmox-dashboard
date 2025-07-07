# Proxmox VE 儀表板 <sub>v0.1</sub>

一個簡易、現代化且響應式的 Proxmox VE 儀表板，提供直觀的節點、虛擬機器和容器監控介面。

![Proxmox Dashboard](https://img.shields.io/badge/Proxmox-VE%20Dashboard-blue?style=for-the-badge&logo=proxmox)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 🎉 Initial Release

### ✨ Features
- **Real-time Node Monitoring**: CPU, memory usage, node status
- **Virtual Machine Management**: VM status, resource usage, real-time updates
- **LXC Container Management**: Container status monitoring and resource statistics
- **Auto-refresh**: Automatic data updates every 15 seconds
- **Responsive Design**: Supports desktop, tablet, mobile and other devices
- **Dark/Light Theme**: Switchable modern themes
- **Multi-language Support**: Traditional Chinese, Simplified Chinese, English, Japanese, Korean
- **Settings Management**: First run setup, connection testing, settings persistence

### 🚀 Quick Start
1. Clone the repository
2. Run `npm install`
3. Run `node server.js`
4. Open `http://localhost:3000`

### 📸 Screenshots
- Modern, responsive interface
- Real-time monitoring dashboard
- Multi-language support

### 🔧 Technical Stack
- **Backend**: Node.js, Express.js, Axios
- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Features**: Responsive design, real-time updates, multi-language support

### 🌍 Languages
- English (Default)
- 繁體中文
- 简体中文
- 日本語
- 한국어

### 📄 License
MIT License

---
**This App is created with the assistance of [Cursor](https://github.com/cursor/cursor) and [Gemini-CLI](https://github.com/google-gemini/gemini-cli)**

## 📸 截圖

![Proxmox Dashboard 截圖](./public/screenshot_zh-TW.png)

## ✨ 功能特色

### 🖥️ 監控功能
- **即時節點監控**：CPU、記憶體使用率、節點狀態
- **虛擬機器管理**：VM 狀態、資源使用情況、即時更新
- **LXC 容器管理**：容器狀態監控和資源統計
- **自動刷新**：每 15 秒自動更新資料

### 🎨 使用者介面
- **響應式設計**：支援桌面、平板、手機等各種裝置
- **深色/淺色主題**：可切換的現代化主題
- **多語言支援**：繁體中文、簡體中文、英文、日文、韓文
- **直觀操作**：點擊卡片即可刷新個別項目狀態

### ⚙️ 設定管理
- **首次執行設定**：自動彈出設定對話框
- **連線測試**：設定前可測試 Proxmox 連線
- **設定持久化**：設定儲存至 `settings.json`
- **動態設定**：無需重啟即可套用新設定

## 🚀 快速開始

### 系統需求
- Node.js 18+ 
- 網路連線至 Proxmox VE 伺服器
- Proxmox VE API Token

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone https://github.com/anomixer/proxmox-dashboard.git
   cd proxmox-dashboard
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動服務**
   ```bash
   node server.js
   ```

4. **開啟瀏覽器**
   訪問 `http://localhost:3000`

### 首次設定

1. **取得 Proxmox API Token**
   - 登入 Proxmox VE Web 介面
   - 前往 `Datacenter` → `Permissions` → `API Tokens`
   - 建立新的 Token（建議格式：`root@pam!dashboard-token`）

2. **設定連線資訊**
   - 首次開啟會自動彈出設定對話框
   - 輸入 Proxmox VE 主機 IP 位址（例如：192.168.1.100）
   - 輸入 Token 名稱（例如：root@pam!token-name）
   - 輸入 Token 值（您的 API Token 密鑰，例如：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）
   - 點擊「測試連線」確認連線正常
   - 點擊「儲存並開始使用」

## 📖 使用說明

### 主要功能

#### 節點監控
- 顯示所有 Proxmox VE 節點狀態
- 即時 CPU 和記憶體使用率
- 點擊節點卡片可刷新狀態

#### 虛擬機器管理
- 顯示所有 VM 和 LXC 容器
- 狀態指示器（執行中/已停止）- 執行中的會優先顯示
- 資源使用統計
- 點擊卡片可刷新個別項目

#### 設定管理
- 點擊右上角「⚙️ 設定」按鈕
- 修改 Proxmox VE 連線資訊
- 支援連線測試功能

### 主題和語言
- **主題切換**：點擊「🌙 主題」按鈕
- **語言切換**：點擊「🇹🇼 語言」按鈕循環切換

## 🛠️ 技術架構

### 後端技術
- **Node.js**：伺服器運行環境
- **Express.js**：Web 框架
- **Axios**：HTTP 客戶端
- **File System**：設定檔管理

### 前端技術
- **原生 JavaScript**：無框架依賴
- **CSS3**：現代化樣式和動畫
- **HTML5**：語義化標記
- **Responsive Design**：響應式佈局

### API 端點
- `GET /api/status` - 取得節點和 VM 狀態
- `GET /api/settings` - 取得當前設定
- `POST /api/settings` - 更新設定
- `POST /api/test-connection` - 測試連線
- `GET /api/check-first-run` - 檢查是否首次執行

## 📁 專案結構

```
proxmox-dashboard/
├── server.js              # 主伺服器檔案
├── package.json           # 專案配置
├── settings.json          # 設定檔（自動生成）
├── README.md             # 專案說明
├── public/               # 靜態檔案
│   ├── index.html        # 主頁面
│   ├── script.js         # 前端邏輯
│   ├── style.css         # 樣式檔案
│   └── *.svg            # Proxmox Logo
└── node_modules/         # 依賴套件
```

## 🔧 配置說明

### 設定檔格式 (`settings.json`)
```json
{
  "proxmox_host": "192.168.1.100",
  "proxmox_token_name": "root@pam!token-name",
  "proxmox_token_value": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### 環境變數
目前支援的環境變數：
- `PORT`：伺服器埠號（預設：3000）

## 🐛 故障排除

### 常見問題

**Q: 無法連接到 Proxmox 伺服器**
- 確認 Proxmox 主機 IP 位址正確
- 檢查防火牆設定（埠號 8006）
- 確認 API Token 權限足夠

**Q: 設定對話框沒有彈出**
- 清除瀏覽器快取
- 確認 `settings.json` 檔案不存在
- 檢查瀏覽器 Console 錯誤訊息

**Q: 資料沒有更新**
- 檢查網路連線
- 確認 Proxmox API Token 有效
- 查看伺服器 Console 錯誤訊息

### 除錯模式
開啟瀏覽器開發者工具 (F12)，查看 Console 標籤的錯誤訊息。

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 開發環境設定
1. Fork 專案
2. 建立功能分支：`git checkout -b feature/amazing-feature`
3. 提交變更：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 建立 Pull Request

### 程式碼風格
- 使用 2 空格縮排
- 遵循 ESLint 規則
- 添加適當的註解

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- [Proxmox VE](https://www.proxmox.com/) - 優秀的虛擬化平台
- [Node.js](https://nodejs.org/) - JavaScript 運行環境
- [Express.js](https://expressjs.com/) - Web 應用框架

---

⭐ 如果這個專案對您有幫助，請給個 Star！

---

**此應用程式由 [Cursor](https://github.com/cursor/cursor) 和 [Gemini-CLI](https://github.com/google-gemini/gemini-cli) 協助創建**