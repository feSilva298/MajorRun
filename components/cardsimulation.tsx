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

// ============================================================
// CONFIGURAÇÕES DA SIMULAÇÃO
// ============================================================

const COUNT_DURATION = 3

export default function CardSimulation({
    teams,
    scoreBoard,
    playoffResult
}: Props) {

    const [maps] = useState<string[]>(() => drawMaps())

    const [activeCard, setActiveCard] = useState(0)

    // Controla quais partes inferiores dos cards estão abertas
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({
        "stage-0": true,
        quarter: false,
        semi: false,
        final: true,
    })

    // Controla quais placares já terminaram a animação
    const [finishedScores, setFinishedScores] = useState<Record<string, boolean>>({})

    // Controle da Final
    const [finalMapIndex, setFinalMapIndex] = useState(0)
    const [finalMapFinished, setFinalMapFinished] = useState(false)

    const quarterFinalIndex = scoreBoard.length
    const semiFinalIndex = scoreBoard.length + 1
    const finalIndex = scoreBoard.length + 2

    /*
     * ============================================================
     * CONTROLE DOS CARDS
     * ============================================================
     */

    const toggleCard = (card: string) => {
        setOpenCards(prev => ({
            ...prev,
            [card]: !prev[card]
        }))
    }

    const openNextCard = (currentCard: string, nextCard: string) => {
        setOpenCards(prev => ({
            ...prev,
            [currentCard]: false,
            [nextCard]: true,
        }))
    }

    const finishScore = (card: string) => {
        setFinishedScores(prev => ({
            ...prev,
            [card]: true
        }))
    }

    /*
     * ============================================================
     * FINAL
     * ============================================================
     */

    const finalMaps = playoffResult?.final ?? []

    const currentFinalMap = finalMaps[finalMapIndex]

    const finishedFinalMaps = finalMaps.slice(
        0,
        finalMapIndex + (finalMapFinished ? 1 : 0)
    )

    // scoreB = Dream Team
    // scoreA = adversário

    const finalWinsA = finishedFinalMaps.filter(
        map => map.scoreB > map.scoreA
    ).length

    const finalWinsB = finishedFinalMaps.filter(
        map => map.scoreA > map.scoreB
    ).length

    const currentMapWon =
        currentFinalMap
            ? currentFinalMap.scoreB > currentFinalMap.scoreA
            : false

    /*
     * ============================================================
     * CORES
     * ============================================================
     */

    const getResultColor = (
        finished: boolean,
        won: boolean
    ) => {

        if (!finished) {
            return "text-[#8a8a8a]"
        }

        return won
            ? "text-[#5CB85C]"
            : "text-[#D9534F]"
    }

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <>
            {/* =====================================================
                STAGE 3
            ====================================================== */}

            {scoreBoard.map((match, index) => {

                const cardKey = `stage-${index}`
                const scoreFinished = !!finishedScores[cardKey]

                return (
                    index <= activeCard && (
                        <motion.div
                            key={cardKey}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-[910px] bg-[#0b0b0f]"
                        >

                            {/* HEADER */}

                            <div
                                onClick={() => toggleCard(cardKey)}
                                className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                            >

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

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

                                            {/* DREAM TEAM = SCORE B */}

                                            <CountUp
                                                key={`scoreB-${index}-${match.scoreB}-${match.scoreA}`}
                                                end={match.scoreB ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                            />

                                            {" - "}

                                            <CountUp
                                                key={`scoreA-${index}-${match.scoreA}-${match.scoreB}`}
                                                end={match.scoreA ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                                onEnd={() => {

                                                    if (scoreFinished) {
                                                        return
                                                    }

                                                    finishScore(cardKey)

                                                    if (index === activeCard) {

                                                        setActiveCard(prev => prev + 1)

                                                        openNextCard(
                                                            cardKey,
                                                            index + 1 < scoreBoard.length
                                                                ? `stage-${index + 1}`
                                                                : "quarter"
                                                        )
                                                    }
                                                }}
                                            />

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* CONTEÚDO DO MAPA */}

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openCards[cardKey]
                                        ? 195
                                        : 0,
                                    opacity: openCards[cardKey]
                                        ? 1
                                        : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >

                                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">

                                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">

                                        <p className="text-[#ededed] font-bold">
                                            {maps[index]}
                                        </p>

                                        <p
                                            className={`font-bold ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >
                                            {match.scoreB} - {match.scoreA}
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

                        </motion.div>
                    )
                )
            })}

            {/* =====================================================
                QUARTER FINAL
            ====================================================== */}

            {activeCard >= quarterFinalIndex &&
                playoffResult?.quarterFinal && (() => {

                    const match = playoffResult.quarterFinal
                    const cardKey = "quarter"
                    const scoreFinished = !!finishedScores[cardKey]

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-[910px] bg-[#0b0b0f]"
                        >

                            {/* HEADER */}

                            <div
                                onClick={() => toggleCard(cardKey)}
                                className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                            >

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

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

                                            {/* DREAM TEAM = SCORE B */}

                                            <CountUp
                                                key={`quarter-scoreB-${match.scoreA}-${match.scoreB}`}
                                                end={match.scoreB ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                            />

                                            {" - "}

                                            <CountUp
                                                key={`quarter-scoreA-${match.scoreA}-${match.scoreB}`}
                                                end={match.scoreA ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                                onEnd={() => {

                                                    if (scoreFinished) {
                                                        return
                                                    }

                                                    finishScore(cardKey)

                                                    if (activeCard === quarterFinalIndex) {

                                                        setActiveCard(prev => prev + 1)

                                                        openNextCard(
                                                            "quarter",
                                                            "semi"
                                                        )
                                                    }
                                                }}
                                            />

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* CONTEÚDO DO MAPA */}

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openCards.quarter ? 195 : 0,
                                    opacity: openCards.quarter ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >

                                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">

                                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">

                                        <p className="text-[#ededed] font-bold">
                                            {maps[quarterFinalIndex]}
                                        </p>

                                        <p
                                            className={`font-bold ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >
                                            {match.scoreB} - {match.scoreA}
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

                        </motion.div>
                    )
                })()}

            {/* =====================================================
                SEMI FINAL
            ====================================================== */}

            {activeCard >= semiFinalIndex &&
                playoffResult?.semiFinal && (() => {

                    const match = playoffResult.semiFinal
                    const cardKey = "semi"
                    const scoreFinished = !!finishedScores[cardKey]

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-[910px] bg-[#0b0b0f]"
                        >

                            {/* HEADER */}

                            <div
                                onClick={() => toggleCard(cardKey)}
                                className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                            >

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

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

                                            {/* DREAM TEAM = SCORE B */}

                                            <CountUp
                                                key={`semi-scoreB-${match.scoreA}-${match.scoreB}`}
                                                end={match.scoreB ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                            />

                                            {" - "}

                                            <CountUp
                                                key={`semi-scoreA-${match.scoreA}-${match.scoreB}`}
                                                end={match.scoreA ?? 0}
                                                start={0}
                                                duration={COUNT_DURATION}
                                                onEnd={() => {

                                                    if (scoreFinished) {
                                                        return
                                                    }

                                                    finishScore(cardKey)

                                                    if (activeCard === semiFinalIndex) {

                                                        setActiveCard(prev => prev + 1)

                                                        openNextCard(
                                                            "semi",
                                                            "final"
                                                        )
                                                    }
                                                }}
                                            />

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* CONTEÚDO DO MAPA */}

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openCards.semi ? 195 : 0,
                                    opacity: openCards.semi ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >

                                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">

                                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">

                                        <p className="text-[#ededed] font-bold">
                                            {maps[semiFinalIndex]}
                                        </p>

                                        <p
                                            className={`font-bold ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >
                                            {match.scoreB} - {match.scoreA}
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

                        </motion.div>
                    )
                })()}

            {/* =====================================================
                FINAL - UM ÚNICO CARD
            ====================================================== */}

            {activeCard >= finalIndex &&
                playoffResult?.final &&
                currentFinalMap && (

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[910px] bg-[#0b0b0f]"
                    >

                        {/* HEADER */}

                        <div
                            onClick={() => toggleCard("final")}
                            className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                        >

                            <div className="flex flex-col">

                                <p className="text-[#ededed] font-bold text-xl">
                                    Final
                                </p>

                            </div>

                            <Separator
                                orientation="vertical"
                                className="bg-[#0b0b0f]"
                            />

                            <div className="flex min-w-3xl justify-between w-full">

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

                                    {/* PLACAR DA SÉRIE */}

                                    <p
                                        className={`font-bold text-3xl transition-colors duration-300 ${
                                            !finalMapFinished
                                                ? "text-[#8a8a8a]"
                                                : currentMapWon
                                                    ? "text-[#5CB85C]"
                                                    : "text-[#D9534F]"
                                        }`}
                                    >

                                        {/* DREAM TEAM = ESQUERDA */}

                                        {finalWinsA}

                                        {" - "}

                                        {finalWinsB}

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* CONTEÚDO DA FINAL */}

                        <motion.div
                            initial={false}
                            animate={{
                                height: openCards.final ? 195 : 0,
                                opacity: openCards.final ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >

                            <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">

                                <div className="flex flex-col bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">

                                    {/* MAPA ATUAL */}

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-4">

                                            <p className="text-[#ededed] font-bold">
                                                Map {finalMapIndex + 1}
                                            </p>

                                            <Separator
                                                orientation="vertical"
                                                className="bg-[#0b0b0f] h-6"
                                            />

                                            <p className="text-[#ededed] font-bold">
                                                {maps[finalIndex + finalMapIndex]}
                                            </p>

                                        </div>

                                        {/* PLACAR DO MAPA */}

                                        <p
                                            className={`font-bold text-2xl transition-colors duration-300 ${
                                                !finalMapFinished
                                                    ? "text-[#8a8a8a]"
                                                    : currentMapWon
                                                        ? "text-[#5CB85C]"
                                                        : "text-[#D9534F]"
                                            }`}
                                        >

                                            {/* DREAM TEAM = ESQUERDA */}

                                            <CountUp
                                                key={`final-map-scoreB-${finalMapIndex}-${currentFinalMap.scoreB}`}
                                                end={currentFinalMap.scoreB}
                                                start={0}
                                                duration={COUNT_DURATION}
                                            />

                                            {" - "}

                                            <CountUp
                                                key={`final-map-scoreA-${finalMapIndex}-${currentFinalMap.scoreA}`}
                                                end={currentFinalMap.scoreA}
                                                start={0}
                                                duration={COUNT_DURATION}
                                                onEnd={() => {

                                                    if (finalMapFinished) {
                                                        return
                                                    }

                                                    setFinalMapFinished(true)

                                                    setTimeout(() => {

                                                        if (
                                                            finalMapIndex <
                                                            finalMaps.length - 1
                                                        ) {

                                                            setFinalMapIndex(
                                                                prev => prev + 1
                                                            )

                                                            setFinalMapFinished(false)
                                                        }

                                                    }, 1000)
                                                }}
                                            />

                                        </p>

                                    </div>

                                    {/* ROUNDS */}

                                    <div className="flex items-center gap-4 mt-4">

                                        <p className="text-[#ededed]">
                                            4-8
                                        </p>

                                        <Separator
                                            orientation="vertical"
                                            className="bg-[#0b0b0f] h-6"
                                        />

                                        <p className="text-[#ededed]">
                                            9-3
                                        </p>

                                    </div>

                                    {/* HISTÓRICO DOS MAPAS */}

                                    {finishedFinalMaps.length > 0 && (

                                        <div className="flex gap-4 mt-auto">

                                            {finishedFinalMaps.map(
                                                (map, index) => {

                                                    // scoreB = Dream Team
                                                    const won =
                                                        map.scoreB > map.scoreA

                                                    return (
                                                        <div
                                                            key={`finished-map-${index}`}
                                                            className="flex items-center gap-2"
                                                        >

                                                            <p className="text-[#ededed] text-xs">
                                                                {maps[finalIndex + index]}
                                                            </p>

                                                            <p
                                                                className={`font-bold text-xs ${
                                                                    won
                                                                        ? "text-[#5CB85C]"
                                                                        : "text-[#D9534F]"
                                                                }`}
                                                            >

                                                                {map.scoreB}
                                                                {" - "}
                                                                {map.scoreA}

                                                            </p>

                                                        </div>
                                                    )
                                                }
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>
                )}
        </>
    )
}
