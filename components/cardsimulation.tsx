"use client"

import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Team, CampaignMatch, PlayoffResult } from "@/lib/types/team"
import { drawMaps } from "@/lib/configs"
import { useState } from "react"

type Props = {
    teams: Team[]
    scoreBoard: CampaignMatch[]
    playoffResult: PlayoffResult | null
}

export default function CardSimulation({
    teams,
    scoreBoard,
    playoffResult
}: Props) {

    const [maps] = useState<string[]>(() => drawMaps())
    const [activeCard, setActiveCard] = useState(0)

    const quarterFinalIndex = scoreBoard.length
    const semiFinalIndex = scoreBoard.length + 1
    const finalIndex = scoreBoard.length + 2

    return (
        <>
            {/* =========================
                STAGE 3
            ========================== */}

            {scoreBoard.map((match, index) => (
                index <= activeCard && (
                    <motion.div
                        key={`stage-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[910px] h-[300px] bg-[#0b0b0f]"
                    >
                        <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-bold text-xl">
                                    Stage 3
                                </p>

                                <p className="text-[#ededed] text-xs">
                                    {match.winsBefore} - {match.lossesBefore}
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="bg-[#0b0b0f]"
                            />

                            <div className="flex min-w-3xl justify-between">
                                <div className="flex gap-2">
                                    <p className="text-xs text-[#ededed] font-light">
                                        vs
                                    </p>

                                    <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold">
                                        {teams[index]?.team}

                                        <span className="text-xl font-normal">
                                            {teams[index]?.year}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-[#ededed] font-light">
                                        bo1
                                    </p>

                                    <p className="text-[#5CB85C] font-bold text-3xl">
                                        <CountUp
                                            key={`scoreA-${index}-${match.scoreA}-${match.scoreB}`}
                                            end={match.scoreA ?? 0}
                                            start={0}
                                            duration={3}
                                        />

                                        {" - "}

                                        <CountUp
                                            key={`scoreB-${index}-${match.scoreA}-${match.scoreB}`}
                                            end={match.scoreB ?? 0}
                                            start={0}
                                            duration={3}
                                            onEnd={() => {
                                                if (index === activeCard) {
                                                    setActiveCard(prev => prev + 1)
                                                }
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                                <p className="text-[#ededed] font-bold">
                                    {maps[index]}
                                </p>

                                <p className="text-[#5cb85c] font-bold">
                                    {match.scoreA} - {match.scoreB}
                                </p>

                                <Separator
                                    orientation="vertical"
                                    className="bg-[#0b0b0f] h-6"
                                />

                                <p className="text-[#ededed]">
                                    4-8
                                </p>

                                <p className="text-[#ededed]">
                                    9-3
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )
            ))}

            {/* =========================
                QUARTER FINAL
            ========================== */}

            {activeCard >= quarterFinalIndex &&
                playoffResult?.quarterFinal && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[910px] h-[300px] bg-[#0b0b0f]"
                    >
                        <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-bold text-xl">
                                    Quarter Final
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="bg-[#0b0b0f]"
                            />

                            <div className="flex min-w-3xl justify-between">
                                <div className="flex gap-2">
                                    <p className="text-xs text-[#ededed] font-light">
                                        vs
                                    </p>

                                    <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold">
                                        {teams[5]?.team}

                                        <span className="text-xl font-normal">
                                            {teams[5]?.year}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-[#ededed] font-light">
                                        bo1
                                    </p>

                                    <p className="text-[#5CB85C] font-bold text-3xl">
                                        <CountUp
                                            key={`quarter-scoreA-${playoffResult.quarterFinal.scoreA}-${playoffResult.quarterFinal.scoreB}`}
                                            end={playoffResult.quarterFinal.scoreA ?? 0}
                                            start={0}
                                            duration={3}
                                        />

                                        {" - "}

                                        <CountUp
                                            key={`quarter-scoreB-${playoffResult.quarterFinal.scoreA}-${playoffResult.quarterFinal.scoreB}`}
                                            end={playoffResult.quarterFinal.scoreB ?? 0}
                                            start={0}
                                            duration={3}
                                            onEnd={() => {
                                                if (activeCard === quarterFinalIndex) {
                                                    setActiveCard(prev => prev + 1)
                                                }
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                                <p className="text-[#ededed] font-bold">
                                    {maps[quarterFinalIndex]}
                                </p>

                                <p className="text-[#5cb85c] font-bold">
                                    {playoffResult.quarterFinal.scoreA} -{" "}
                                    {playoffResult.quarterFinal.scoreB}
                                </p>

                                <Separator
                                    orientation="vertical"
                                    className="bg-[#0b0b0f] h-6"
                                />

                                <p className="text-[#ededed]">
                                    4-8
                                </p>

                                <p className="text-[#ededed]">
                                    9-3
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

            {/* =========================
                SEMI FINAL
            ========================== */}

            {activeCard >= semiFinalIndex &&
                playoffResult?.semiFinal && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[910px] h-[300px] bg-[#0b0b0f]"
                    >
                        <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-bold text-xl">
                                    Semi Final
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="bg-[#0b0b0f]"
                            />

                            <div className="flex min-w-3xl justify-between">
                                <div className="flex gap-2">
                                    <p className="text-xs text-[#ededed] font-light">
                                        vs
                                    </p>

                                    <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold">
                                        {teams[6]?.team}

                                        <span className="text-xl font-normal">
                                            {teams[6]?.year}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-[#ededed] font-light">
                                        bo1
                                    </p>

                                    <p className="text-[#5CB85C] font-bold text-3xl">
                                        <CountUp
                                            key={`semi-scoreA-${playoffResult.semiFinal.scoreA}-${playoffResult.semiFinal.scoreB}`}
                                            end={playoffResult.semiFinal.scoreA ?? 0}
                                            start={0}
                                            duration={3}
                                        />

                                        {" - "}

                                        <CountUp
                                            key={`semi-scoreB-${playoffResult.semiFinal.scoreA}-${playoffResult.semiFinal.scoreB}`}
                                            end={playoffResult.semiFinal.scoreB ?? 0}
                                            start={0}
                                            duration={3}
                                            onEnd={() => {
                                                if (activeCard === semiFinalIndex) {
                                                    setActiveCard(prev => prev + 1)
                                                }
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                                <p className="text-[#ededed] font-bold">
                                    {maps[semiFinalIndex]}
                                </p>

                                <p className="text-[#5cb85c] font-bold">
                                    {playoffResult.semiFinal.scoreA} -{" "}
                                    {playoffResult.semiFinal.scoreB}
                                </p>

                                <Separator
                                    orientation="vertical"
                                    className="bg-[#0b0b0f] h-6"
                                />

                                <p className="text-[#ededed]">
                                    4-8
                                </p>

                                <p className="text-[#ededed]">
                                    9-3
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

            {/* =========================
                FINAL - MAP A MAP
            ========================== */}

            {playoffResult?.final?.map((match, mapIndex) => {
                const cardIndex = finalIndex + mapIndex

                if (activeCard < cardIndex) {
                    return null
                }

                return (
                    <motion.div
                        key={`final-map-${mapIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[910px] h-[300px] bg-[#0b0b0f]"
                    >
                        <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex flex-col">
                                <p className="text-[#ededed] font-bold text-xl">
                                    Final
                                </p>

                                <p className="text-[#ededed] text-xs">
                                    Map {mapIndex + 1}
                                </p>
                            </div>

                            <Separator
                                orientation="vertical"
                                className="bg-[#0b0b0f]"
                            />

                            <div className="flex min-w-3xl justify-between">
                                <div className="flex gap-2">
                                    <p className="text-xs text-[#ededed] font-light">
                                        vs
                                    </p>

                                    <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold">
                                        {teams[7]?.team}

                                        <span className="text-xl font-normal">
                                            {teams[7]?.year}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-[#ededed] font-light">
                                        bo3
                                    </p>

                                    <p className="text-[#5CB85C] font-bold text-3xl">
                                        <CountUp
                                            key={`final-scoreA-${mapIndex}-${match.scoreA}-${match.scoreB}`}
                                            end={match.scoreA ?? 0}
                                            start={0}
                                            duration={3}
                                        />

                                        {" - "}

                                        <CountUp
                                            key={`final-scoreB-${mapIndex}-${match.scoreA}-${match.scoreB}`}
                                            end={match.scoreB ?? 0}
                                            start={0}
                                            duration={3}
                                            onEnd={() => {
                                                if (cardIndex === activeCard) {
                                                    setActiveCard(prev => prev + 1)
                                                }
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                            <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                                <p className="text-[#ededed] font-bold">
                                    {maps[finalIndex + mapIndex]}
                                </p>

                                <p className="text-[#5cb85c] font-bold">
                                    {match.scoreA} - {match.scoreB}
                                </p>

                                <Separator
                                    orientation="vertical"
                                    className="bg-[#0b0b0f] h-6"
                                />

                                <p className="text-[#ededed]">
                                    4-8
                                </p>

                                <p className="text-[#ededed]">
                                    9-3
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </>
    )
}
