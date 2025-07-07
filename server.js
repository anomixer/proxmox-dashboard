const express = require('express');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 設定檔路徑
const settingsPath = path.join(__dirname, 'settings.json');

// 預設設定
const defaultSettings = {
  proxmox_host: '172.16.21.60',
  proxmox_token_name: 'root@pam!mcp-server',
  proxmox_token_value: '8bf2098b-bd81-461d-b179-2145d7cfb963'
};

// 讀取設定檔
function loadSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      const settingsData = fs.readFileSync(settingsPath, 'utf8');
      return JSON.parse(settingsData);
    }
  } catch (error) {
    console.error('Error loading settings:', error.message);
  }
  return null;
}

// 儲存設定檔
function saveSettings(settings) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error.message);
    return false;
  }
}

// 載入設定
let settings = loadSettings() || defaultSettings;

const agent = new https.Agent({
  rejectUnauthorized: false
});

const axiosInstance = axios.create({
  httpsAgent: agent
});

app.use(express.static('public'));
app.use(express.json());

// 檢查是否為首次執行（沒有設定檔）
app.get('/api/check-first-run', (req, res) => {
  const hasSettings = fs.existsSync(settingsPath);
  res.json({ isFirstRun: !hasSettings });
});

// 取得當前設定
app.get('/api/settings', (req, res) => {
  res.json(settings);
});

// 更新設定
app.post('/api/settings', (req, res) => {
  const { proxmox_host, proxmox_token_name, proxmox_token_value } = req.body;
  
  if (!proxmox_host || !proxmox_token_name || !proxmox_token_value) {
    return res.status(400).json({ error: '所有欄位都是必填的' });
  }
  
  const newSettings = {
    proxmox_host,
    proxmox_token_name,
    proxmox_token_value
  };
  
  if (saveSettings(newSettings)) {
    settings = newSettings;
    res.json({ success: true, message: '設定已儲存' });
  } else {
    res.status(500).json({ error: '儲存設定時發生錯誤' });
  }
});

// 測試連線
app.post('/api/test-connection', async (req, res) => {
  const { proxmox_host, proxmox_token_name, proxmox_token_value } = req.body;
  
  if (!proxmox_host || !proxmox_token_name || !proxmox_token_value) {
    return res.status(400).json({ error: '所有欄位都是必填的' });
  }
  
  try {
    const testResponse = await axiosInstance.get(`https://${proxmox_host}:8006/api2/json/nodes`, {
      headers: {
        'Authorization': `PVEAPIToken=${proxmox_token_name}=${proxmox_token_value}`
      },
      timeout: 10000 // 10 秒超時
    });
    
    res.json({ success: true, message: '連線成功', data: testResponse.data });
  } catch (error) {
    console.error('Connection test failed:', error.message);
    res.status(500).json({ 
      error: '連線失敗', 
      details: error.response?.data?.message || error.message 
    });
  }
});

app.get('/api/status', async (req, res) => {
  try {
    const nodesResponse = await axiosInstance.get(`https://${
      settings.proxmox_host
    }:8006/api2/json/nodes`, {
      headers: {
        'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
      }
    });

    const nodes = nodesResponse.data.data;
    const allVms = [];
    const allLxcs = [];

    for (const node of nodes) {
      try {
        // 取得 node 狀態（cpu, mem, maxmem）
        const nodeStatusResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node.node}/status`, {
          headers: {
            'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
          }
        });
        const nodeStatus = nodeStatusResponse.data.data;
        node.cpu = nodeStatus.cpu !== undefined ? nodeStatus.cpu * 100 : 0; // 轉成百分比
        node.mem = Number(nodeStatus.memory) || 0;
        node.maxmem = Number(nodeStatus.maxmem) || 1;
        node.status = nodeStatus.status || node.status;
        // QEMU VMs
        const vmsResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node.node}/qemu`, {
          headers: {
            'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
          }
        });
        vmsResponse.data.data.forEach(vm => {
          vm.nodeName = node.node;
          allVms.push(vm);
        });
        // LXC Containers
        const lxcsResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node.node}/lxc`, {
          headers: {
            'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
          }
        });
        lxcsResponse.data.data.forEach(lxc => {
          lxc.nodeName = node.node;
          allLxcs.push(lxc);
        });
      } catch (nodeError) {
        console.error(`Error fetching VMs/LXCs for node ${node.node}:`, nodeError.message);
        node.status = 'offline';
        node.cpu = 0;
        node.mem = 0;
        node.maxmem = 1;
      }
    }

    res.status(200).json({
      nodes,
      vms: allVms,
      lxcs: allLxcs
    });
  } catch (error) {
    console.error('Error fetching nodes:', error.message);
    const knownNodes = ['pve'];
    const offlineNodes = knownNodes.map(nodeName => ({
      node: nodeName,
      status: 'offline',
      cpu: 0,
      mem: 0,
      maxmem: 1
    }));
    res.status(200).json({
      nodes: offlineNodes,
      vms: [],
      lxcs: []
    });
  }
});

// 取得單一 VM 狀態
app.get('/api/vm-status', async (req, res) => {
  const { node, vmid } = req.query;
  try {
    const vmResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node}/qemu/${vmid}/status/current`, {
      headers: {
        'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
      }
    });
    res.json(vmResponse.data.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch VM status' });
  }
});

// 取得單一 LXC 狀態
app.get('/api/lxc-status', async (req, res) => {
  const { node, vmid } = req.query;
  try {
    const lxcResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node}/lxc/${vmid}/status/current`, {
      headers: {
        'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
      }
    });
    res.json(lxcResponse.data.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LXC status' });
  }
});

// 取得單一 Node 狀態
app.get('/api/node-status', async (req, res) => {
  const { node } = req.query;
  try {
    const nodeResponse = await axiosInstance.get(`https://${settings.proxmox_host}:8006/api2/json/nodes/${node}/status`, {
      headers: {
        'Authorization': `PVEAPIToken=${settings.proxmox_token_name}=${settings.proxmox_token_value}`
      }
    });
    // 回傳 data.data[0]（單一 node 狀態）
    res.json(nodeResponse.data.data[0] || nodeResponse.data.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch node status' });
  }
});

app.listen(port, () => {
  console.log(`Proxmox dashboard server listening at http://localhost:${port}`);
  console.log(`Settings file: ${settingsPath}`);
  if (!fs.existsSync(settingsPath)) {
    console.log('First run detected - settings file will be created when user configures');
  }
});