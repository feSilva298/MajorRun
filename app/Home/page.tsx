
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Home(){


    return(
        <>
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col p-12">
                <p className="text-[#C8A24A] xl:text-9xl font-sora font-bold">Major<span className="font-sora font-normal">Run</span></p>
                <p className="text-[#EDEDED] text-sm py-2">Monte. Evolua. Vença.</p>
                <Link href="/PreGame">
                <button className="bg-[#1C1C22] border-[#C8A24A] border w-50 h-15 mt-10 
                hover:scale-105 transition-all duration-100
                hover:text-[#C8A24A]
                 text-[#EDEDED]
                 text-2xl">Jogar</button></Link>

                
                <div className="bg-[#1C1C22] w-200 h-27 flex p-4 mt-30">
                    
                    <div className="flex flex-col w-65 px-6">
                        <p className="text-[#EDEDED] font-bold text-lg">Monte seu elenco</p>
                        <p className="text-[#EDEDED] text-sm">Escolha jogadores lendários e forme o time dos seus sonhos.</p>
                    </div>
                    <Separator className="bg-[#0B0B0F]" orientation="vertical"/>
                    <div className="flex flex-col w-65 px-6">
                        <p className="text-[#EDEDED] font-bold text-lg">Desenvolva sua equipe</p>
                        <p className="text-[#EDEDED] text-sm">Encontre a melhor química e fortaleça seu elenco.</p>
                    </div>
                    <Separator className="bg-[#0B0B0F]" orientation="vertical"/>
                    <div className="flex flex-col w-65 px-6">
                        <p className="text-[#EDEDED] font-bold text-lg">Conquiste o Major</p>
                        <p className="text-[#EDEDED] text-sm">Supere os adversários e escreva sua história.</p>
                    </div>
                </div>
            </div>
        </div>

        
        </>
    )
}

//futuramente isso

//<div className="h-fit w-fit">
  //              <Image src="/assets/ChatGPTImage.png"
    //            alt="trofeu"
      //          width={500}
        //        height={500}
          //      />
            //</div>