import { Star } from "lucide-react";

export const StarRate: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                    const filledPercent = Math.min(Math.max(rating - i, 0),1) * 100;
                    return (
                        <div className=" relative w-6 h-6" key={i}>
                            <Star className={`text-yellow-500 fill-none`} size={24}/>
                            <div  className={`absolute top-0 left-0 overflow-hidden`} style={{width: `${filledPercent}%`}}> 
                                <Star className={`text-yellow-500 fill-current`} size={24}/>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
}