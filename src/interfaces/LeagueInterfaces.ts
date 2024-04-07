/**********************************************************
  Sleeper API Interfaces
/*********************************************************/
export interface LeagueSettings {
  best_ball: number;
  bench_lock: number;
  capacity_override: number;
  daily_waivers: number;
  daily_waivers_base: number;
  daily_waivers_days: number;
  daily_waivers_hour: number;
  daily_waivers_last_ran: number;
  disable_adds: number;
  disable_trades: number;
  divisions: number;
  draft_rounds: number;
  last_report: number;
  last_scored_leg: number;
  league_average_match: number;
  leg: number;
  max_keepers: number;
  num_teams: number;
  offseason_adds: number;
  pick_trading: number;
  playoff_round_type: number;
  playoff_seed_type: number;
  playoff_teams: number;
  playoff_type: number;
  playoff_week_start: number;
  reserve_allow_cov: number;
  reserve_allow_dnr: number;
  reserve_allow_doubtful: number;
  reserve_allow_na: number;
  reserve_allow_out: number;
  reserve_allow_sus: number;
  reserve_slots: number;
  squads: number;
  start_week: number;
  taxi_allow_vets: number;
  taxi_deadline: number;
  taxi_slots: number;
  taxi_years: number;
  trade_deadline: number;
  trade_review_days: number;
  type: number;
  waiver_budget: number;
  waiver_clear_days: number;
  waiver_day_of_week: number;
  waiver_type: number;
}

export interface ScoringSettings {
  blk_kick: number;
  bonus_pass_yd_300: number;
  bonus_pass_yd_400: number;
  bonus_rec_yd_100: number;
  bonus_rec_yd_200: number;
  bonus_rush_yd_100: number;
  bonus_rush_yd_200: number;
  def_st_ff: number;
  def_st_fum_rec: number;
  def_st_td: number;
  def_td: number;
  ff: number;
  fgm_0_19: number;
  fgm_20_29: number;
  fgm_30_39: number;
  fgm_40_49: number;
  fgm_50p: number;
  fgmiss: number;
  fum: number;
  fum_lost: number;
  fum_rec: number;
  fum_rec_td: number;
  int: number;
  kr_td: number;
  kr_yd: number;
  pass_2pt: number;
  pass_cmp_40p: number;
  pass_int: number;
  pass_td: number;
  pass_td_40p: number;
  pass_yd: number;
  pr_td: number;
  pr_yd: number;
  pts_allow_0: number;
  pts_allow_1_6: number;
  pts_allow_7_13: number;
  pts_allow_14_20: number;
  pts_allow_21_27: number;
  pts_allow_28_34: number;
  pts_allow_35p: number;
  rec: number;
  rec_2pt: number;
  rec_40p: number;
  rec_td: number;
  rec_td_40p: number;
  rec_yd: number;
  rush_2pt: number;
  rush_40p: number;
  rush_td: number;
  rush_td_40p: number;
  rush_yd: number;
  sack: number;
  safe: number;
  st_ff: number;
  st_fum_rec: number;
  st_td: number;
  xpm: number;
  xpmiss: number;
}

export interface LeagueMetadata {
  continued: string;
  trophy_loser: string;
  trophy_loser_background: string;
  trophy_loser_banner_text: string;
  trophy_winner: string;
  trophy_winner_background: string;
  trophy_winner_banner_text: string;
}

export interface League {
  avatar: string;
  bracket_id: number;
  company_id?: any;
  draft_id: string;
  group_id?: any;
  last_author_avatar?: any;
  last_author_display_name: string;
  last_author_id: string;
  last_author_is_bot: boolean;
  last_message_attachment?: any;
  last_message_id: string;
  last_message_text_map?: any;
  last_message_time: number;
  last_pinned_message_id?: any;
  last_read_id?: any;
  league_id: string;
  loser_bracket_id: number;
  metadata: LeagueMetadata;
  name: string;
  previous_league_id: string;
  roster_positions: string[];
  scoring_settings: ScoringSettings;
  season: string;
  season_type: string;
  settings: LeagueSettings;
  shard: number;
  sport: string;
  status: string;
  total_rosters: number;
}

/**********************************************************
  Custom Interfaces
/*********************************************************/
export interface LeagueId {
  leagueId: string,
  year: number
}
