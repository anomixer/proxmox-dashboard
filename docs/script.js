const nodesContainer = document.getElementById('nodes-container');
const vmsContainer = document.getElementById('vms-container');
const refreshBtn = document.getElementById('refresh-btn');
const lastRefreshed = document.getElementById('last-refreshed');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const langToggleBtn = document.getElementById('lang-toggle-btn');

// 設定功能相關變數
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const firstRunModal = document.getElementById('first-run-modal');
const closeSettings = document.getElementById('close-settings');
const settingsForm = document.getElementById('settings-form');
const firstRunForm = document.getElementById('first-run-form');
const testConnectionBtn = document.getElementById('test-connection-btn');
const firstRunTestBtn = document.getElementById('first-run-test-btn');
const connectionResult = document.getElementById('connection-result');
const firstRunResult = document.getElementById('first-run-result');

// Language translations
const translations = {
  zh: {
    title: 'Proxmox VE 儀表板',
    theme: '主題',
    refresh: '重新整理',
    settings: '設定',
    nodes: '節點',
    vms: '虛擬機器 & LXC容器',
    lxc: 'LXC容器',
    status: '狀態',
    online: '線上',
    offline: '離線',
    running: '執行中',
    stopped: '已停止',
    cpu: 'CPU',
    memory: '記憶體',
    cpuUsage: 'CPU 使用率',
    memoryUsage: '記憶體使用率',
    lastRefreshed: '最後更新',
    connectionError: '連線錯誤',
    noDataAvailable: '無可用資料',
    unableToConnect: '無法連接到 Proxmox 伺服器',
    vmDataUnavailable: '由於連線問題，虛擬機器資料無法取得',
    loading: '載入中...',
    // 設定相關翻譯
    settingsTitle: '設定',
    firstRunTitle: '歡迎使用 Proxmox VE Dashboard',
    firstRunMessage: '這是您首次使用 Proxmox VE Dashboard，請先設定您的 Proxmox VE 伺服器連線資訊。',
    proxmoxHost: 'Proxmox VE 主機 IP 位址:',
    tokenName: 'Token 名稱:',
    tokenValue: 'Token 值:',
    testConnection: '測試連線',
    saveSettings: '儲存設定',
    saveAndStart: '儲存並開始使用',
    connectionSuccess: '連線成功',
    connectionFailed: '連線失敗',
    settingsSaved: '設定已成功儲存！',
    settingsSaveFailed: '儲存設定失敗',
    unknownError: '未知錯誤',
    settingsSaveError: '儲存設定時發生錯誤',
    hostPlaceholder: '例如: 192.168.1.100',
    tokenNamePlaceholder: '例如: root@pam!token-name',
    tokenValuePlaceholder: '輸入您的 API Token'
  },
  zh_cn: {
    title: 'Proxmox VE 仪表板',
    theme: '主题',
    refresh: '刷新',
    settings: '设置',
    nodes: '节点',
    vms: '虚拟机 & LXC容器',
    lxc: 'LXC容器',
    status: '状态',
    online: '在线',
    offline: '离线',
    running: '运行中',
    stopped: '已停止',
    cpu: 'CPU',
    memory: '内存',
    cpuUsage: 'CPU 使用率',
    memoryUsage: '内存使用率',
    lastRefreshed: '最后更新',
    connectionError: '连接错误',
    noDataAvailable: '无可用数据',
    unableToConnect: '无法连接到 Proxmox 服务器',
    vmDataUnavailable: '由于连接问题，虚拟机数据无法获取',
    loading: '加载中...',
    // 设定相关翻译
    settingsTitle: '设置',
    firstRunTitle: '欢迎使用 Proxmox VE Dashboard',
    firstRunMessage: '这是您首次使用 Proxmox Dashboard，请先设置您的 Proxmox 服务器连接信息。',
    proxmoxHost: 'Proxmox VE 主機 IP 位址:',
    tokenName: 'Token 名称:',
    tokenValue: 'Token 值:',
    testConnection: '测试连接',
    saveSettings: '保存设置',
    saveAndStart: '保存并开始使用',
    connectionSuccess: '连接成功',
    connectionFailed: '连接失败',
    settingsSaved: '设置已成功保存！',
    settingsSaveFailed: '保存设置失败',
    unknownError: '未知错误',
    settingsSaveError: '保存设置时发生错误',
    hostPlaceholder: '例如: 192.168.1.100',
    tokenNamePlaceholder: '例如: root@pam!token-name',
    tokenValuePlaceholder: '输入您的 API Token'
  },
  en: {
    title: 'Proxmox VE Dashboard',
    theme: 'Theme',
    refresh: 'Refresh',
    settings: 'Settings',
    nodes: 'Nodes',
    vms: 'Virtual Machines & LXCs',
    lxc: 'LXC Container',
    status: 'Status',
    online: 'Online',
    offline: 'Offline',
    running: 'Running',
    stopped: 'Stopped',
    cpu: 'CPU',
    memory: 'Memory',
    cpuUsage: 'CPU Usage',
    memoryUsage: 'Memory Usage',
    lastRefreshed: 'Last refreshed',
    connectionError: 'Connection Error',
    noDataAvailable: 'No Data Available',
    unableToConnect: 'Unable to connect to Proxmox server',
    vmDataUnavailable: 'VM data unavailable due to connection issues',
    loading: 'Loading...',
    // Settings related translations
    settingsTitle: 'Settings',
    firstRunTitle: 'Welcome to Proxmox Dashboard',
    firstRunMessage: 'This is your first time using Proxmox Dashboard. Please configure your Proxmox server connection information first.',
    proxmoxHost: 'Proxmox Host IP Address:',
    tokenName: 'Token Name:',
    tokenValue: 'Token Value:',
    testConnection: 'Test Connection',
    saveSettings: 'Save Settings',
    saveAndStart: 'Save and Start',
    connectionSuccess: 'Connection successful',
    connectionFailed: 'Connection failed',
    settingsSaved: 'Settings saved successfully!',
    settingsSaveFailed: 'Failed to save settings',
    unknownError: 'Unknown error',
    settingsSaveError: 'Error occurred while saving settings',
    hostPlaceholder: 'e.g., 192.168.1.100',
    tokenNamePlaceholder: 'e.g., root@pam!token-name',
    tokenValuePlaceholder: 'Enter your API Token'
  },
  ja: {
    title: 'Proxmox VE ダッシュボード',
    theme: 'テーマ',
    refresh: '更新',
    settings: '設定',
    nodes: 'ノード',
    vms: '仮想マシン & LXCコンテナ',
    lxc: 'LXCコンテナ',
    status: 'ステータス',
    online: 'オンライン',
    offline: 'オフライン',
    running: '実行中',
    stopped: '停止',
    cpu: 'CPU',
    memory: 'メモリ',
    cpuUsage: 'CPU 使用率',
    memoryUsage: 'メモリ使用率',
    lastRefreshed: '最終更新',
    connectionError: '接続エラー',
    noDataAvailable: 'データなし',
    unableToConnect: 'Proxmox サーバーに接続できません',
    vmDataUnavailable: '接続の問題により、仮想マシンデータを取得できません',
    loading: '読み込み中...',
    // 設定関連の翻訳
    settingsTitle: '設定',
    firstRunTitle: 'Proxmox Dashboard へようこそ',
    firstRunMessage: 'Proxmox Dashboard を初めて使用します。まず、Proxmox サーバーの接続情報を設定してください。',
    proxmoxHost: 'Proxmox VE 主機 IP 位址:',
    tokenName: 'トークン名:',
    tokenValue: 'トークン値:',
    testConnection: '接続テスト',
    saveSettings: '設定を保存',
    saveAndStart: '保存して開始',
    connectionSuccess: '接続成功',
    connectionFailed: '接続失敗',
    settingsSaved: '設定が正常に保存されました！',
    settingsSaveFailed: '設定の保存に失敗しました',
    unknownError: '不明なエラー',
    settingsSaveError: '設定保存中にエラーが発生しました',
    hostPlaceholder: '例: 192.168.1.100',
    tokenNamePlaceholder: '例: root@pam!token-name',
    tokenValuePlaceholder: 'API トークンを入力してください'
  },
  ko: {
    title: 'Proxmox VE 대시보드',
    theme: '테마',
    refresh: '새로고침',
    settings: '설정',
    nodes: '노드',
    vms: '가상 머신 & LXC컨테이너',
    lxc: 'LXC컨테이너',
    status: '상태',
    online: '온라인',
    offline: '오프라인',
    running: '실행 중',
    stopped: '중지됨',
    cpu: 'CPU',
    memory: '메모리',
    cpuUsage: 'CPU 사용률',
    memoryUsage: '메모리 사용률',
    lastRefreshed: '마지막 업데이트',
    connectionError: '연결 오류',
    noDataAvailable: '사용 가능한 데이터 없음',
    unableToConnect: 'Proxmox 서버에 연결할 수 없습니다',
    vmDataUnavailable: '연결 문제로 인해 가상 머신 데이터를 가져올 수 없습니다',
    loading: '로딩 중...',
    // 설정 관련 번역
    settingsTitle: '설정',
    firstRunTitle: 'Proxmox Dashboard에 오신 것을 환영합니다',
    firstRunMessage: 'Proxmox Dashboard를 처음 사용하십니다. 먼저 Proxmox 서버 연결 정보를 설정해 주세요.',
    proxmoxHost: 'Proxmox VE 主機 IP 位址:',
    tokenName: '토큰 이름:',
    tokenValue: '토큰 값:',
    testConnection: '연결 테스트',
    saveSettings: '설정 저장',
    saveAndStart: '저장하고 시작',
    connectionSuccess: '연결 성공',
    connectionFailed: '연결 실패',
    settingsSaved: '설정이 성공적으로 저장되었습니다!',
    settingsSaveFailed: '설정 저장 실패',
    unknownError: '알 수 없는 오류',
    settingsSaveError: '설정 저장 중 오류가 발생했습니다',
    hostPlaceholder: '예: 192.168.1.100',
    tokenNamePlaceholder: '예: root@pam!token-name',
    tokenValuePlaceholder: 'API 토큰을 입력하세요'
  }
};

