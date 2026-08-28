"use client"

import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Team, CampaignMatch, PlayoffResult } from "@/lib/types/team"
import { useState, useEffect } from "react"

type Props = {
    teams: Team[]
    scoreBoard: CampaignMatch[]
    playoffResult: PlayoffResult | null
    maps: string[]
    onCampaignEnd?: () => void
}

// ============================================================
// CONFIGURAÇÕES DA SIMULAÇÃO
// ============================================================

const COUNT_DURATION = 3

export default function CardSimulation({
    teams,
    scoreBoard,
    playoffResult,
    maps,
    onCampaignEnd
}: Props) {

    const [activeCard, setActiveCard] = useState(0)

    const [openCards, setOpenCards] = useState<Record<string, boolean>>({
        "stage-0": true,
        quarter: false,
        semi: false,
        final: true,
    })

    const [finishedScores, setFinishedScores] = useState<Record<string, boolean>>({})

    // Controle da Final
    const [finalMapIndex, setFinalMapIndex] = useState(0)
    const [finalMapFinished, setFinalMapFinished] = useState(false)

    const quarterFinalIndex = scoreBoard.length
    const semiFinalIndex = scoreBoard.length + 1
    const finalIndex = scoreBoard.length + 2

    /* ============================================================
       FIM DE CAMPANHA
    ============================================================ */


    /* ============================================================
       CONTROLE DOS CARDS
    ============================================================ */

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

    /* ============================================================
       FINAL
    ============================================================ */

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

    /*
     * A FINAL SÓ É CONSIDERADA TERMINADA QUANDO
     * NÃO EXISTEM MAIS MAPAS PARA JOGAR.
     */
    const finalFinished =
        finalMapFinished &&
        finalMapIndex >= finalMaps.length - 1

    /*
     * DREAM TEAM FOI CAMPEÃO
     */
    const dreamTeamChampion =
        finalFinished && finalWinsA > finalWinsB

    /*
     * DREAM TEAM PERDEU A FINAL
     */
    const dreamTeamLost =
        finalFinished && finalWinsB > finalWinsA

    const currentMapWon =
        currentFinalMap
            ? currentFinalMap.scoreB > currentFinalMap.scoreA
            : false

    /*
     * Assim que a série da final termina (seja vitória ou
     * derrota do Dream Team), avisamos que a campanha acabou.
     */
    useEffect(() => {
        if (finalFinished) {
            onCampaignEnd?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalFinished])

    /* ============================================================
       CORES
    ============================================================ */

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
     * COR DO PLACAR FINAL DA SÉRIE
     *
     * CAMPEÃO  -> DOURADO
     * PERDEU    -> VERMELHO
     * EM ANDAMENTO -> CINZA
     */
    const getFinalSeriesColor = () => {

        if (!finalFinished) {
            return "text-[#8a8a8a]"
        }

        if (dreamTeamChampion) {
            return "text-[#C8A24A]"
        }

        if (dreamTeamLost) {
            return "text-[#D9534F]"
        }

        return "text-[#8a8a8a]"
    }

    /* ============================================================
       RENDER
    ============================================================ */

    return (
        <>
            {/* =====================================================
                STAGE 3
            ====================================================== */}

            {scoreBoard.map((match, index) => {

                const cardKey = `stage-${index}`
                const scoreFinished = !!finishedScores[cardKey]
                const isLastSwissMatch = index === scoreBoard.length - 1

                return (
                    index <= activeCard && (
                        <div
                            key={cardKey}
                            className="w-[910px] bg-[#0b0b0f] pb-[3px]"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full bg-[#0b0b0f]"
                            >

                                <div
                                    onClick={() => toggleCard(cardKey)}
                                    className="grid grid-cols-[auto_auto_1fr_auto] items-center bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                                >

                                    <div className="flex flex-col shrink-0">
                                        <p className="text-[#ededed] font-bold text-xl">
                                            Stage 3
                                        </p>

                                        <p className="text-[#ededed] text-xs">
                                            {match.winsBefore} - {match.lossesBefore}
                                        </p>
                                    </div>

                                    <Separator
                                        orientation="vertical"
                                        className="bg-[#0b0b0f] h-full"
                                    />

                                    <div className="flex items-center min-w-0">
                                        <div className="flex gap-2 min-w-0">

                                            <p className="text-xs text-[#ededed] font-light shrink-0">
                                                vs
                                            </p>

                                            <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold truncate">
                                                {teams[index]?.team}

                                                <span className="text-xl font-normal shrink-0">
                                                    {teams[index]?.year}
                                                </span>
                                            </p>

                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">

                                        <p className="text-xs text-[#ededed] font-light">
                                            bo1
                                        </p>

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

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

                                                    /*
                                                     * Se essa foi a última partida do swiss e
                                                     * não existe playoff (foi eliminado),
                                                     * a campanha acaba aqui.
                                                     */
                                                    if (isLastSwissMatch && !playoffResult) {
                                                        onCampaignEnd?.()
                                                    }

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

                                            {scoreFinished && (
                                                <p
                                                    className={`font-bold ${getResultColor(
                                                        scoreFinished,
                                                        match.won
                                                    )}`}
                                                >
                                                    {match.scoreB} - {match.scoreA}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </motion.div>

                            </motion.div>
                        </div>
                    )
                )
            })}

            {/* =====================================================
                PLAYOFFS
            ====================================================== */}

            {activeCard >= quarterFinalIndex &&
                playoffResult?.quarterFinal && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center w-[910px] h-[70px]"
                    >
                        <p className="text-[#ededed] font-bold text-6xl font-bebas">
                            Playoffs
                        </p>
                    </motion.div>
                )}

            {/* =====================================================
                QUARTER FINAL
            ====================================================== */}

            {activeCard >= quarterFinalIndex &&
                playoffResult?.quarterFinal && (() => {

                    const match = playoffResult.quarterFinal
                    const cardKey = "quarter"
                    const scoreFinished = !!finishedScores[cardKey]

                    return (
                        <div className="w-[910px] bg-[#0b0b0f] pb-[3px]">

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full bg-[#0b0b0f]"
                            >

                                <div
                                    onClick={() => toggleCard(cardKey)}
                                    className="grid grid-cols-[auto_auto_1fr_auto] items-center bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                                >

                                    <div className="flex flex-col shrink-0">
                                        <p className="text-[#ededed] font-bold text-xl">
                                            Quarter Final
                                        </p>
                                    </div>

                                    <Separator
                                        orientation="vertical"
                                        className="bg-[#0b0b0f] h-full"
                                    />

                                    <div className="flex items-center min-w-0">

                                        <div className="flex gap-2 min-w-0">

                                            <p className="text-xs text-[#ededed] font-light shrink-0">
                                                vs
                                            </p>

                                            <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold truncate">

                                                {teams[5]?.team}

                                                <span className="text-xl font-normal shrink-0">
                                                    {teams[5]?.year}
                                                </span>

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">

                                        <p className="text-xs text-[#ededed] font-light">
                                            bo1
                                        </p>

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

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

                                                    /*
                                                     * Perdeu nas quartas: não existe semi.
                                                     * Campanha acaba aqui.
                                                     */
                                                    if (!match.won) {
                                                        onCampaignEnd?.()
                                                    }

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

                                            {scoreFinished && (
                                                <p
                                                    className={`font-bold ${getResultColor(
                                                        scoreFinished,
                                                        match.won
                                                    )}`}
                                                >
                                                    {match.scoreB} - {match.scoreA}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </motion.div>

                            </motion.div>
                        </div>
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
                        <div className="w-[910px] bg-[#0b0b0f] pb-[3px]">

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full bg-[#0b0b0f]"
                            >

                                <div
                                    onClick={() => toggleCard(cardKey)}
                                    className="grid grid-cols-[auto_auto_1fr_auto] items-center bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                                >

                                    <div className="flex flex-col shrink-0">

                                        <p className="text-[#ededed] font-bold text-xl">
                                            Semi Final
                                        </p>

                                    </div>

                                    <Separator
                                        orientation="vertical"
                                        className="bg-[#0b0b0f] h-full"
                                    />

                                    <div className="flex items-center min-w-0">

                                        <div className="flex gap-2 min-w-0">

                                            <p className="text-xs text-[#ededed] font-light shrink-0">
                                                vs
                                            </p>

                                            <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold truncate">

                                                {teams[6]?.team}

                                                <span className="text-xl font-normal shrink-0">
                                                    {teams[6]?.year}
                                                </span>

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">

                                        <p className="text-xs text-[#ededed] font-light">
                                            bo1
                                        </p>

                                        <p
                                            className={`font-bold text-3xl transition-colors duration-300 ${getResultColor(
                                                scoreFinished,
                                                match.won
                                            )}`}
                                        >

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

                                                    /*
                                                     * Perdeu na semi: não existe final.
                                                     * Campanha acaba aqui.
                                                     */
                                                    if (!match.won) {
                                                        onCampaignEnd?.()
                                                    }

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

                                            {scoreFinished && (
                                                <p
                                                    className={`font-bold ${getResultColor(
                                                        scoreFinished,
                                                        match.won
                                                    )}`}
                                                >
                                                    {match.scoreB} - {match.scoreA}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </motion.div>

                            </motion.div>
                        </div>
                    )
                })()}

            {/* =====================================================
                FINAL
            ====================================================== */}

            {activeCard >= finalIndex &&
                playoffResult?.final &&
                currentFinalMap && (

                    <div className="w-[910px] bg-[#C8A24A] pb-[3px]">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full bg-[#0b0b0f]"
                        >

                            <div
                                onClick={() => toggleCard("final")}
                                className="grid grid-cols-[auto_auto_1fr_auto] items-center bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f] cursor-pointer"
                            >

                                <div className="flex flex-col shrink-0">

                                    <p className="text-[#ededed] font-bold text-xl">
                                        Final
                                    </p>

                                </div>

                                <Separator
                                    orientation="vertical"
                                    className="bg-[#0b0b0f] h-full"
                                />

                                <div className="flex items-center min-w-0">

                                    <div className="flex gap-2 min-w-0">

                                        <p className="text-xs text-[#ededed] font-light shrink-0">
                                            vs
                                        </p>

                                        <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold truncate">

                                            {teams[7]?.team}

                                            <span className="text-xl font-normal shrink-0">
                                                {teams[7]?.year}
                                            </span>

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 shrink-0">

                                    <p className="text-xs text-[#ededed] font-light">
                                        bo3
                                    </p>

                                    {/* PLACAR DA SÉRIE */}

                                    <p
                                        className={`font-bold text-3xl transition-colors duration-300 ${getFinalSeriesColor()}`}
                                    >

                                        {finalWinsA}

                                        {" - "}

                                        {finalWinsB}

                                    </p>

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
                                                    Mapa {finalMapIndex + 1}
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

                                        {/* HISTÓRICO DOS MAPAS */}

                                        {finishedFinalMaps.length > 0 && (

                                            <div className="flex gap-4 mt-auto">

                                                {finishedFinalMaps.map(
                                                    (map, index) => {

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
                    </div>
                )}
        </>
    )
}