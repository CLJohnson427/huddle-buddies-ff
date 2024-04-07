/**********************************************************
  Sleeper API Interfaces
/*********************************************************/
export interface UserMetadata {
  allow_pn: string;
  archived: string;
  avatar: string;
  join_voice_pn: string;
  mascot_item_type_id_leg_1: string;
  mascot_item_type_id_leg_2: string;
  mascot_item_type_id_leg_3: string;
  mascot_item_type_id_leg_4: string;
  mascot_item_type_id_leg_5: string;
  mascot_item_type_id_leg_6: string;
  mascot_item_type_id_leg_7: string;
  mascot_item_type_id_leg_8: string;
  mascot_item_type_id_leg_9: string;
  mascot_item_type_id_leg_10: string;
  mascot_item_type_id_leg_11: string;
  mascot_item_type_id_leg_12: string;
  mascot_item_type_id_leg_13: string;
  mascot_item_type_id_leg_14: string;
  mascot_item_type_id_leg_15: string;
  mascot_item_type_id_leg_16: string;
  mascot_item_type_id_leg_17: string;
  mascot_item_type_id_leg_18: string;
  mascot_message: string;
  mascot_message_emotion_leg_1: string;
  mascot_message_emotion_leg_2: string;
  mascot_message_emotion_leg_3: string;
  mascot_message_emotion_leg_4: string;
  mascot_message_emotion_leg_5: string;
  mascot_message_emotion_leg_6: string;
  mascot_message_emotion_leg_7: string;
  mascot_message_emotion_leg_8: string;
  mascot_message_emotion_leg_9: string;
  mascot_message_emotion_leg_10: string;
  mascot_message_emotion_leg_11: string;
  mascot_message_emotion_leg_12: string;
  mascot_message_emotion_leg_13: string;
  mascot_message_emotion_leg_14: string;
  mascot_message_emotion_leg_15: string;
  mascot_message_emotion_leg_16: string;
  mascot_message_emotion_leg_17: string;
  mascot_message_emotion_leg_18: string;
  mention_pn: string;
  player_like_pn: string;
  player_nickname_update: string;
  show_mascots: string;
  team_name: string;
  team_name_update: string;
  trade_block_pn: string;
  transaction_commissioner: string;
  transaction_free_agent: string;
  transaction_trade: string;
  transaction_waiver: string;
  user_message_pn: string;
}

export interface User {
  avatar: string;
  display_name: string;
  is_bot?: boolean;
  is_owner?: boolean;
  league_id: string;
  metadata: UserMetadata;
  settings?: any;
  user_id: string;
}

/**********************************************************
  Custom Interfaces
/*********************************************************/
export interface Users {
  league_id: string;
  user: Map<string, User>;
}

export interface LeagueManager {
  avatar: string;
  leagueId: string;
  managerName: string;
  teamName: string;
  userId: string;
}