let currentLang = 'zh'; // Default to Chinese

// Function to set theme
function setTheme(theme) {
  document.body.className = theme + '-theme';
  localStorage.setItem('theme', theme);
  
  // 切換 logo
  const logoImg = document.getElementById('proxmox-logo-img');
  if (theme === 'light') {
    logoImg.src = 'proxmox-full-lockup-color.svg';
  } else {
    logoImg.src = 'proxmox-full-lockup-inverted-color.svg';
  }

  // Update theme button icon and text
  const themeBtn = document.querySelector('#theme-toggle-btn');
  const icon = theme === 'light' ? '☀️' : '🌙';
  themeBtn.innerHTML = `<span>${icon}</span> ${translations[currentLang].theme}`;

  // Update refresh button text as well (in case language changed)
  const refreshBtn = document.querySelector('#refresh-btn');
  refreshBtn.innerHTML = `<span>🔄</span> ${translations[currentLang].refresh}`;
}

// Function to set language
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  
  // Update page title
  document.title = translations[lang].title;
  
  // Update main title
  let titleText = translations[lang].title.replace('Proxmox ', '');
  // 若是 VE Dashboard，強制中間三個空格
  titleText = titleText.replace('VE Dashboard', 'VE   Dashboard');
  titleText = titleText.replace('VE 儀表板', 'VE   儀表板');
  document.getElementById('dashboard-title-text').textContent = titleText;
  
  // Update theme and refresh button (use setTheme to ensure icon正確)
  const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  setTheme(currentTheme);

  // Update settings button text
  settingsBtn.innerHTML = `<span>⚙️</span> ${translations[lang].settings}`;
  
  // Update modal texts if they are visible
  if (settingsModal.style.display === 'block') {
    updateSettingsModalText();
  }
  if (firstRunModal.style.display === 'block') {
    updateFirstRunModalText();
  }

  // Update language button
  const langBtn = document.querySelector('#lang-toggle-btn');
  const langIcons = {
    'zh': '🇹🇼',
    'zh_cn': '🇨🇳',
    'en': '🇺🇸',
    'ja': '🇯🇵',
    'ko': '🇰🇷'
  };
  const langLabels = {
    'zh': '語言',
    'zh_cn': '语言',
    'en': 'LANGUAGE',
    'ja': '言語',
    'ko': '언어'
  };
  const langIcon = langIcons[lang] || '🌐';
  const langLabel = langLabels[lang] || 'LANGUAGE';
  langBtn.innerHTML = `<span>${langIcon}</span><span class="lang-label">${langLabel}</span>`;
  
  // Show loading state
  nodesContainer.innerHTML = `<h2>🖥️ ${translations[lang].nodes}</h2><div class="card loading"><h2>${translations[lang].loading}</h2></div>`;
  vmsContainer.innerHTML = `<h2>🖥️ ${translations[lang].vms}</h2><div class="card loading"><h2>${translations[lang].loading}</h2></div>`;
  
  // Refresh data to update all text and get latest data
  fetchData();
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Default to dark theme if no preference is saved
  setTheme('dark');
}

