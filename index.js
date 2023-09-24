import { players } from "./data/players.js";
import { sports } from "./data/sports.js";

function getAllMatchesWithAllPlayers(sports) {
  const allMatches = [];

  function getPlayersFromTeams(sport, teams) {
    const players = [];

    for (const teamId of teams) {
      const team = sport.teams[teamId];
      players.push(...team.players);
    }

    return players;
  }

  function getPlayersFromGroups(sport, groups) {
    const players = [];

    for (const groupId of groups) {
      const group = sport.groups[groupId];
      players.push(...getPlayersFromTeams(sport, group.teams));
    }

    return players;
  }

  function getPlayersFromMatches(sport, matches) {
    const players = [];

    for (const matchId of matches) {
      for (const stageName in sport.matches) {
        const stage = sport.matches[stageName];

        if (Object.keys(stage.matches).includes(matchId)) {
          const match = stage.matches[matchId];

          if (stageName === "GROUP_STAGE") {
            players.push(...getPlayersFromTeams(sport, match.teams));
          } else if (stageName === "ELIMINATION_STAGE_1") {
            players.push(...getPlayersFromGroups(sport, match.teams));
          } else {
            players.push(...getPlayersFromMatches(sport, match.teams));
          }
        }
      }
    }

    return players;
  }

  for (const sportId in sports) {
    const sport = sports[sportId];

    for (const stageName in sport.matches) {
      const stage = sport.matches[stageName];

      for (const matchId in stage.matches) {
        const match = stage.matches[matchId];

        const allPlayers = new Set();

        if (stageName === "GROUP_STAGE") {
          getPlayersFromTeams(sport, match.teams).forEach((playerId) =>
            allPlayers.add(playerId)
          );
        } else if (stageName === "ELIMINATION_STAGE_1") {
          getPlayersFromGroups(sport, match.teams).forEach((playerId) =>
            allPlayers.add(playerId)
          );
        } else {
          getPlayersFromMatches(sport, match.teams).forEach((playerId) =>
            allPlayers.add(playerId)
          );
        }

        allMatches.push({
          sportId,
          stageName,
          matchId,
          players: [...allPlayers],
        });
      }
    }
  }

  return allMatches;
}

function randomlyAssignDatesToMatches(matches, sports) {
  const matchesWithDates = [];

  const matchesCopy = JSON.parse(JSON.stringify(matches));
  const sportsCopy = JSON.parse(JSON.stringify(sports));

  for (const sportId in sportsCopy) {
    const sport = sportsCopy[sportId];

    for (const predefinedMatch of sport.predefined_matches) {
      const [matchId, slotId] = predefinedMatch.split(":");

      let date;
      for (const stageName in sport.time_slots) {
        const timeSlots = sport.time_slots[stageName];

        if (Object.keys(timeSlots).includes(slotId)) {
          date = timeSlots[slotId];
          break;
        }
      }

      const match = matchesCopy.find(
        (match) => match.sportId === sportId && match.matchId === matchId
      );

      match.date = date;
    }
  }

  for (const match of matchesCopy) {
    if (match.date !== undefined) {
      matchesWithDates.push(match);
      continue;
    }

    const sport = sportsCopy[match.sportId];
    const timeSlots = sport.time_slots[match.stageName];
    const timeSlotIds = Object.keys(timeSlots);

    const randomTimeSlotId = timeSlotIds[irandom(0, timeSlotIds.length - 1)];

    matchesWithDates.push({
      ...match,
      date: timeSlots[randomTimeSlotId],
    });

    delete timeSlots[randomTimeSlotId];
  }

  return matchesWithDates;
}

function getPlayersSchedule(players, matches) {
  const playersSchedule = {};

  for (const playerId in players) {
    const playerName = players[playerId];

    playersSchedule[playerId] = {
      name: playerName,
      matches: [],
    };

    for (const match of matches) {
      if (match.players.includes(playerId)) {
        playersSchedule[playerId].matches.push({
          sportId: match.sportId,
          stageName: match.stageName,
          matchId: match.matchId,
          date: match.date,
        });
      }
    }
  }

  return playersSchedule;
}

function doesPlayerHaveConflicts(playerSchedule) {
  const playerMatches = playerSchedule.matches;

  const allMatchPairs = [];
  for (const match of playerMatches) {
    for (const otherMatch of playerMatches) {
      if (
        match.sportId !== otherMatch.sportId ||
        match.matchId !== otherMatch.matchId
      ) {
        allMatchPairs.push([match, otherMatch]);
      }
    }
  }

  for (const matchPair of allMatchPairs) {
    const [match1, match2] = matchPair;

    const match1StartDate = new Date(match1.date.start);
    const match1EndDate = new Date(match1.date.end);

    const match2StartDate = new Date(match2.date.start);
    const match2EndDate = new Date(match2.date.end);

    if (match1StartDate > match2EndDate || match1EndDate < match2StartDate) {
      continue;
    }

    return true;
  }

  return false;
}

function doesAnyPlayerHaveConflicts(playersSchedule) {
  for (const playerId in playersSchedule) {
    const playerSchedule = playersSchedule[playerId];

    if (doesPlayerHaveConflicts(playerSchedule)) {
      return true;
    }
  }

  return false;
}

function irandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
  const allMatches = getAllMatchesWithAllPlayers(sports);

  let playersSchedule;
  do {
    const matchesWithDates = randomlyAssignDatesToMatches(allMatches, sports);
    playersSchedule = getPlayersSchedule(players, matchesWithDates);
  } while (doesAnyPlayerHaveConflicts(playersSchedule));

  console.log(JSON.stringify(playersSchedule, null, 2));
}

main();
