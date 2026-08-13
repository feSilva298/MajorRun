"use client"

import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Team } from "@/lib/types/team"
import { drawMaps } from "@/lib/configs"
import {useState, useEffect} from "react"

type Props = {
    teams: Team[]
}
export default function CardSimulation({teams}: Props) {
    
    const [map, setMap] = useState<string>()

    useEffect(() =>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMap(drawMaps)
    },[])

    return(
        <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-[910px] h-[300px] bg-[#0b0b0f]">
                <div className="flex bg-[#1c1c22] w-[910px] h-[100px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex flex-col">
                        <p className="text-[#ededed] font-bold text-xl">Stage 3</p>
                        <p className="text-[#ededed] text-xs">0-0</p>
                    </div>
                    <Separator orientation="vertical" className="bg-[#0b0b0f]"/>
                    <div className="flex min-w-3xl justify-between">
                        <div className="flex gap-2">
                            <p className="text-xs text-[#ededed] font-light">vs</p>
                            <p className="flex gap-2 items-baseline text-4xl text-[#ededed] font-bold">{teams[0]?.team}<span className="text-xl font-normal">{teams[0]?.year}</span></p>   
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-[#ededed] font-light">bo1</p>
                            <p className="text-[#5CB85C] font-bold text-3xl"><CountUp end={13} start={0} duration={3}></CountUp> - <CountUp end={11} start={0} duration={3}></CountUp></p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center bg-[#1c1c22] w-[910px] h-[195px] p-2 gap-4 border border-[#0b0b0f]">
                    <div className="flex bg-[#1c1c22] w-[820px] h-[180px] p-4 gap-4 border border-[#0b0b0f]">
                        <p className="text-[#ededed] font-bold">{map}</p>
                        <p className="text-[#5cb85c] font-bold">13 - 11</p>
                        <Separator orientation="vertical" className="bg-[#0b0b0f] h-6"/>
                        <p className="text-[#ededed]">4-8</p>
                        <p className="text-[#ededed]">9-3</p>
                    </div>
                </div>
                </motion.div>
        </>
    )
}