// Check for saved language preference
const savedLang = localStorage.getItem('language');
if (savedLang) {
  setLanguage(savedLang);
} else {
  // Default to Chinese if no preference is saved
  setLanguage('zh');
}

// 安全除法，避免 NaN% 顯示
function safeDivide(a, b) {
  const numA = Number(a);
  const numB = Number(b);
  if (!isFinite(numA) || !isFinite(numB) || numB <= 0) return '0.00';
  return ((numA / numB) * 100).toFixed(2);
}

async function fetchData() {
  try {
    const response = await fetch('/api/status');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    // Clear existing cards
    nodesContainer.innerHTML = `<h2>🖥️ ${translations[currentLang].nodes}</h2>`;
    vmsContainer.innerHTML = `<h2>🖥️ ${translations[currentLang].vms}</h2>`;

    // Sort nodes and VMs by name
    data.nodes.sort((a, b) => {
      if (a.status === 'online' && b.status !== 'online') return -1;
      if (a.status !== 'online' && b.status === 'online') return 1;
      return a.node.localeCompare(b.node);
    });
    data.vms.sort((a, b) => {
      if (a.status === 'running' && b.status !== 'running') return -1;
      if (a.status !== 'running' && b.status === 'running') return 1;
      return a.vmid - b.vmid;
    });

    // Render nodes
    data.nodes.forEach(node => {
      const nodeCard = document.createElement('div');
      nodeCard.className = 'card';
      const isOnline = node.status === 'online';
      const cpuValue = isOnline ? Number(node.cpu).toFixed(2) : '0.00';
      const memoryValue = isOnline ? safeDivide(node.mem, node.maxmem) : '0.00';
      nodeCard.innerHTML = `
        <h2>${node.node}</h2>
        <p>${translations[currentLang].status}: <span class="${isOnline ? 'status-online' : 'status-offline'}">${isOnline ? translations[currentLang].online : translations[currentLang].offline}</span></p>
        <p>${translations[currentLang].cpu}: ${cpuValue}%</p>
        <p>${translations[currentLang].memory}: ${memoryValue}%</p>
      `;
      // 點擊卡片時只刷新該 node 狀態
      nodeCard.style.cursor = 'pointer';
      nodeCard.addEventListener('click', async (e) => {
        e.stopPropagation();
        nodeCard.classList.add('loading');
        try {
          const res = await fetch(`/api/node-status?node=${encodeURIComponent(node.node)}`);
          if (!res.ok) throw new Error('Network error');
          const data = await res.json();
          console.log('Node status API result:', data);
          const nodeData = Array.isArray(data) ? data[0] : data;
          // 狀態優先用API回傳，沒有就用主列表
          const online = typeof nodeData.status === 'string'
            ? nodeData.status === 'online'
            : node.status === 'online';
          const cpu = nodeData.cpu !== undefined ? Number(nodeData.cpu * 100).toFixed(2) : '0.00';
          const mem = nodeData.memory && nodeData.memory.total
            ? safeDivide(nodeData.memory.used, nodeData.memory.total)
            : (online ? safeDivide(nodeData.mem, nodeData.maxmem) : '0.00');
          nodeCard.innerHTML = `
            <h2>${node.node}</h2>
            <p>${translations[currentLang].status}: <span class="${online ? 'status-online' : 'status-offline'}">${online ? translations[currentLang].online : translations[currentLang].offline}</span></p>
            <p>${translations[currentLang].cpu}: ${cpu}%</p>
            <p>${translations[currentLang].memory}: ${mem}%</p>
          `;
        } catch (err) {
          if (online) {
            nodeCard.innerHTML += `<div style='color:red;margin-top:8px;'>Refresh failed</div>`;
          }
        } finally {
          nodeCard.classList.remove('loading');
        }
      });
      nodesContainer.appendChild(nodeCard); 
      // 自動刷新一次（模擬點擊）
      nodeCard.click();
    });

    // Render VMs & LXCs
    const allVMsAndLXCs = [
      ...data.vms.map(vm => ({ ...vm, _type: 'vm' })),
      ...data.lxcs.map(lxc => ({ ...lxc, _type: 'lxc' }))
    ];
    // 依照狀態與ID排序
    allVMsAndLXCs.sort((a, b) => {
      // running/online優先
      const aRunning = (a.status === 'running' || a.status === 'online');
      const bRunning = (b.status === 'running' || b.status === 'online');
      if (aRunning && !bRunning) return -1;
      if (!aRunning && bRunning) return 1;
      return a.vmid - b.vmid;
    });
    allVMsAndLXCs.forEach(item => {
      const isRunning = item.status === 'running' || item.status === 'online';
      const cpuValue = isRunning ? Number(item.cpu).toFixed(2) : '0.00';
      const memoryValue = isRunning ? safeDivide(item.mem, item.maxmem) : '0.00';
      const isLXC = item._type === 'lxc';
      const lxcLabel = isLXC ? ' [LXC]' : '';
      const vmCard = document.createElement('div');
      vmCard.className = 'card';
      vmCard.innerHTML = `
        <h2>${item.name} (${item.vmid})${lxcLabel} @${item.nodeName}</h2>
        <p>${translations[currentLang].status}: <span class="${isRunning ? 'status-online' : 'status-offline'}">${isRunning ? translations[currentLang].running : translations[currentLang].stopped}</span></p>
        <p>${translations[currentLang].cpuUsage}: ${cpuValue}%</p>
        <p>${translations[currentLang].memoryUsage}: ${memoryValue}%</p>
      `;
      // 點擊卡片時只刷新該卡片內容
      vmCard.style.cursor = 'pointer';
      vmCard.addEventListener('click', async (e) => {
        e.stopPropagation();
        vmCard.classList.add('loading');
        let url = '';
        if (isLXC) {
          url = `/api/lxc-status?node=${encodeURIComponent(item.nodeName)}&vmid=${item.vmid}`;
        } else {
          url = `/api/vm-status?node=${encodeURIComponent(item.nodeName)}&vmid=${item.vmid}`;
        }
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error('Network error');
          const data = await res.json();
          // 更新卡片內容
          const running = data.status === 'running' || data.status === 'online';
          const cpu = running ? Number(data.cpu * 100).toFixed(2) : '0.00';
          const mem = running ? safeDivide(data.mem, data.maxmem) : '0.00';
          vmCard.innerHTML = `
            <h2>${item.name} (${item.vmid})${lxcLabel} @${item.nodeName}</h2>
            <p>${translations[currentLang].status}: <span class="${running ? 'status-online' : 'status-offline'}">${running ? translations[currentLang].running : translations[currentLang].stopped}</span></p>
            <p>${translations[currentLang].cpuUsage}: ${cpu}%</p>
            <p>${translations[currentLang].memoryUsage}: ${mem}%</p>
          `;
        } catch (err) {
          vmCard.innerHTML += `<div style='color:red;margin-top:8px;'>Refresh failed</div>`;
        } finally {
          vmCard.classList.remove('loading');
        }
      });
      vmsContainer.appendChild(vmCard);
      // 自動刷新一次（模擬點擊）
      vmCard.click();
    });

    // Update last refreshed time
    const now = new Date();
    const locales = {
      'zh': 'zh-TW',
      'zh_cn': 'zh-CN',
      'en': 'en-US',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };
    const locale = locales[currentLang] || 'en-US';
    lastRefreshed.textContent = `${translations[currentLang].lastRefreshed}: ${now.toLocaleTimeString(locale, { hour12: false })}`;

  } catch (error) {
    console.error('Error fetching data:', error);
    nodesContainer.innerHTML = `<h2>🖥️ ${translations[currentLang].nodes}</h2><div class="card"><h2>${translations[currentLang].connectionError}</h2><p>${translations[currentLang].unableToConnect}</p></div>`;
    vmsContainer.innerHTML = `<h2>🖥️ ${translations[currentLang].vms}</h2><div class="card"><h2>${translations[currentLang].connectionError}</h2><p>${translations[currentLang].unableToConnect}</p></div>`;
  }
}

