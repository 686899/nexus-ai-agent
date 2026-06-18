/* ============================================
   Nexus AI Agent - Main Application
   ============================================ */

(function(){
  'use strict';

  // ---- State ----
  const state = {
    portfolio: JSON.parse(localStorage.getItem('nexus_portfolio') || '[]'),
    view: 'landing'
  };

  // ---- Mock Market Data ----
  const marketData = [
    { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 68420, change24h: 2.4, mcap: '1.35T', volume: '28.4B' },
    { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 3450, change24h: 1.8, mcap: '415B', volume: '15.2B' },
    { rank: 3, name: 'Solana', symbol: 'SOL', price: 168, change24h: -0.7, mcap: '74.6B', volume: '3.8B' },
    { rank: 4, name: 'BNB', symbol: 'BNB', price: 598, change24h: 0.3, mcap: '89.1B', volume: '1.6B' },
    { rank: 5, name: 'Fetch.ai', symbol: 'FET', price: 2.84, change24h: 5.2, mcap: '7.1B', volume: '890M' },
    { rank: 6, name: 'Render', symbol: 'RENDER', price: 9.45, change24h: 3.6, mcap: '3.7B', volume: '420M' },
    { rank: 7, name: 'Virtuals', symbol: 'VIRTUAL', price: 4.12, change24h: 8.9, mcap: '4.1B', volume: '520M' },
    { rank: 8, name: 'ai16z', symbol: 'AI16Z', price: 1.25, change24h: 12.4, mcap: '1.4B', volume: '310M' },
    { rank: 9, name: 'Aethir', symbol: 'ATH', price: 0.18, change24h: -1.2, mcap: '890M', volume: '98M' },
    { rank: 10, name: 'Bittensor', symbol: 'TAO', price: 458, change24h: 4.1, mcap: '3.2B', volume: '280M' },
  ];

  const sectorData = [
    { name: 'AI Agent', change: 8.4, mcap: '18.2B', fill: '#4a8cff' },
    { name: 'DePIN', change: 3.2, mcap: '14.7B', fill: '#8b5cf6' },
    { name: 'Meme', change: -2.1, mcap: '42.3B', fill: '#fb923c' },
    { name: 'DeFi', change: 1.5, mcap: '68.4B', fill: '#22d3ee' },
    { name: 'RWA', change: 2.8, mcap: '9.6B', fill: '#34d399' },
    { name: 'Btc L2', change: 0.6, mcap: '3.2B', fill: '#f87171' },
    { name: 'ZK', change: 1.1, mcap: '5.8B', fill: '#8b5cf6' },
    { name: 'GameFi', change: -0.8, mcap: '6.4B', fill: '#4a8cff' },
  ];

  const aiInsights = [
    { icon: '\u2606', text: '<strong>AI Agent</strong>\u8d5b\u9053\u4e0a\u5468\u5206\u8bbe\u6d41\u5165\u8d851.2\u4ebf\u7f8e\u5143\uff0c\u6301\u7eed\u9886\u8dd1\u5168\u5e02\u573a\u3002\u5173\u6ce8 $VIRTUAL \u548c $AI16Z \u5728 Base \u94fe\u4e0a\u7684\u751f\u6001\u90e8\u7f72\u52a8\u6001\u3002' },
    { icon: '\u2197', text: '<strong>\u5e02\u573a\u60c5\u7eea</strong>\u6050\u60e7\u4e0e\u8d2a\u5a6a\u6307\u6570\u4e3a 68\uff08\u8d2a\u5a6a\uff09\uff0c\u4f46\u5c1a\u672a\u8fbe\u5230\u9876\u90e8\u533a\u57df\uff0c\u7a7a\u5934\u6db2\u5316\u7387\u8f83\u4f4e\u3002\u4e0a\u884c\u7a7a\u95f4\u4ecd\u5728\u3002' },
    { icon: '\u26a1', text: '<strong>\u70ed\u70b9\u4e8b\u4ef6</strong>NVIDIA GTC \u5c06\u516c\u5e03\u65b0\u4e00\u4ee3 AI \u82af\u7247\uff0c\u76f4\u63a5\u5229\u597d $FET\u3001$RENDER\u3001$TAO \u7b49 AI \u5468\u671f\u9879\u76ee\u3002' },
    { icon: '\u2699', text: '<strong>\u94fe\u4e0a\u6570\u636e</strong>Base \u94fe\u6d3b\u8dc3\u5730\u5740\u521b\u65b0\u9ad8\uff08320\u4e07+\uff09\uff0cAI Agent \u5408\u7ea6\u4ea4\u4e92\u5360\u6bd4\u4ece 8% \u6500\u5347\u81f3 23%\uff0c\u5165\u5c40\u610f\u4e49\u660e\u663e\u3002' },
  ];

  // ---- DOM refs ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- Render Functions ----
  function formatPrice(p) {
    if (p >= 1) return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + p.toFixed(4);
  }

  function renderMarketTable() {
    const tbody = document.getElementById('market-tbody');
    if (!tbody) return;
    tbody.innerHTML = marketData.map(c => {
      const cls = c.change24h >= 0 ? 'pos' : 'neg';
      const sign = c.change24h >= 0 ? '+' : '';
      return `<tr>
        <td><div class="coin-info"><span class="coin-rank">${c.rank}</span><div><div class="coin-name">${c.name}</div><div class="coin-symbol">${c.symbol}</div></div></div></td>
        <td class="price">${formatPrice(c.price)}</td>
        <td class="change ${cls}">${sign}${c.change24h}%</td>
        <td>${c.mcap}</td>
        <td>${c.volume}</td>
      </tr>`;
    }).join('');
  }

  function renderSectors() {
    const grid = document.getElementById('sector-grid');
    if (!grid) return;
    const maxChange = Math.max(...sectorData.map(s => Math.abs(s.change)));
    grid.innerHTML = sectorData.map(s => {
      const cls = s.change >= 0 ? 'up' : 'down';
      const sign = s.change >= 0 ? '+' : '';
      const barW = Math.abs(s.change) / maxChange * 100;
      return `<div class="sector-card" style="border-color: ${s.fill}22">
        <div class="sector-top">
          <span class="sector-name">${s.name}</span>
          <span class="sector-change ${cls}" style="color: ${s.change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${sign}${s.change}%</span>
        </div>
        <div class="sector-bar"><div class="sector-bar-fill" style="width:${barW}%;background:${s.fill}"></div></div>
        <div class="sector-mcap">MCap: ${s.mcap}</div>
      </div>`;
    }).join('');
  }

  function renderStats() {
    const total = '$2.84T';
    const btcDom = '47.5%';
    const vol = '$82.6B';
    const fearGreed = 68;
    const fearLabel = 'Greed';

    const el = document.getElementById('stats-grid');
    if (!el) return;
    el.innerHTML = `
      <div class="stat-card"><div class="stat-label">Total Market Cap</div><div class="stat-value">${total}</div><div class="stat-change up">+2.4%</div></div>
      <div class="stat-card"><div class="stat-label">BTC Dominance</div><div class="stat-value">${btcDom}</div><div class="stat-change up">+0.3%</div></div>
      <div class="stat-card"><div class="stat-label">24h Volume</div><div class="stat-value">${vol}</div><div class="stat-change up">+8.7%</div></div>
      <div class="stat-card"><div class="stat-label">Fear & Greed</div><div class="stat-value">${fearGreed}</div><div class="stat-change up">${fearLabel}</div></div>
    `;
  }

  function renderAIInsights() {
    const container = document.getElementById('ai-insights');
    if (!container) return;
    container.innerHTML = aiInsights.map(i => `
      <div class="ai-insight">
        <span class="insight-icon">${i.icon}</span>
        <div class="insight-text">${i.text}</div>
      </div>
    `).join('');
  }

  function renderPortfolio() {
    const list = document.getElementById('portfolio-list');
    if (!list) return;
    const holdings = state.portfolio;
    if (holdings.length === 0) {
      list.innerHTML = '<div class="portfolio-empty">No holdings yet. Add coins below to track your portfolio.</div>';
      return;
    }
    list.innerHTML = holdings.map(h => {
      const coin = marketData.find(c => c.symbol === h.symbol) || { price: 0, change24h: 0 };
      const currentVal = h.amount * coin.price;
      const costBasis = h.amount * (h.entryPrice || coin.price);
      const pnl = currentVal - costBasis;
      const pnlPct = costBasis > 0 ? (pnl / costBasis * 100) : 0;
      const pnlCls = pnl >= 0 ? 'up' : 'down';
      const sign = pnl >= 0 ? '+' : '';
      return `<div class="portfolio-item">
        <div class="p-left">
          <span class="p-name">${h.symbol}</span>
          <span class="p-amount">${h.amount} ${h.symbol}</span>
        </div>
        <div>
          <div class="p-value">$${currentVal.toFixed(2)}</div>
          <div class="p-pnl ${pnlCls}" style="color: ${pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${sign}$${pnl.toFixed(2)} (${sign}${pnlPct.toFixed(1)}%)</div>
        </div>
      </div>`;
    }).join('');
  }

  function renderAll() {
    renderStats();
    renderMarketTable();
    renderSectors();
    renderAIInsights();
    renderPortfolio();
    const now = new Date();
    const el = document.querySelector('.last-update');
    if (el) el.textContent = 'Last updated: ' + now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }) + ' CST';
  }

  // ---- Navigation ----
  function showView(view) {
    state.view = view;
    const landing = document.getElementById('landing-page');
    const dash = document.getElementById('dash-page');
    landing.classList.toggle('hidden', view !== 'landing');
    landing.classList.toggle('active', view === 'landing');
    dash.classList.toggle('active', view === 'dashboard');
    // nav active state
    $$('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.view === view));
    if (view === 'dashboard') renderAll();
    window.scrollTo({ top: 0 });
  }

  // ---- Portfolio Actions ----
  function addHolding() {
    const symbolInput = document.getElementById('pf-symbol');
    const amountInput = document.getElementById('pf-amount');
    const priceInput = document.getElementById('pf-price');
    const symbol = (symbolInput.value || '').toUpperCase().trim();
    const amount = parseFloat(amountInput.value);
    const price = parseFloat(priceInput.value);
    if (!symbol || !amount || amount <= 0) {
      showToast('Please enter a valid symbol and amount.', '');
      return;
    }
    const existing = state.portfolio.findIndex(h => h.symbol === symbol);
    if (existing >= 0) {
      state.portfolio[existing].amount += amount;
      state.portfolio[existing].entryPrice = isNaN(price) ? (state.portfolio[existing].entryPrice || 0) : price;
    } else {
      state.portfolio.push({ symbol, amount, entryPrice: isNaN(price) ? 0 : price });
    }
    localStorage.setItem('nexus_portfolio', JSON.stringify(state.portfolio));
    symbolInput.value = '';
    amountInput.value = '';
    priceInput.value = '';
    renderPortfolio();
    showToast(`Added ${amount} ${symbol} to portfolio.`, 'success');
  }

  function clearPortfolio() {
    if (state.portfolio.length === 0) return;
    if (!confirm('Clear all portfolio holdings?')) return;
    state.portfolio = [];
    localStorage.removeItem('nexus_portfolio');
    renderPortfolio();
    showToast('Portfolio cleared.', 'success');
  }

  // ---- Toast ----
  function showToast(msg, cls) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast ' + (cls || '');
    requestAnimationFrame(() => { t.classList.add('show'); });
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ---- FAQ Toggle ----
  function initFAQ() {
    $$('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const isOpen = item.classList.contains('open');
        // Close others
        $$('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function() {
    // Remove loader
    const loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 600);
    }

    // Nav links
    $$('.nav-links a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        showView(a.dataset.view);
      });
    });

    // CTA buttons
    document.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', () => showView(el.dataset.view));
    });

    // Portfolio add
    const addBtn = document.getElementById('pf-add');
    if (addBtn) addBtn.addEventListener('click', addHolding);
    const pfForm = document.getElementById('pf-form');
    if (pfForm) pfForm.addEventListener('submit', e => { e.preventDefault(); addHolding(); });

    // Portfolio clear
    const clearBtn = document.getElementById('pf-clear');
    if (clearBtn) clearBtn.addEventListener('click', clearPortfolio);

    // FAQ
    initFAQ();

    // Render if dashboard was the initial view (unlikely)
    if (document.getElementById('dash-page').classList.contains('active')) {
      renderAll();
    }
  });

})();
