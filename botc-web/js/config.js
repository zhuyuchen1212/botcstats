/**
 * Centralized configuration for Blood on the Clocktower (BOTC) analytics.
 * Ported from botc_config.py
 */

// Scripts considered part of the normal rotation
// All other scripts are considered Teensyville (small-player scripts)
export const NORMAL_SCRIPTS = new Set([
    "trouble brewing",
    "bad moon rising",
    "sects & violets",
    "trouble in violets",
    "trouble in legion",
    "hide & seek",
    "trouble brewing on expert mode",
    "trained killer",
    "irrational behavior",
    "binary supernovae",
    "everybody can play"
]);

// List of commonly used game modes/scripts for dropdown menus
export const COMMON_SCRIPTS = [
    "Trouble Brewing",
    "Bad Moon Rising",
    "Sects & Violets",
    "Trouble in Violets",
    "No Greater Joy",
    "Over the River",
    "Laissez un Faire",
    "Trouble in Legion",
    "Hide & Seek",
    "Trouble Brewing on Expert Mode",
    "Trained Killer",
    "Irrational Behavior",
    "Binary Supernovae",
    "A Leech of Distrust",
    "Everybody Can Play",
];

// Mapping of normalized character names to their role types
export const CHARACTER_ROLE_TYPES = {
    // Demons
    "al-hadikhia": "Demons",
    "fang_gu": "Demons",
    "imp": "Demons",
    "kazali": "Demons",
    "legion": "Demons",
    "leviathan": "Demons",
    "lil'_monsta": "Demons",
    "lleech": "Demons",
    "lord_of_typhon": "Demons",
    "no_dashii": "Demons",
    "ojo": "Demons",
    "po": "Demons",
    "pukka": "Demons",
    "riot": "Demons",
    "shabaloth": "Demons",
    "vigormortis": "Demons",
    "vortox": "Demons",
    "yaggababble": "Demons",
    "zombuul": "Demons",
    // Minions
    "assassin": "Minions",
    "baron": "Minions",
    "boffin": "Minions",
    "boomdandy": "Minions",
    "cerenovus": "Minions",
    "devil's_advocate": "Minions",
    "evil_twin": "Minions",
    "fearmonger": "Minions",
    "goblin": "Minions",
    "godfather": "Minions",
    "harpy": "Minions",
    "marionette": "Minions",
    "mastermind": "Minions",
    "mezepheles": "Minions",
    "organ_grinder": "Minions",
    "pit-hag": "Minions",
    "poisoner": "Minions",
    "psychopath": "Minions",
    "scarlet_woman": "Minions",
    "spy": "Minions",
    "summoner": "Minions",
    "vizier": "Minions",
    "widow": "Minions",
    "witch": "Minions",
    "wizard": "Minions",
    "wraith": "Minions",
    "xaan": "Minions",
    // Outsiders
    "barber": "Outsiders",
    "butler": "Outsiders",
    "damsel": "Outsiders",
    "drunk": "Outsiders",
    "golem": "Outsiders",
    "goon": "Outsiders",
    "hatter": "Outsiders",
    "heretic": "Outsiders",
    "hermit": "Outsiders",
    "klutz": "Outsiders",
    "lunatic": "Outsiders",
    "moonchild": "Outsiders",
    "mutant": "Outsiders",
    "ogre": "Outsiders",
    "plague_doctor": "Outsiders",
    "politician": "Outsiders",
    "puzzlemaster": "Outsiders",
    "recluse": "Outsiders",
    "saint": "Outsiders",
    "snitch": "Outsiders",
    "sweetheart": "Outsiders",
    "tinker": "Outsiders",
    "zealot": "Outsiders",
    // Townsfolk
    "acrobat": "Townsfolk",
    "alchemist": "Townsfolk",
    "alsaahir": "Townsfolk",
    "amnesiac": "Townsfolk",
    "artist": "Townsfolk",
    "atheist": "Townsfolk",
    "balloonist": "Townsfolk",
    "banshee": "Townsfolk",
    "bounty_hunter": "Townsfolk",
    "cannibal": "Townsfolk",
    "chambermaid": "Townsfolk",
    "chef": "Townsfolk",
    "choirboy": "Townsfolk",
    "clockmaker": "Townsfolk",
    "courtier": "Townsfolk",
    "cult_leader": "Townsfolk",
    "dreamer": "Townsfolk",
    "empath": "Townsfolk",
    "engineer": "Townsfolk",
    "exorcist": "Townsfolk",
    "farmer": "Townsfolk",
    "fisherman": "Townsfolk",
    "flowergirl": "Townsfolk",
    "fool": "Townsfolk",
    "fortune_teller": "Townsfolk",
    "gambler": "Townsfolk",
    "general": "Townsfolk",
    "gossip": "Townsfolk",
    "grandmother": "Townsfolk",
    "high_priestess": "Townsfolk",
    "huntsman": "Townsfolk",
    "innkeeper": "Townsfolk",
    "investigator": "Townsfolk",
    "juggler": "Townsfolk",
    "king": "Townsfolk",
    "knight": "Townsfolk",
    "librarian": "Townsfolk",
    "lycanthrope": "Townsfolk",
    "magician": "Townsfolk",
    "mathematician": "Townsfolk",
    "mayor": "Townsfolk",
    "minstrel": "Townsfolk",
    "monk": "Townsfolk",
    "nightwatchman": "Townsfolk",
    "noble": "Townsfolk",
    "oracle": "Townsfolk",
    "pacifist": "Townsfolk",
    "philosopher": "Townsfolk",
    "pixie": "Townsfolk",
    "poppy_grower": "Townsfolk",
    "preacher": "Townsfolk",
    "princess": "Townsfolk",
    "professor": "Townsfolk",
    "ravenkeeper": "Townsfolk",
    "sage": "Townsfolk",
    "sailor": "Townsfolk",
    "savant": "Townsfolk",
    "seamstress": "Townsfolk",
    "shugenja": "Townsfolk",
    "slayer": "Townsfolk",
    "snake_charmer": "Townsfolk",
    "soldier": "Townsfolk",
    "steward": "Townsfolk",
    "tea_lady": "Townsfolk",
    "town_crier": "Townsfolk",
    "undertaker": "Townsfolk",
    "village_idiot": "Townsfolk",
    "virgin": "Townsfolk",
    "washerwoman": "Townsfolk",
    // Travellers
    "apprentice": "Travellers",
    "barista": "Travellers",
    "beggar": "Travellers",
    "bishop": "Travellers",
    "bone_collector": "Travellers",
    "bureaucrat": "Travellers",
    "butcher": "Travellers",
    "cacklejack": "Travellers",
    "deviant": "Travellers",
    "gangster": "Travellers",
    "gnome": "Travellers",
    "gunslinger": "Travellers",
    "harlot": "Travellers",
    "judge": "Travellers",
    "matron": "Travellers",
    "scapegoat": "Travellers",
    "thief": "Travellers",
    "voudon": "Travellers",
};

