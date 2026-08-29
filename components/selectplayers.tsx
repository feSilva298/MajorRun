import { Player, Team } from "@/lib/types/team"

type Props = {
    selectedTeams: Team[];
    onSelectPlayer: (player: Player) => void
}

export default function SelectPlayers({selectedTeams, onSelectPlayer}: Props){

    const [teams1, teams2] = selectedTeams

    return(
        <>
        <div className="flex flex-col w-full gap-8">
            <div className="w-full flex flex-col bg-[#0b0b0f] h-fit">
            <div className="flex flex-col bg-[#1c1c22] border-[#0b0b0f] border w-full h-fit px-2 py-0.5 ">
                <p className="text-[#EDEDED] font-bold text-2xl">{teams1.team}</p>
                <p className="text-[#EDEDED] ">{teams1.year}</p>
            </div>
            
            <button onClick={() => onSelectPlayer(teams1.players[0])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams1.players[0].name}</p>
                    <p className="text-[#EDEDED] text-sm"><span>{teams1.players[0].rolesAllowed.join(" / ")}</span></p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams1.players[0].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams1.players[1])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams1.players[1].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams1.players[1].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams1.players[1].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams1.players[2])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams1.players[2].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams1.players[2].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams1.players[2].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams1.players[3])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams1.players[3].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams1.players[3].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams1.players[3].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams1.players[4])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams1.players[4].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams1.players[4].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams1.players[4].overall}</p>
                </div>
            </button>
            </div>

            <div className="w-full flex flex-col bg-[#0b0b0f] h-fit">
             <div className="flex flex-col bg-[#1c1c22] border-[#0b0b0f] border w-full h-fit px-2 py-0.5 ">
                <p className="text-[#EDEDED] font-bold text-2xl">{teams2.team}</p>
                <p className="text-[#EDEDED]">{teams2.year}</p>
            </div>
            
            <button onClick={() => onSelectPlayer(teams2.players[0])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams2.players[0].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams2.players[0].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams2.players[0].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams2.players[1])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams2.players[1].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams2.players[1].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams2.players[1].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams2.players[2])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams2.players[2].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams2.players[2].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams2.players[2].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams2.players[3])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams2.players[3].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams2.players[3].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams2.players[3].overall}</p>
                </div>
            </button>

            <button onClick={() => onSelectPlayer(teams2.players[4])}>
                <div className="flex bg-[#1c1c22] border-[#0b0b0f] hover:bg-[#0b0b0f] transition-all duration-100 border w-full py-0.5 px-3 justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="text-[#EDEDED] font-bold">{teams2.players[4].name}</p>
                    <p className="text-[#EDEDED] text-sm">{teams2.players[4].rolesAllowed.join(" / ")}</p>
                </div>
                    <p className="font-bold text-xl text-[#EDEDED]">{teams2.players[4].overall}</p>
                </div>
            </button>
            </div>
        </div>
        </>
    )}  