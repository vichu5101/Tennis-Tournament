// Interface for Tournament Name list
interface Tournament{
    PlayerID:string,
    Player:string,
    Rank:number
}
// Interface for MatchOrder
interface MatchOrder{
    Round:string|number,
    Player1:string,
    Player2:string,
    MatchID:string,
    Winner:string
}
// Interface for Scheduled Matches
interface ScheduleMatch{
    Player:string
    Opponent:string
}
// Player list and Details
const tennisTournamentPlayerList :Tournament[]= [{ PlayerID: "RF1", Player: "Roger Federer", Rank: 1 },
{ PlayerID: "RN2", Player: "Rafael Nadal", Rank: 2 },
{ PlayerID: "SW3", Player: "Serena Williams", Rank: 3 },
{ PlayerID: "VW4", Player: "Venus Williams", Rank: 4 },
{ PlayerID: "ND5", Player: "Novak Djokovic", Rank: 5 },
{ PlayerID: "FS6", Player: "Frank Sedgman", Rank: 6 },
{ PlayerID: "SS7", Player: "Stan Smith", Rank: 7 },
{ PlayerID: "SK8", Player: "Svetlana Kuznetsova", Rank: 8 }]
//----------------------------------------------------------------------------------------------------------
// Initial Match Schedule
let match = []
for (let i = 0; i < tennisTournamentPlayerList.length / 2; i++) {
    let playerObject:any = {}
    playerObject["Player"] = tennisTournamentPlayerList[i].Player
    playerObject["Opponent"] = tennisTournamentPlayerList[tennisTournamentPlayerList.length - 1 - i].Player
    match.push(playerObject)

}
//----------------------------------------------------------------------------------------------------------
// Scheduled Matches
let scheduledMatches:ScheduleMatch[] = []
let poolList = []
for (let i=0;i<match.length;i++) {
    if (i % 2 == 0) {
        scheduledMatches.push(match[i])
    }

    else {
        poolList.push(match[i])
    }
}
for (let i of poolList.reverse()) {
    scheduledMatches.push(i)
}
//----------------------------------------------------------------------------------------------------------
// Finding Rank By Using Player Name
function findingRankByUsingName(teamName:string) {
    let rank = 0;
    tennisTournamentPlayerList.forEach(element => {
        if (element.Player == teamName) {
            rank = element.Rank
        }
    });
    return rank
}
//----------------------------------------------------------------------------------------------------------
// Finding Probability By using Player Rank
function probability(Player1:string, Player2:string) {
    let a:any = findingRankByUsingName(Player1)
    let b = findingRankByUsingName(Player2)
    let c = Math.round(100 / (Math.abs(a - b) + 1))
    b = c
    a = 100 - b
    let probList:string[] = []
    for (let d = 1; d <= 100; d++) {
        if (d <= a) {
            probList.push(Player1)
        }
        else {
            probList.push(Player2)
        }
    }
    let ran = Math.floor(Math.random() * 100)
    a = probList[ran]
    return a
}
//----------------------------------------------------------------------------------------------------------
let round = 1 // Calculating Round
let matchOrder:MatchOrder[] = [] // Match List and winner too
// Function for Scheduling the Match Winner and Match Orders
function winner() {
    let winners = []
    let winnerList = []
    for (let i of scheduledMatches) {
        winners.push(probability(i.Player, i.Opponent))
    }
    for (let i = 0; i < scheduledMatches.length; i++) {
        let playerObject:any = {}
        playerObject["Round"] = round
        playerObject["Player1"] = scheduledMatches[i].Player
        playerObject["Player2"] = scheduledMatches[i].Opponent
        playerObject["MatchID"] = matchIdGenerator(scheduledMatches[i].Player, scheduledMatches[i].Opponent)
        playerObject["Winner"] = winners[i]
        matchOrder.push(playerObject)
    }
    for (let i = 0; i < winners.length; i = i + 2) {
        let playerObject:any = {}
        playerObject["Player"] = winners[i]
        playerObject["Opponent"] = winners[i + 1]
        winnerList.push(playerObject)
    }
    scheduledMatches = winnerList
    if (scheduledMatches.length != 1) {
        round++
        winner()
    }
    else {
        for (let i of scheduledMatches) {
            let playerObject:any = {}
            playerObject["Round"] = "Final"
            playerObject["Player1"] = i.Player
            playerObject["Player2"] = i.Opponent
            playerObject["MatchID"] = matchIdGenerator(i.Player, i.Opponent)
            playerObject["Winner"] = probability(i.Player, i.Opponent)
            matchOrder.push(playerObject)
        }
    }
}
winner()
//----------------------------------------------------------------------------------------------------------
// Generating the Match Id 
function matchIdGenerator(str1:string, str2:string) {
    let rankOfStr1 = findingRankByUsingName(str1)
    let rankOfStr2 = findingRankByUsingName(str2)
    let idForStr1 = str1.toUpperCase().slice(0, 2)
    let idForStr2 = str2.toUpperCase().slice(0, 2)
    let id = idForStr1 + idForStr2 + rankOfStr1.toString() + rankOfStr2
    return id
}
//----------------------------------------------------------------------------------------------------------
// Consoling the Match Schedule
let list:any = []
matchOrder.forEach(element =>{
    list.push(element.Round)
});
list = [...new Set(list)]
function findMatchesByRounds(n:number) {
    list = []
    matchOrder.forEach(element => {
        if (element.Round == n) {
            list.push(element)
        }
    });
    console.log(list)
}
for (let i of list) {
    console.log("---------------------------------------------------------------------------------------")
    console.log("Round :", i)
    findMatchesByRounds(i)
    console.log("---------------------------------------------------------------------------------------")
}
//----------------------------------------------------------------------------------------------------------
// Finding Match Detials by Using Match ID
function findMatchDetailsByMatchId(str:string) {
    matchOrder.forEach(element => {
        if (element.MatchID == str.toUpperCase()) {
            console.log("---------------------------------------------------------------------------------------")
            console.log(`Match Details of "${str} Match ID"`)
            console.log([element])
            console.log("---------------------------------------------------------------------------------------")
        }
    });
}
findMatchDetailsByMatchId("ROSV18")
//----------------------------------------------------------------------------------------------------------
// Finding Match Details By Round
function findMatchDetailsByRound(num:number) {
    list = []
    matchOrder.forEach(element => {
        if (element.Round == num) {
            list.push(element)
        }
    });
    console.log("---------------------------------------------------------------------------------------")
    console.log(`Match List for Round "${num}"`)
    console.log(list)
    console.log("---------------------------------------------------------------------------------------")
}
findMatchDetailsByRound(2)
//----------------------------------------------------------------------------------------------------------
// Finding Player Details by using player ID
function findPlayerByUsingPlayerId(id:string) {
    tennisTournamentPlayerList.forEach(element => {
        if (element.PlayerID == id) {
            console.log("---------------------------------------------------------------------------------------")
            console.log(`Player Details of "${id} ID"`)
            console.log([element])
            console.log("---------------------------------------------------------------------------------------")
        }
    });
}
findPlayerByUsingPlayerId("VW4")
//----------------------------------------------------------------------------------------------------------