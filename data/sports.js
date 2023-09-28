export const sports = {
  SPORT_1: {
    name: "Sport 1",
    teams: {
      TEAM_1: {
        name: "Team 1",
        players: ["PLAYER_1"],
      },
      TEAM_2: {
        name: "Team 2",
        players: ["PLAYER_2"],
      },
      TEAM_3: {
        name: "Team 3",
        players: ["PLAYER_3"],
      },
      TEAM_4: {
        name: "Team 4",
        players: ["PLAYER_4"],
      },
      TEAM_5: {
        name: "Team 5",
        players: ["PLAYER_5"],
      },
      TEAM_6: {
        name: "Team 6",
        players: ["PLAYER_6"],
      },
      TEAM_7: {
        name: "Team 7",
        players: ["PLAYER_7"],
      },
      TEAM_8: {
        name: "Team 8",
        players: ["PLAYER_8"],
      },
    },
    groups: {
      GROUP_1: {
        name: "Group 1",
        teams: ["TEAM_1", "TEAM_2", "TEAM_3", "TEAM_4"],
      },
      GROUP_2: {
        name: "Group 2",
        teams: ["TEAM_5", "TEAM_6", "TEAM_7", "TEAM_8"],
      },
    },
    matches: {
      GROUP_STAGE_ROUND_1: {
        name: "Group Stage Round 1",
        matches: {
          MATCH_1: {
            teams: ["TEAM_1", "TEAM_2"],
          },
          MATCH_2: {
            teams: ["TEAM_3", "TEAM_4"],
          },
          MATCH_3: {
            teams: ["TEAM_5", "TEAM_6"],
          },
          MATCH_4: {
            teams: ["TEAM_7", "TEAM_8"],
          },
        },
      },
      GROUP_STAGE_ROUND_2: {
        name: "Group Stage Round 2",
        matches: {
          MATCH_5: {
            teams: ["TEAM_1", "TEAM_3"],
          },
          MATCH_6: {
            teams: ["TEAM_2", "TEAM_4"],
          },
          MATCH_7: {
            teams: ["TEAM_5", "TEAM_7"],
          },
          MATCH_8: {
            teams: ["TEAM_6", "TEAM_8"],
          },
        },
      },
      SEMI_FINALS: {
        name: "Semi Finals",
        matches: {
          MATCH_9: {
            groups: ["GROUP_1", "GROUP_2"],
          },
          MATCH_10: {
            groups: ["GROUP_1", "GROUP_2"],
          },
        },
      },
      THIRD_PLACE_MATCH: {
        name: "Third Place Match",
        matches: {
          MATCH_11: {
            groups: ["GROUP_1", "GROUP_2"],
          },
        },
      },
      FINAL: {
        name: "Final",
        matches: {
          MATCH_12: {
            groups: ["GROUP_1", "GROUP_2"],
          },
        },
      },
    },
    time_slots: {
      GROUP_STAGE_ROUND_1: {
        SLOT_1: {
          start: "2021-01-01 14:00",
          end: "2021-01-01 14:10",
        },
        SLOT_2: {
          start: "2021-01-01 14:00",
          end: "2021-01-01 14:10",
        },
        SLOT_3: {
          start: "2021-01-01 14:15",
          end: "2021-01-01 14:25",
        },
        SLOT_4: {
          start: "2021-01-01 14:15",
          end: "2021-01-01 14:25",
        },
      },
      GROUP_STAGE_ROUND_2: {
        SLOT_5: {
          start: "2021-01-01 14:30",
          end: "2021-01-01 14:40",
        },
        SLOT_6: {
          start: "2021-01-01 14:30",
          end: "2021-01-01 14:40",
        },
        SLOT_7: {
          start: "2021-01-01 14:50",
          end: "2021-01-01 15:00",
        },
        SLOT_8: {
          start: "2021-01-01 14:50",
          end: "2021-01-01 15:00",
        },
      },
      SEMI_FINALS: {
        SLOT_9: {
          start: "2021-01-01 15:05",
          end: "2021-01-01 15:15",
        },
        SLOT_10: {
          start: "2021-01-01 15:05",
          end: "2021-01-01 15:15",
        },
      },
      THIRD_PLACE_MATCH: {
        SLOT_11: {
          start: "2021-01-01 15:20",
          end: "2021-01-01 15:30",
        },
      },
      FINAL: {
        SLOT_12: {
          start: "2021-01-01 15:20",
          end: "2021-01-01 15:30",
        },
      },
    },
    predefined_matches: ["MATCH_1:SLOT_1", "MATCH_5:SLOT_2"],
  },

  SPORT_2: {
    name: "Sport 2",
    teams: {
      TEAM_1: {
        name: "Team 1",
        players: ["PLAYER_8", "PLAYER_9"],
      },
      TEAM_2: {
        name: "Team 2",
        players: ["PLAYER_10", "PLAYER_11"],
      },
      TEAM_3: {
        name: "Team 3",
        players: ["PLAYER_12", "PLAYER_13"],
      },
    },
    groups: {
      GROUP_1: {
        name: "Group 1",
        teams: ["TEAM_1", "TEAM_2", "TEAM_3"],
      },
    },
    matches: {
      GROUP_STAGE_ROUND_1: {
        name: "Group Stage Round 1",
        matches: {
          MATCH_1: {
            teams: ["TEAM_1", "TEAM_2"],
          },
          MATCH_2: {
            teams: ["TEAM_2", "TEAM_3"],
          },
          MATCH_3: {
            teams: ["TEAM_3", "TEAM_1"],
          },
        },
      },
      FINAL: {
        name: "Final",
        matches: {
          MATCH_4: {
            groups: ["GROUP_1"],
          },
        },
      },
    },
    time_slots: {
      GROUP_STAGE_ROUND_1: {
        SLOT_1: {
          start: "2021-01-01 14:00",
          end: "2021-01-01 14:10",
        },
        SLOT_2: {
          start: "2021-01-01 14:12",
          end: "2021-01-01 14:22",
        },
        SLOT_3: {
          start: "2021-01-01 14:24",
          end: "2021-01-01 14:34",
        },
      },
      FINAL: {
        SLOT_4: {
          start: "2021-01-01 14:36",
          end: "2021-01-01 14:46",
        },
      },
    },
    predefined_matches: [],
  },
};
