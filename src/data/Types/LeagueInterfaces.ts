export interface Settings {
  max_keepers: number;
  draft_rounds: number;
  trade_review_days: number;
  squads: number;
  reserve_allow_dnr: number;
  capacity_override: number;
  pick_trading: number;
  disable_trades: number;
  taxi_years: number;
  taxi_allow_vets: number;
  best_ball: number;
  last_report: number;
  disable_adds: number;
  waiver_type: number;
  bench_lock: number;
  reserve_allow_sus: number;
  type: number;
  reserve_allow_cov: number;
  waiver_clear_days: number;
  daily_waivers_last_ran: number;
  daily_waivers_base: number;
  waiver_day_of_week: number;
  start_week: number;
  playoff_teams: number;
  num_teams: number;
  reserve_slots: number;
  playoff_round_type: number;
  daily_waivers_hour: number;
  waiver_budget: number;
  reserve_allow_out: number;
  offseason_adds: number;
  last_scored_leg: number;
  playoff_seed_type: number;
  daily_waivers: number;
  divisions: number;
  playoff_week_start: number;
  daily_waivers_days: number;
  league_average_match: number;
  leg: number;
  trade_deadline: number;
  reserve_allow_doubtful: number;
  taxi_deadline: number;
  reserve_allow_na: number;
  taxi_slots: number;
  playoff_type: number;
}

export interface ScoringSettings {
  pass_2pt: number;
  kr_yd: number;
  pass_int: number;
  fgmiss: number;
  rec_yd: number;
  xpmiss: number;
  fgm_30_39: number;
  blk_kick: number;
  pts_allow_7_13: number;
  bonus_rush_yd_100: number;
  ff: number;
  fgm_20_29: number;
  fgm_40_49: number;
  pts_allow_1_6: number;
  st_fum_rec: number;
  def_st_ff: number;
  st_ff: number;
  rush_40p: number;
  pass_td_40p: number;
  pts_allow_28_34: number;
  fgm_50p: number;
  fum_rec: number;
  bonus_rec_yd_200: number;
  def_td: number;
  fgm_0_19: number;
  bonus_pass_yd_300: number;
  pr_td: number;
  int: number;
  pts_allow_0: number;
  bonus_rush_yd_200: number;
  pts_allow_21_27: number;
  rec_2pt: number;
  rec: number;
  pass_cmp_40p: number;
  xpm: number;
  st_td: number;
  kr_td: number;
  def_st_fum_rec: number;
  def_st_td: number;
  sack: number;
  fum_rec_td: number;
  rush_2pt: number;
  rec_td: number;
  rush_td_40p: number;
  rec_td_40p: number;
  pts_allow_35p: number;
  pts_allow_14_20: number;
  rush_yd: number;
  pr_yd: number;
  bonus_pass_yd_400: number;
  rec_40p: number;
  pass_yd: number;
  pass_td: number;
  rush_td: number;
  bonus_rec_yd_100: number;
  fum_lost: number;
  fum: number;
  safe: number;
}

export interface LeagueMetadata {
  trophy_winner_banner_text: string;
  trophy_winner_background: string;
  trophy_winner: string;
  trophy_loser_banner_text: string;
  trophy_loser_background: string;
  trophy_loser: string;
  continued: string;
}

export interface League {
  total_rosters: number;
  status: string;
  sport: string;
  shard: number;
  settings: Settings;
  season_type: string;
  season: string;
  scoring_settings: ScoringSettings;
  roster_positions: string[];
  previous_league_id: string;
  name: string;
  metadata: LeagueMetadata;
  loser_bracket_id: number;
  league_id: string;
  last_read_id?: any;
  last_pinned_message_id?: any;
  last_message_time: number;
  last_message_text_map?: any;
  last_message_id: string;
  last_message_attachment?: any;
  last_author_is_bot: boolean;
  last_author_id: string;
  last_author_display_name: string;
  last_author_avatar?: any;
  group_id?: any;
  draft_id: string;
  company_id?: any;
  bracket_id: number;
  avatar: string;
}


// Custom
export interface LeagueId {
  leagueId: string,
  year: number
}
