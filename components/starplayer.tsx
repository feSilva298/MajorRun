

export default function StarPlayer(){
    const Item = false;

    if(!Item){
        return(
            <>
            <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                    <p className="text-xl font-bold px-4 py-0.5">Star Player</p>
            </div> 
         <div className=" flex flex-col justify-center items-center w-[904px] h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">
            <div className="flex flex-col p-6">
                    <p className="text-3xl text-[#EDEDED]">+<span className="text-xl font-normal ml-2"></span></p>                
            </div>
        </div>    
            </>
        )}

    return(
        <>
        <div className="flex bg-[#C8A24A] w-full rounded-tr-4xl">
                    <p className="text-xl font-bold px-4 py-0.5">Star Player</p>
        </div> 
         <div className=" flex flex-col justify-center w-[904px] h-[200px] bg-[#1C1C22] border-[#C8A24A] border-2">
            
            <div className="flex flex-col p-6">
                    <p className="text-4xl font-bold text-[#EDEDED]">FalleN<span className="text-xl font-normal ml-2"> The Professor</span></p>                
                <p className=" text-xl text-[#EDEDED]">2016</p>
            </div>
            
            <div className="flex justify-end p-6 items-baseline space-x-4">
                <p className="text-[#EDEDED] text-xl">IGL</p>
                <p className="font-bold text-4xl text-[#EDEDED]">99</p>
            </div>
        </div>
        </>
    )
}