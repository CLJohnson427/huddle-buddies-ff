export interface TeamFrom {
  w?: number
  l?: number
}

export interface PlayoffBracket {
  /** The round for this matchup, 1st, 2nd, 3rd round, etc. */
  r: number
  /** The match id of the matchup, unique for all matchups within a bracket. */
  m: number
  /** The roster_id of a team in this matchup OR {w: 1} which means the winner of match id 1. */
  t1: number
  /** The roster_id of the other team in this matchup OR {l: 1} which means the loser of match id 1. */
  t2: number
  /** The roster_id of the winning team, if the match has been played. */
  w: number
  /** The roster_id of the losing team, if the match has been played. */
  l: number
  /** Object - Where t1 comes from, either winner or loser of the match id, necessary to show bracket progression. */
  t1_from: TeamFrom
  /** Object - Where t2 comes from, either winner or loser of the match id, necessary to show bracket progression. */
  t2_from: TeamFrom
  /**  */
  p?: number
}