// Fetch data on page load
fetchData();

// Auto-refresh every 15 seconds
setInterval(fetchData, 15000);

// Add event listener for refresh button
refreshBtn.addEventListener('click', fetchData);

// Add event listener for theme toggle button
themeToggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Add event listener for language toggle button
langToggleBtn.addEventListener('click', () => {
  const languages = ['zh', 'zh_cn', 'en', 'ja', 'ko'];
  const currentIndex = languages.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % languages.length;
  setLanguage(languages[nextIndex]);
});

// 檢查是否為首次執行
async function checkFirstRun() {
  console.log('checkFirstRun called'); // Debug log
  try {
    const response = await fetch('/api/check-first-run');
    const data = await response.json();
    console.log('First run check response:', data); // Debug log
    
    if (data.isFirstRun) {
      console.log('Showing first run modal'); // Debug log
      showFirstRunModal();
    } else {
      console.log('Not first run, modal not shown'); // Debug log
    }
  } catch (error) {
    console.error('Error checking first run:', error);
  }
}

// 顯示首次執行設定對話框
function showFirstRunModal() {
  console.log('showFirstRunModal called'); // Debug log
  console.log('firstRunModal element:', firstRunModal); // Debug log
  
  // 更新對話框文字
  updateFirstRunModalText();
  firstRunModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  console.log('Modal should be visible now'); // Debug log
}

