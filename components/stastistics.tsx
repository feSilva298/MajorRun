export default function Stats(){
    return(
        <>
        <div className="flex flex-col justify-center gap-10">
            <p className="font-bold text-4xl text-[#ededed]">Análise do Time</p>

            <div className="flex flex-col border-[#C8A24A] border-2 gap-4 p-4">
                <p className="text-xl font-bold text-[#ededed]">Star Player</p> 
                <p className="text-[#ededed] text-lg">Bonus:</p>
            </div>

            <div className="flex flex-col gap-12">
                <p className="text-[#ededed] font-semibold">Overall:</p>
                <p className="text-[#ededed] font-semibold">Sei la</p>
            </div>
        </div>
        </>
    )
}