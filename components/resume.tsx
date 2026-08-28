"use client"

import { Separator } from "./ui/separator"
import Link from "next/link"
import { useState } from "react"
import { useSimulationStore } from "@/lib/store"
import { Team, Player, CampaignMatch, PlayoffResult, MatchCandidate } from "@/lib/types/team"
import { setReactDebugChannelForHtmlRequest } from "next/dist/server/dev/debug-channel"

type Props = {
    teams: Team[]
    scoreBoard: CampaignMatch[]
    playoffResult: PlayoffResult | null
    dreamTeam: (Player | null)[]
    maps: string[]
}

function biasedRandomInt(max: number) {
    if (max <= 0) return 0

    const a = Math.floor(Math.random() * (max + 1))
    const b = Math.floor(Math.random() * (max + 1))

    return Math.max(a, b)
}

export default function Resume({
    teams,
    scoreBoard,
    playoffResult,
    dreamTeam,
    maps
}: Props) {

    const setResultsGenerated = useSimulationStore(state => state.setResultsGenerated)

    const starPlayer = dreamTeam[0]

    const champion = playoffResult?.champion ?? false

    const quarterFinal = playoffResult?.quarterFinal ?? null
    const semiFinal = playoffResult?.semiFinal ?? null
    const final = playoffResult?.final ?? null

    /* ============================================================
       VITÓRIAS / DERROTAS (nível de série, não de mapa)
    ============================================================ */

    const swissWins = scoreBoard.filter(match => match.won).length
    const swissLosses = scoreBoard.filter(match => !match.won).length

    let wins = swissWins
    let losses = swissLosses

    if (quarterFinal) {
        quarterFinal.won ? wins++ : losses++
    }

    if (semiFinal) {
        semiFinal.won ? wins++ : losses++
    }

    if (final) {
        champion ? wins++ : losses++
    }

    /* ============================================================
       MVPS (aleatórios, com preferência ao Star Player)
    ============================================================ */

    const [teamMvps] = useState(() => biasedRandomInt(Math.min(6, wins)))
    const [starPlayerMvps] = useState(() => biasedRandomInt(teamMvps))

    /* ============================================================
       MELHOR PARTIDA (sorteada entre todas que aconteceram)
    ============================================================ */

    const quarterFinalIndex = scoreBoard.length
    const semiFinalIndex = scoreBoard.length + 1
    const finalIndex = scoreBoard.length + 2

    const candidates: MatchCandidate[] = []

    scoreBoard.forEach((match, index) => {
        candidates.push({
            map: maps[index],
            opponent: teams[index],
            scoreA: match.scoreA,
            scoreB: match.scoreB,
        })
    })

    if (quarterFinal) {
        candidates.push({
            map: maps[quarterFinalIndex],
            opponent: teams[5],
            scoreA: quarterFinal.scoreA,
            scoreB: quarterFinal.scoreB,
        })
    }

    if (semiFinal) {
        candidates.push({
            map: maps[semiFinalIndex],
            opponent: teams[6],
            scoreA: semiFinal.scoreA,
            scoreB: semiFinal.scoreB,
        })
    }

    if (final) {
        final.forEach((map, index) => {
            candidates.push({
                map: maps[finalIndex + index],
                opponent: teams[7],
                scoreA: map.scoreA,
                scoreB: map.scoreB,
            })
        })
    }

    const [bestMatch] = useState<MatchCandidate | undefined>(
        () => candidates[Math.floor(Math.random() * candidates.length)]
    )

    /* ============================================================
       RENDER
    ============================================================ */

    if (!champion) {
        return (
            <>
                <div className="bg-[#1c1c22] flex flex-col justify-center w-[910px] h-[500px] p-6 border border-[#0b0b0f]">

                    <div className="flex justify-center">
                        <p className="text-[122px] text-[#c8a24a] font-bold font-bebas">Campanha encerrada</p>
                    </div>
                    <Separator orientation="horizontal" className="bg-[#0b0b0f] w-full" />
                    <div className="flex flex-col p-6 gap-12">

                        <div className="flex flex-col">
                            <p className="text-[#ededed] font-bold">Resumo da Campanha:</p>
                            <div className="flex gap-10">
                                <div className="flex flex-col">
                                    <p className="text-[#ededed] font-semibold text-2xl">{wins}</p>
                                    <p className="text-[#c8a24a]">vitorias</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#ededed] font-semibold text-2xl">{losses}</p>
                                    <p className="text-[#c8a24a]">derrotas</p>
                                </div>
                                <div>
                                    <p className="text-[#ededed] font-semibold text-2xl">{teamMvps}</p>
                                    <p className="text-[#c8a24a]">MVPs</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-fit">
                            <div className="flex flex-col">
                                <div>
                                    <p className="text-[#c8a24a] font-bold text-3xl">Star Player</p>
                                </div>
                                <div className="flex gap-8 px-2 py-1">
                                    <div className="flex flex-col">
                                        <div className="flex gap-2">
                                            <p className="text-[#ededed] font-bold text-xl">{starPlayer?.name ?? "—"}</p>
                                            {starPlayer?.description && (
                                                <p className="text-[#ededed] text-xl">{starPlayer.description}</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[#ededed] text-sm font-extralight">{starPlayer?.teamYear}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div>
                                            <p className="text-[#ededed] font-semibold text-2xl">{starPlayerMvps}</p>
                                            <p className="text-[#c8a24a]">MVPs</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-1">
                                                <p className="text-[#ededed] text-xs font-light">vs</p>
                                                <p className="text-[#ededed] text-2xl font-bold">
                                                    {bestMatch?.opponent?.team} {bestMatch?.opponent?.year}
                                                </p>
                                            </div>
                                            <div className="flex justify-end ml-15">
                                                <p className="text-[#c8a24a]">
                                                    Melhor Partida{bestMatch?.map ? ` · ${bestMatch.map}` : ""}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="w-full flex justify-center">
                    <Link href="/PreGame" onClick={() => setResultsGenerated(false)}>
                        <button className="border-[#c8a24a] border p-2 hover:bg-[#c8a24a] transition-all duration-200"><p className="text-[#ededed] text-2xl font-bold">Começar nova campanha</p></button>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="bg-[#1c1c22] flex flex-col justify-center w-[910px] h-[500px] p-6 border border-[#0b0b0f]">

                <div className="flex justify-center">
                    <p className="text-[143px] text-[#c8a24a] font-bold font-bebas">Campeão do Major</p>
                </div>
                <Separator orientation="horizontal" className="bg-[#0b0b0f] w-full" />
                <div className="flex flex-col p-6 gap-12">

                    <div className="flex flex-col">
                        <p className="text-[#ededed] font-bold">Resumo da Campanha:</p>
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-semibold text-2xl">{wins}</p>
                                <p className="text-[#c8a24a]">vitorias</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-semibold text-2xl">{losses}</p>
                                <p className="text-[#c8a24a]">derrotas</p>
                            </div>
                            <div>
                                <p className="text-[#ededed] font-semibold text-2xl">{teamMvps}</p>
                                <p className="text-[#c8a24a]">MVPs</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-fit">
                        <div className="flex flex-col">
                            <div>
                                <p className="text-[#c8a24a] font-bold text-3xl">Star Player</p>
                            </div>
                            <div className="flex gap-8 px-2 py-1">
                                <div className="flex flex-col">
                                    <div className="flex gap-2">
                                        <p className="text-[#ededed] font-bold text-xl">{starPlayer?.name ?? "—"}</p>
                                        {starPlayer?.description && (
                                            <p className="text-[#ededed] text-xl">{starPlayer.description}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[#ededed] text-sm font-extralight">{starPlayer?.teamYear}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-[#ededed] font-semibold text-2xl">{starPlayerMvps}</p>
                                        <p className="text-[#c8a24a]">MVPs</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex gap-1">
                                            <p className="text-[#ededed] text-xs font-light">vs</p>
                                            <p className="text-[#ededed] text-2xl font-bold">
                                                {bestMatch?.opponent?.team} {bestMatch?.opponent?.year}
                                            </p>
                                        </div>
                                        <div className="flex justify-end ml-15">
                                            <p className="text-[#c8a24a]">
                                                Melhor Partida{bestMatch?.map ? ` · ${bestMatch.map}` : ""}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="w-full flex justify-center">
                <Link href="/PreGame" onClick={() => setResultsGenerated(false)}>
                    <button className="border-[#c8a24a] border p-2 hover:bg-[#c8a24a] transition-all duration-200"><p className="text-[#ededed] text-2xl font-bold">Começar nova campanha</p></button>
                </Link>
            </div>
        </>
    )
}