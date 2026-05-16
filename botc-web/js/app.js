/**
 * Blood on the Clocktower Stats - Main Application
 */

import { recalcAll, getLeaderboard, pctToStr } from './elo.js';
import { fetchGames, isDemoMode } from './supabase.js';
import { initGameEntry, updatePlayerNames } from './gameEntry.js';
import { initDataTab, renderDataTab } from './dataTab.js';
import SITE_CONFIG from './site-config.js';

// Global state
let gameLog = [];
let players = {};
let leaderboard = [];
let currentSort = { column: 'overall', ascending: false };

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const contentEl = document.getElementById('content');
const tableBodyEl = document.getElementById('leaderboard-body');
// Stats elements
const totalGamesEl = document.getElementById('total-games');
const totalPlayersEl = document.getElementById('total-players');
const goodWinsEl = document.getElementById('good-wins');
const evilWinsEl = document.getElementById('evil-wins');
const goodWinsCountEl = document.getElementById('good-wins-count');
const evilWinsCountEl = document.getElementById('evil-wins-count');
const winBarGoodEl = document.getElementById('win-bar-good');
const winBarEvilEl = document.getElementById('win-bar-evil');

/**
 * Initialize the application
 */
async function init() {
    try {
        showLoading();

        // Apply community name from config
        const h1 = document.querySelector('header h1');
        if (h1 && SITE_CONFIG.communityName) {
            h1.textContent = SITE_CONFIG.communityName;
        }

        // Show demo banner if in demo mode
        if (isDemoMode()) {
            const banner = document.createElement('div');
            banner.className = 'demo-banner';
            banner.innerHTML = 'Demo Mode — showing sample data. <a href="https://github.com/RossFW/botc-stats#quick-start-5-steps" target="_blank">Set up your own</a>';
            document.querySelector('.container').prepend(banner);
        }

        // Fetch game data
        gameLog = await fetchGames();

        // Calculate ELO ratings
        players = recalcAll(gameLog);

        // Generate leaderboard
        leaderboard = getLeaderboard(players);

        // Update stats summary
        updateStatsSummary();

        // Render the leaderboard
        renderLeaderboard();

        // Set up event listeners
        setupEventListeners();

        // Initialize game entry module with refresh callback and player names from Supabase
        const playerNames = [...new Set(gameLog.flatMap(g => g.players.map(p => p.name)))].sort();
        initGameEntry(refreshData, playerNames);
        initDataTab({ getGames: () => gameLog });
        renderDataTab();

        showContent();
    } catch (error) {
        console.error('Failed to initialize:', error);
        showError(error.message);
    }
}

/**
 * Show loading state
 */
function showLoading() {
    loadingEl.style.display = 'flex';
    errorEl.style.display = 'none';
    contentEl.style.display = 'none';
}

/**
 * Show error state
 */
function showError(message) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.querySelector('.error-text').textContent = message;
    contentEl.style.display = 'none';
}

/**
 * Show main content
 */
function showContent() {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    contentEl.style.display = 'block';
}

/**
 * Refresh data from the database (called after game is added)
 */
async function refreshData() {
    try {
        // Refetch games
        gameLog = await fetchGames();

        // Recalculate ELO ratings
        players = recalcAll(gameLog);

        // Regenerate leaderboard
        leaderboard = getLeaderboard(players);

        // Update display
        updateStatsSummary();
        renderLeaderboard();

        // Update autocomplete with any new player names from Supabase
        const updatedNames = [...new Set(gameLog.flatMap(g => g.players.map(p => p.name)))].sort();
        updatePlayerNames(updatedNames);
        renderDataTab();
    } catch (error) {
        console.error('Failed to refresh data:', error);
    }
}

/**
 * Update the stats summary cards
 */
function updateStatsSummary() {
    const totalGames = gameLog.length;
    const noGamesMsg = document.getElementById('no-games-msg');

    if (totalGames === 0) {
        totalGamesEl.textContent = 0;
        totalPlayersEl.textContent = 0;
        if (winBarGoodEl) winBarGoodEl.style.display = 'none';
        if (winBarEvilEl) winBarEvilEl.style.display = 'none';
        if (noGamesMsg) noGamesMsg.style.display = 'block';
        return;
    }

    // Hide message
    if (noGamesMsg) noGamesMsg.style.display = 'none';

    const goodWins = gameLog.filter(g => g.winning_team === 'Good').length;
    const evilWins = gameLog.filter(g => g.winning_team === 'Evil').length;
    const uniquePlayers = new Set(gameLog.flatMap(g => g.players.map(p => p.name))).size;

    totalGamesEl.textContent = totalGames;
    totalPlayersEl.textContent = uniquePlayers;
    const goodPct = ((goodWins / totalGames) * 100).toFixed(1);
    const evilPct = ((evilWins / totalGames) * 100).toFixed(1);
    goodWinsEl.textContent = `${goodPct}%`;
    evilWinsEl.textContent = `${evilPct}%`;
    if (goodWinsCountEl) goodWinsCountEl.textContent = goodWins;
    if (evilWinsCountEl) evilWinsCountEl.textContent = evilWins;

    // Hide bar segment when 0%, show when > 0%
    if (winBarGoodEl) {
        winBarGoodEl.style.display = goodWins > 0 ? '' : 'none';
        winBarGoodEl.style.width = `${goodPct}%`;
    }
    if (winBarEvilEl) {
        winBarEvilEl.style.display = evilWins > 0 ? '' : 'none';
        winBarEvilEl.style.width = `${evilPct}%`;
    }
}

