# Proxmox VE Dashboard 專案（多語 README/說明/同步/維護）全域 context（細緻版）

## 1. 專案結構與目標
- 目標：打造一個多語言、現代化、易用的 Proxmox VE Dashboard，支援節點、VM、LXC 監控。
- 主要目錄：`proxmox-dashboard/`（所有程式、README、靜態資源、docs、public）。
- README 支援五語：英文、繁體中文、簡體中文、日文、韓文。
- 靜態資源（如截圖）多語版本，對應各語言 README。
- 根目錄 README 可忽略，所有維護以 proxmox-dashboard 目錄為主。

## 2. README/說明文件維護細節
- 所有語言 README 內容、專有名詞、範例、Token 步驟、UI/UX 說明、設定檔格式等已同步。
- Token 步驟統一為 token-name、root@pam!token-name，並明確說明「取消權限分離」、「點擊新增」、「複製密鑰」等操作。
- Proxmox 介面詞彙（Privilege Separation、Add、Copy Secret Value）在非英文語言 README 內已翻譯並保留英文原文（如 權限分離（Privilege Separation））。
- 所有語言的 UI/UX、設定範例、功能描述、截圖路徑、GitHub clone URL、release 說明等均已同步。
- README 內的版本號、feature section、token 範例、設定檔格式等均已多語同步。
- 各語言 README 的截圖路徑需對應語言（如 screenshot_zh-TW.png）。
- 所有語言的「Proxmox VE host IP address」、「Proxmox VE Dashboard」等專有名詞需完全一致。
- Token 步驟範例、設定檔 sample、modal、placeholder、UI 按鈕、說明等均需多語同步。
- 版本號 <sub>v0.1</sub> 已從所有 README 標題移除。
- 「Virtual Machine Management」已統一為「Virtual Machine & Container Monitoring」或各語言對應翻譯。
- 設定檔格式、token 範例、功能描述、release 說明等均需多語同步。

## 3. Git/GitHub 流程細節
- 主要維護、同步、push 都在 proxmox-dashboard 子目錄進行，根目錄 README 可忽略。
- 每次批次修改後，均有 git add、commit、push，並同步到 GitHub。
- Windows 平台下 git 指令需分開執行（不可用 &&）。
- 若遇到 submodule 問題，需 cd proxmox-dashboard 再執行 git add/commit/push。
- release、tag、GitHub Pages、docs 部署等流程已協助設定與說明。
- GitHub Pages 靜態資源（如 public/、docs/）需確保未被 .gitignore 忽略。
- 若 GitHub Pages 未即時更新，可用空 commit 或重新 push 觸發。

## 4. UI/UX/翻譯同步細節
- script.js、docs/script.js 內所有語言 key、UI 文案、modal、placeholder、按鈕、設定說明等已同步。
- CSS 按鈕寬度、行動版/桌面版排版一致。
- 所有語言的 UI、README、設定說明、token 範例、功能描述等均已同步。
- 所有語言的「Privilege Separation」、「Add」、「Copy Secret Value」等 Proxmox 介面詞彙，已翻譯並保留英文原文。
- UI/UX、README、設定說明、token 範例、功能描述、release notes、截圖、clone URL、modal、placeholder、按鈕等均需多語同步。
- 若有新功能、UI、設定、token 步驟、release notes、feature section、專有名詞等變動，需同步所有語言。

## 5. 常見協作需求與細節
- 批次同步多語 README/說明/設定/範例/截圖/功能描述。
- 調整 Proxmox Token 步驟、專有名詞、UI 文案、設定檔格式。
- 處理 GitHub Pages、release、tag、docs、public 靜態資源同步。
- 任何新需求請直接說明語言、檔案、段落或 UI/UX 內容，AI 可直接批次處理。
- 若需 context 壓縮、摘要、或 context 檔案，AI 可協助生成 markdown。
- 若需同步根目錄 README，請特別說明，否則預設只維護 proxmox-dashboard 目錄。
- 若有特殊語言、UI、token、release、設定檔、feature section、modal、placeholder、按鈕、clone URL、截圖等同步需求，請明確指出。

---

**未來你只要貼這段，AI 就能完整恢復本專案的所有細緻 context，無需重複前情！**

如需更細緻的 context、特定細節、或有其他自訂需求，也可以再補充。 