// Fabled characters (game-level modifiers, not player roles)
export const FABLED = [
    "Angel",
    "Buddhist",
    "Deus_Ex_Fiasco",
    "Djinn",
    "Doomsayer",
    "Duchess",
    "Ferryman",
    "Fiddler",
    "Fibbin",
    "Hell's_Librarian",
    "Revolutionary",
    "Sentinel",
    "Spirit_Of_Ivory",
    "Toymaker",
];

// Loric characters (game-level modifiers, not player roles)
export const LORICS = [
    "Big_Wig",
    "Bootlegger",
    "Gardener",
    "God_Of_Ug",
    "Hindu",
    "Knaves",
    "Pope",
    "Storm_Catcher",
    "Tor",
    "Ventriloquist",
    "Zenomancer",
];

/**
 * Return a lowercase stripped version of a script name for comparison.
 */
export function normalizeScriptName(name) {
    return (name || "").trim().toLowerCase();
}

/** Default category for scripts in the hardcoded dropdown (when not in Supabase). */
const DEFAULT_SCRIPT_CATEGORIES = {
    "trouble brewing": "Normal",
    "bad moon rising": "Normal",
    "sects & violets": "Normal",
    "trouble in violets": "Normal",
    "no greater joy": "Teensyville",
    "over the river": "Teensyville",
    "laissez un faire": "Teensyville",
    "trouble in legion": "Normal",
    "hide & seek": "Normal",
    "trouble brewing on expert mode": "Normal",
    "trained killer": "Normal",
    "irrational behavior": "Normal",
    "binary supernovae": "Normal",
    "a leech of distrust": "Teensyville",
    "everybody can play": "Normal",
};