/**
 * Render the leaderboard table
 */
function renderLeaderboard() {
    // Sort the leaderboard
    const sortedLeaderboard = [...leaderboard].sort((a, b) => {
        let aVal, bVal;

        switch (currentSort.column) {
            case 'rank':
                aVal = a.rank;
                bVal = b.rank;
                break;
            case 'name':
                aVal = a.name.toLowerCase();
                bVal = b.name.toLowerCase();
                return currentSort.ascending
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            case 'overall':
                aVal = a.overallWinPct || 0;
                bVal = b.overallWinPct || 0;
                break;
            case 'good':
                aVal = a.goodWinPct || 0;
                bVal = b.goodWinPct || 0;
                break;
            case 'evil':
                aVal = a.evilWinPct || 0;
                bVal = b.evilWinPct || 0;
                break;
            case 'games':
                aVal = a.gamesPlayed;
                bVal = b.gamesPlayed;
                break;
            default:
                aVal = a.overallWinPct || 0;
                bVal = b.overallWinPct || 0;
        }

        return currentSort.ascending ? aVal - bVal : bVal - aVal;
    });

    // Clear existing rows
    tableBodyEl.innerHTML = '';

    // Add rows
    sortedLeaderboard.forEach((player, index) => {
        const row = document.createElement('tr');
        row.className = 'clickable';
        row.dataset.playerName = player.name;

        const displayRank = currentSort.column === 'rank' ? player.rank : index + 1;

        // Rank styling (top 3 by current sort order)
        let rankClass = '';
        if (displayRank === 1) rankClass = 'rank-1';
        else if (displayRank === 2) rankClass = 'rank-2';
        else if (displayRank === 3) rankClass = 'rank-3';

        row.innerHTML = `
            <td class="rank ${rankClass}">${displayRank}</td>
            <td class="player-name">${formatPlayerName(player.name)}</td>
            <td class="pct">
                <div class="pct-bar">
                    <span>${pctToStr(player.overallWinPct)}%</span>
                    <div class="bar">
                        <div class="bar-fill overall" style="width: ${player.overallWinPct || 0}%"></div>
                    </div>
                </div>
            </td>
            <td class="pct">
                <div class="pct-bar">
                    <span>${pctToStr(player.goodWinPct)}%</span>
                    <div class="bar">
                        <div class="bar-fill good" style="width: ${player.goodWinPct || 0}%"></div>
                    </div>
                </div>
            </td>
            <td class="pct">
                <div class="pct-bar">
                    <span>${pctToStr(player.evilWinPct)}%</span>
                    <div class="bar">
                        <div class="bar-fill evil" style="width: ${player.evilWinPct || 0}%"></div>
                    </div>
                </div>
            </td>
            <td class="games">${player.gamesPlayed}</td>
        `;

        tableBodyEl.appendChild(row);
    });

    // Update column headers for sort indicators
    updateSortIndicators();
}

/**
 * Format player name for display (replace underscores with spaces)
 */
function formatPlayerName(name) {
    return name.replace(/_/g, ' ');
}

/**
 * Update sort indicators on column headers
 */
function updateSortIndicators() {
    document.querySelectorAll('.leaderboard-table th[data-sort]').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        if (th.dataset.sort === currentSort.column) {
            th.classList.add(currentSort.ascending ? 'sorted-asc' : 'sorted-desc');
        }
    });
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    document.querySelectorAll('.page-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            document.querySelectorAll('.page-tab').forEach(t => t.classList.toggle('active', t === tab));
            document.querySelectorAll('.page-panel').forEach(panel => {
                panel.classList.toggle('active', panel.id === `panel-${page}`);
            });
            if (page === 'data') renderDataTab();
        });
    });

    // Column sorting
    document.querySelectorAll('.leaderboard-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (currentSort.column === column) {
                currentSort.ascending = !currentSort.ascending;
            } else {
                currentSort.column = column;
                currentSort.ascending = column === 'name' || column === 'rank';
            }
            renderLeaderboard();
        });
    });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
