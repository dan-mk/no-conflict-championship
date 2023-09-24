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
    },
    groups: {
      GROUP_1: {
        name: "Group 1",
        teams: ["TEAM_1", "TEAM_2", "TEAM_3"],
      },
      GROUP_2: {
        name: "Group 2",
        teams: ["TEAM_4", "TEAM_5", "TEAM_6"],
      },
    },
    matches: {
      GROUP_STAGE: {
        name: "Group Stage",
        matches: {
          MATCH_1: {
            teams: ["TEAM_1", "TEAM_2"],
          },
          MATCH_2: {
            teams: ["TEAM_1", "TEAM_3"],
          },
          MATCH_3: {
            teams: ["TEAM_2", "TEAM_3"],
          },
          MATCH_4: {
            teams: ["TEAM_4", "TEAM_5"],
          },
          MATCH_5: {
            teams: ["TEAM_4", "TEAM_6"],
          },
          MATCH_6: {
            teams: ["TEAM_5", "TEAM_6"],
          },
        },
      },
      ELIMINATION_STAGE_1: {
        name: "Semi Finals",
        matches: {
          MATCH_7: {
            teams: ["GROUP_1", "GROUP_2"],
          },
          MATCH_8: {
            teams: ["GROUP_1", "GROUP_2"],
          },
        },
      },
      ELIMINATION_STAGE_2: {
        name: "Final",
        matches: {
          MATCH_9: {
            teams: ["MATCH_7", "MATCH_8"],
          },
        },
      },
    },
    time_slots: {
      GROUP_STAGE: {
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
        SLOT_4: {
          start: "2021-01-01 14:36",
          end: "2021-01-01 14:46",
        },
        SLOT_5: {
          start: "2021-01-01 14:48",
          end: "2021-01-01 14:58",
        },
        SLOT_6: {
          start: "2021-01-01 15:00",
          end: "2021-01-01 15:10",
        },
      },
      ELIMINATION_STAGE_1: {
        SLOT_7: {
          start: "2021-01-01 15:12",
          end: "2021-01-01 15:22",
        },
        SLOT_8: {
          start: "2021-01-01 15:24",
          end: "2021-01-01 15:34",
        },
      },
      ELIMINATION_STAGE_2: {
        SLOT_9: {
          start: "2021-01-01 15:36",
          end: "2021-01-01 15:46",
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
        players: ["PLAYER_6", "PLAYER_7"],
      },
      TEAM_2: {
        name: "Team 2",
        players: ["PLAYER_8", "PLAYER_9"],
      },
      TEAM_3: {
        name: "Team 3",
        players: ["PLAYER_10", "PLAYER_11"],
      },
    },
    groups: {
      GROUP_1: {
        name: "Group 1",
        teams: ["TEAM_1", "TEAM_2", "TEAM_3"],
      },
    },
    matches: {
      GROUP_STAGE: {
        name: "Group Stage",
        matches: {
          MATCH_1: {
            teams: ["TEAM_1", "TEAM_2"],
          },
          MATCH_2: {
            teams: ["TEAM_1", "TEAM_3"],
          },
          MATCH_3: {
            teams: ["TEAM_2", "TEAM_3"],
          },
        },
      },
      ELIMINATION_STAGE_1: {
        name: "Final",
        matches: {
          MATCH_4: {
            teams: ["GROUP_1", "GROUP_1"],
          },
        },
      },
    },
    time_slots: {
      GROUP_STAGE: {
        SLOT_1: {
          start: "2021-01-01 14:00",
          end: "2021-01-01 14:10",
        },
        SLOT_2: {
          start: "2021-01-01 14:15",
          end: "2021-01-01 14:25",
        },
        SLOT_3: {
          start: "2021-01-01 14:30",
          end: "2021-01-01 14:40",
        },
      },
      ELIMINATION_STAGE_1: {
        SLOT_4: {
          start: "2021-01-01 14:45",
          end: "2021-01-01 14:55",
        },
      },
    },
    predefined_matches: [],
  },
};
