export interface TeamFrom {
  w?: number;
  l?: number;
}

export interface PlayoffBracket {
  r: number; // The round for this matchup, 1st, 2nd, 3rd round, etc.
  m: number; // The match id of the matchup, unique for all matchups within a bracket.
  t1: number; // The roster_id of a team in this matchup OR {w: 1} which means the winner of match id 1.
  t2: number; // The roster_id of the other team in this matchup OR {l: 1} which means the loser of match id 1.
  w: number; // The roster_id of the winning team, if the match has been played.
  l: number; // The roster_id of the losing team, if the match has been played.
  t2_from: TeamFrom; // Object 	Where t1 comes from, either winner or loser of the match id, necessary to show bracket progression.
  t1_from: TeamFrom; // Object 	Where t2 comes from, either winner or loser of the match id, necessary to show bracket progression.
  p?: number;
}
