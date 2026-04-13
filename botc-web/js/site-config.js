/**
 * Site Configuration
 *
 * This is the ONLY file you need to edit to set up your community's site.
 * Everything else works out of the box.
 */

const SITE_CONFIG = {
    // ==========================================
    // REQUIRED: Supabase Connection
    // ==========================================
    // Get these from: Supabase Dashboard > Settings > API
    // Leave as-is to use demo mode with sample data.

    supabaseUrl: 'https://ayzigncvdlbdkbgyixrx.supabase.co/',           // e.g., 'https://abcdefgh.supabase.co'
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5emlnbmN2ZGxiZGtiZ3lpeHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwOTQxNzUsImV4cCI6MjA5MTY3MDE3NX0.p2_j5YEOF-DIiQ_etBG3E9K-4hMkH6WRGF_y8wLyM3E',   // The "anon public" key

    // ==========================================
    // OPTIONAL: Customize Your Site
    // ==========================================

    // Community name shown in the header
    communityName: 'Blood on the Clocktower',

    // Minimum games a player needs to appear on the leaderboard
    minGamesForLeaderboard: 1,

    // ELO settings
    defaultRating: 1500,    // Starting ELO for new players
    kFactor: 32,            // How much each game affects ratings (higher = more volatile)
};

// Export for use in other modules
// (Do not modify below this line)
export default SITE_CONFIG;