// 隱藏首次執行設定對話框
function hideFirstRunModal() {
  firstRunModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// 顯示設定對話框
function showSettingsModal() {
  // 載入當前設定
  loadCurrentSettings();
  // 更新對話框文字
  updateSettingsModalText();
  settingsModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// 隱藏設定對話框
function hideSettingsModal() {
  settingsModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  connectionResult.style.display = 'none';
  connectionResult.className = 'connection-result';
}

// 更新設定對話框文字
function updateSettingsModalText() {
  const t = translations[currentLang];
  
  try {
    // 更新標題
    const titleElement = document.querySelector('#settings-modal .modal-header h2');
    if (titleElement) {
      titleElement.textContent = `⚙️ ${t.settingsTitle}`;
    }
    
    // 更新表單標籤
    const hostLabel = document.querySelector('label[for="proxmox-host"]');
    if (hostLabel) {
      hostLabel.textContent = t.proxmoxHost;
    }
    
    const tokenNameLabel = document.querySelector('label[for="proxmox-token-name"]');
    if (tokenNameLabel) {
      tokenNameLabel.textContent = t.tokenName;
    }
    
    const tokenValueLabel = document.querySelector('label[for="proxmox-token-value"]');
    if (tokenValueLabel) {
      tokenValueLabel.textContent = t.tokenValue;
    }
    
    // 更新按鈕文字
    const testBtn = document.getElementById('test-connection-btn');
    if (testBtn) {
      testBtn.textContent = `🔗 ${t.testConnection}`;
    }
    
    const submitBtn = document.getElementById('settings-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = `💾 ${t.saveSettings}`;
    }
    
    // 更新 placeholder
    const hostInput = document.getElementById('proxmox-host');
    if (hostInput) {
      hostInput.placeholder = t.hostPlaceholder;
    }
    
    const tokenNameInput = document.getElementById('proxmox-token-name');
    if (tokenNameInput) {
      tokenNameInput.placeholder = t.tokenNamePlaceholder;
    }
    
    const tokenValueInput = document.getElementById('proxmox-token-value');
    if (tokenValueInput) {
      tokenValueInput.placeholder = t.tokenValuePlaceholder;
    }
  } catch (error) {
    console.error('Error updating settings modal text:', error);
  }
}

// 更新首次執行對話框文字
function updateFirstRunModalText() {
  const t = translations[currentLang];
  
  try {
    // 更新標題和訊息
    const titleElement = document.querySelector('#first-run-modal .modal-header h2');
    if (titleElement) {
      titleElement.textContent = `🎉 ${t.firstRunTitle}`;
    }
    
    const messageElement = document.querySelector('#first-run-modal .modal-body p');
    if (messageElement) {
      messageElement.textContent = t.firstRunMessage;
    }
    
    // 更新表單標籤
    const hostLabel = document.querySelector('label[for="first-run-host"]');
    if (hostLabel) {
      hostLabel.textContent = t.proxmoxHost;
    }
    
    const tokenNameLabel = document.querySelector('label[for="first-run-token-name"]');
    if (tokenNameLabel) {
      tokenNameLabel.textContent = t.tokenName;
    }
    
    const tokenValueLabel = document.querySelector('label[for="first-run-token-value"]');
    if (tokenValueLabel) {
      tokenValueLabel.textContent = t.tokenValue;
    }
    
    // 更新按鈕文字
    const testBtn = document.getElementById('first-run-test-btn');
    if (testBtn) {
      testBtn.textContent = `🔗 ${t.testConnection}`;
    }
    
    const submitBtn = document.getElementById('first-run-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = `💾 ${t.saveAndStart}`;
    }
    
    // 更新 placeholder
    const hostInput = document.getElementById('first-run-host');
    if (hostInput) {
      hostInput.placeholder = t.hostPlaceholder;
    }
    
    const tokenNameInput = document.getElementById('first-run-token-name');
    if (tokenNameInput) {
      tokenNameInput.placeholder = t.tokenNamePlaceholder;
    }
    
    const tokenValueInput = document.getElementById('first-run-token-value');
    if (tokenValueInput) {
      tokenValueInput.placeholder = t.tokenValuePlaceholder;
    }
  } catch (error) {
    console.error('Error updating first run modal text:', error);
  }
}

// 載入當前設定
async function loadCurrentSettings() {
  try {
    const response = await fetch('/api/settings');
    const settings = await response.json();
    
    document.getElementById('proxmox-host').value = settings.proxmox_host;
    document.getElementById('proxmox-token-name').value = settings.proxmox_token_name;
    document.getElementById('proxmox-token-value').value = settings.proxmox_token_value;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// 測試連線
async function testConnection(formData) {
  const resultElement = formData.get('proxmox_host') === document.getElementById('first-run-host').value 
    ? firstRunResult 
    : connectionResult;
  const t = translations[currentLang];
  
  try {
    const response = await fetch('/api/test-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proxmox_host: formData.get('proxmox_host'),
        proxmox_token_name: formData.get('proxmox_token_name'),
        proxmox_token_value: formData.get('proxmox_token_value')
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      resultElement.textContent = '✅ ' + t.connectionSuccess;
      resultElement.className = 'connection-result success';
    } else {
      resultElement.textContent = '❌ ' + (data.error || t.connectionFailed);
      resultElement.className = 'connection-result error';
    }
  } catch (error) {
    resultElement.textContent = '❌ ' + t.connectionFailed + ': ' + error.message;
    resultElement.className = 'connection-result error';
  }
  
  resultElement.style.display = 'block';
}

// 儲存設定
async function saveSettings(formData) {
  const t = translations[currentLang];
  
  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proxmox_host: formData.get('proxmox_host'),
        proxmox_token_name: formData.get('proxmox_token_name'),
        proxmox_token_value: formData.get('proxmox_token_value')
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(t.settingsSaved);
      hideSettingsModal();
      hideFirstRunModal();
      // 重新載入資料
      fetchData();
    } else {
      alert(t.settingsSaveFailed + ': ' + (data.error || t.unknownError));
    }
  } catch (error) {
    alert(t.settingsSaveError + ': ' + error.message);
  }
}

// 事件監聽器
settingsBtn.addEventListener('click', showSettingsModal);
closeSettings.addEventListener('click', hideSettingsModal);

// 點擊對話框外部關閉
window.addEventListener('click', (event) => {
  if (event.target === settingsModal) {
    hideSettingsModal();
  }
  if (event.target === firstRunModal) {
    hideFirstRunModal();
  }
});

// 設定表單提交
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(settingsForm);
  saveSettings(formData);
});

// 首次執行表單提交
firstRunForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(firstRunForm);
  saveSettings(formData);
});

// 測試連線按鈕
testConnectionBtn.addEventListener('click', () => {
  const formData = new FormData(settingsForm);
  testConnection(formData);
});

// 首次執行測試連線按鈕
firstRunTestBtn.addEventListener('click', () => {
  const formData = new FormData(firstRunForm);
  testConnection(formData);
});

// 頁面載入時檢查首次執行
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired'); // Debug log
  checkFirstRun();
});