/** Categories from Supabase scripts table (name -> Normal | Teensyville). */
let scriptCategoryMap = new Map();

/**
 * Load script categories from the database scripts list.
 * @param {Array<{name: string, category: string}>} scripts
 */
export function setScriptCategories(scripts) {
    scriptCategoryMap = new Map();
    if (!scripts) return;
    for (const s of scripts) {
        if (s.name && s.category) {
            scriptCategoryMap.set(normalizeScriptName(s.name), s.category);
        }
    }
}

/**
 * Get category for a script name (without player-count fallback).
 * @param {string} name
 * @returns {'Normal'|'Teensyville'}
 */
export function getScriptCategory(name) {
    const key = normalizeScriptName(name);
    if (scriptCategoryMap.has(key)) {
        return scriptCategoryMap.get(key);
    }
    if (DEFAULT_SCRIPT_CATEGORIES[key]) {
        return DEFAULT_SCRIPT_CATEGORIES[key];
    }
    if (NORMAL_SCRIPTS.has(key)) {
        return "Normal";
    }
    return "Teensyville";
}

/**
 * Categorize a script as 'Normal' or 'Teensyville'.
 * @param {string} name - Script name
 * @param {number|null} playerCount - Optional player count for fallback
 */
export function categorizeScript(name, playerCount = null) {
    const key = normalizeScriptName(name);
    if (scriptCategoryMap.has(key)) {
        return scriptCategoryMap.get(key);
    }
    // Player count is the most reliable signal for games without a DB script entry
    if (playerCount != null) {
        if (playerCount >= 7) return "Normal";
        if (playerCount >= 5 && playerCount <= 6) return "Teensyville";
    }
    if (DEFAULT_SCRIPT_CATEGORIES[key]) {
        return DEFAULT_SCRIPT_CATEGORIES[key];
    }
    if (NORMAL_SCRIPTS.has(key)) {
        return "Normal";
    }
    return "Teensyville";
}

/**
 * Categorize a game using stored category, script name, and player count.
 * @param {Object} game
 * @returns {'Normal'|'Teensyville'}
 */
export function categorizeGame(game) {
    if (game?.modifiers?.category) {
        return game.modifiers.category;
    }
    const playerCount = game?.players?.length ?? null;
    return categorizeScript(game?.game_mode || "", playerCount);
}

/**
 * Normalize a character name for consistent lookups.
 * Converts spaces to underscores, handles apostrophes and hyphens,
 * and makes it lowercase for case-insensitive matching.
 */
export function normalizeCharacterName(name) {
    if (!name) return "";
    return name.replace(/ /g, "_").toLowerCase().trim();
}

/**
 * Get the role type for a character.
 * Returns: "Townsfolk", "Outsiders", "Minions", "Demons", or "Travellers"
 */
export function getCharacterRoleType(characterName) {
    const normalized = normalizeCharacterName(characterName);

    // Try exact match first
    if (CHARACTER_ROLE_TYPES[normalized]) {
        return CHARACTER_ROLE_TYPES[normalized];
    }

    // Try with hyphen replaced by underscore
    if (normalized.includes("-")) {
        const altNormalized = normalized.replace(/-/g, "_");
        if (CHARACTER_ROLE_TYPES[altNormalized]) {
            return CHARACTER_ROLE_TYPES[altNormalized];
        }
    }

    // Try with underscore replaced by hyphen
    if (normalized.includes("_")) {
        const altNormalized = normalized.replace(/_/g, "-");
        if (CHARACTER_ROLE_TYPES[altNormalized]) {
            return CHARACTER_ROLE_TYPES[altNormalized];
        }
    }

    return "Unknown";
}
