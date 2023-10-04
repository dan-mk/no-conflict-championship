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

  for (const sportId in sports) {
    const sport = sports[sportId];

    for (const stageName in sport.matches) {
      const stage = sport.matches[stageName];

      for (const matchId in stage.matches) {
        const match = stage.matches[matchId];

        const allPlayers = new Set();

        if (stageName.startsWith("GROUP_STAGE")) {
          getPlayersFromTeams(sport, match.teams).forEach((playerId) =>
            allPlayers.add(playerId)
          );
        } else {
          getPlayersFromGroups(sport, match.groups).forEach((playerId) =>
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

    playersSchedule[playerId].matches.sort((a, b) => {
      const dateA = new Date(a.date.start);
      const dateB = new Date(b.date.start);

      return dateA - dateB;
    });
  }

  return playersSchedule;
}

function getPlayerConflicts(playerSchedule) {
  const playerMatches = playerSchedule.matches;

  const allMatchPairs = [];
  for (let i = 0; i < playerMatches.length; i++) {
    for (let j = i + 1; j < playerMatches.length; j++) {
      const match = playerMatches[i];
      const otherMatch = playerMatches[j];
      allMatchPairs.push([match, otherMatch]);
    }
  }

  let conflicts = [];

  for (const matchPair of allMatchPairs) {
    const [match1, match2] = matchPair;

    if (match1.sportId === match2.sportId) {
      continue;
    }

    const match1StartDate = new Date(match1.date.start);
    const match1EndDate = new Date(match1.date.end);

    const match2StartDate = new Date(match2.date.start);
    const match2EndDate = new Date(match2.date.end);

    if (match1StartDate > match2EndDate || match1EndDate < match2StartDate) {
      continue;
    }

    conflicts.push([...matchPair, playerSchedule.name]);
  }

  return conflicts;
}

function getAllConflicts(playersSchedule) {
  let conflicts = [];

  for (const playerId in playersSchedule) {
    const playerSchedule = playersSchedule[playerId];
    conflicts.push(...getPlayerConflicts(playerSchedule));
  }

  conflicts = conflicts.filter((conflict) => {
    const [match1, match2] = conflict;
    return (
      match1.stageName.startsWith("GROUP_STAGE") &&
      match2.stageName.startsWith("GROUP_STAGE")
    );
  });

  return conflicts;
}

function getConflictsPenalty(conflicts) {
  // both group stage: 1 million points
  // one group stage: 1000 points
  // quarter finals: 1000 points
  // semi finals: 10 points
  // third place match: 1 point
  // final: 1 points

  let penalty = 0;

  for (const conflict of conflicts) {
    const [match1, match2] = conflict;

    if (
      match1.stageName.startsWith("GROUP_STAGE") &&
      match2.stageName.startsWith("GROUP_STAGE")
    ) {
      penalty += 1000000;
    }

    if (
      match1.stageName.startsWith("GROUP_STAGE") ||
      match2.stageName.startsWith("GROUP_STAGE")
    ) {
      penalty += 1000;
    }

    if (
      match1.stageName === "QUARTER_FINALS" ||
      match2.stageName === "QUARTER_FINALS"
    ) {
      penalty += 1000;
    }

    if (
      match1.stageName === "SEMI_FINALS" ||
      match2.stageName === "SEMI_FINALS"
    ) {
      penalty += 10;
    }

    if (
      match1.stageName === "THIRD_PLACE_MATCH" ||
      match2.stageName === "THIRD_PLACE_MATCH"
    ) {
      penalty += 1;
    }

    if (match1.stageName === "FINAL" || match2.stageName === "FINAL") {
      penalty += 1;
    }
  }

  return penalty;
}

function irandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
  const allMatches = getAllMatchesWithAllPlayers(sports);

  let minConflictsPenalty = Infinity;
  let bestConflicts;
  let bestPlayersSchedule;
  let numberOfIterations = 0;

  do {
    const matchesWithDates = randomlyAssignDatesToMatches(allMatches, sports);
    const playersSchedule = getPlayersSchedule(players, matchesWithDates);
    const conflicts = getAllConflicts(playersSchedule);
    const conflictsPenalty = getConflictsPenalty(conflicts);

    if (conflictsPenalty < minConflictsPenalty) {
      minConflictsPenalty = conflictsPenalty;
      bestConflicts = conflicts;
      bestPlayersSchedule = playersSchedule;
    }
  } while (minConflictsPenalty > 0 && numberOfIterations++ < 10);

  console.log(JSON.stringify(bestPlayersSchedule, null, 2));
  console.log(JSON.stringify(bestConflicts, null, 2));
  console.log(minConflictsPenalty);
}

main();
