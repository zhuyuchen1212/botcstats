/**
 * Data tab — browse and edit past games
 */

import { editGameById } from './gameEntry.js';

let getGamesFn = () => [];
let dataFilter = '';

/**
 * @param {Object} options
 * @param {() => Array} options.getGames
 */
export function initDataTab({ getGames }) {
    getGamesFn = getGames;

    const filterInput = document.getElementById('data-filter');
    if (filterInput) {
        filterInput.addEventListener('input', () => {
            dataFilter = filterInput.value.trim().toLowerCase();
            renderDataTab();
        });
    }

    const tbody = document.getElementById('data-games-body');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-edit-game]');
            if (btn) {
                const id = parseInt(btn.dataset.editGame, 10);
                if (!isNaN(id)) editGameById(id);
            }
        });
    }
}

/**
 * Re-render the games table (call after fetch / update).
 */
export function renderDataTab() {
    const tbody = document.getElementById('data-games-body');
    const countEl = document.getElementById('data-game-count');
    if (!tbody) return;

    const games = [...getGamesFn()].sort((a, b) => b.game_id - a.game_id);
    const q = dataFilter;

    const filtered = q
        ? games.filter(g => {
            const idStr = String(g.game_id);
            const script = (g.game_mode || '').toLowerCase();
            const st = (g.story_teller || '').toLowerCase().replace(/_/g, ' ');
            const winner = (g.winning_team || '').toLowerCase();
            const players = (g.players || []).map(p => p.name.toLowerCase()).join(' ');
            return idStr.includes(q) || script.includes(q) || st.includes(q)
                || winner.includes(q) || players.includes(q);
        })
        : games;

    if (countEl) {
        countEl.textContent = q
            ? `${filtered.length} of ${games.length} games`
            : `${games.length} games`;
    }

    tbody.innerHTML = '';

    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" class="data-empty">No games match your search</td>';
        tbody.appendChild(row);
        return;
    }

    for (const g of filtered) {
        const row = document.createElement('tr');
        const dateStr = g.date ? new Date(g.date).toLocaleDateString() : '—';
        const st = (g.story_teller || '—').replace(/_/g, ' ').replace(/\+/g, ', ');
        const playerCount = g.players ? g.players.length : 0;
        const winnerClass = g.winning_team === 'Good' ? 'good-text' : 'evil-text';

        row.innerHTML = `
            <td><strong>#${g.game_id}</strong></td>
            <td>${dateStr}</td>
            <td>${escapeHtml(g.game_mode || '—')}</td>
            <td>${escapeHtml(st)}</td>
            <td class="${winnerClass}">${g.winning_team || '—'}</td>
            <td>${playerCount}</td>
            <td class="data-actions">
                <button type="button" class="edit-game-btn secondary data-edit-btn" data-edit-game="${g.game_id}">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
