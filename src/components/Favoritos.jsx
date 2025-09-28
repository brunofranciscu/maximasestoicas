import { useNavigate } from "react-router-dom"
import SaveIcon from "./SaveIcon";

export default function Favoritos({viewSaved, setViewSaved, salvar, salvas, frases}){
    const navigate = useNavigate();

    return(
        <>
            <SaveIcon title={`Ver salvas`} onClick={()=> setViewSaved(prevViewSaved => !prevViewSaved)}
                      className={`[&_*]:duration-100 [&_path]:stroke-gray-500 [&_path]:hover:fill-gray-500 [&_path]:fill-gray-500 left-4 fixed top-5`} />
            {viewSaved && 
                <ul className='fixed left-0 md:w-[450px] w-full bg-gray-300 dark:bg-gray-700/50 shadow-2xl h-full z-[999998] overflow-y-auto flex flex-col gap-8 salvos backdrop-blur-sm top-0 [box-shadow:inset_0_0_10px_#fff1]'>
                    <button title="ver salvos" onClick={()=> setViewSaved(prevViewSaved => !prevViewSaved)}
                            className='stroke-gray-500 hover:brightness-150 fill-gray-500 absolute top-2 right-4 z-[999999] text-gray-600 dark:text-gray-200 '>
                                X
                    </button>
                    {Object.values(salvas).length < 1 && <span className='text-gray-700 dark:text-gray-300'>Nada encontrado.</span>}
                    
                    {Object.entries(salvas).map(([key, value]) => (
                        value && frases.map((frase) => (
                            frase.id.toString() === key && 
                            <li key={key} className='text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 duration-100 flex gap-2 items-center px-12 py-3'>
                                
                                <button onClick={()=> salvar(frase.id)} className='text-red-500 hover:text-red-300 duration-75 z-[999999] leading-[0] text-lg'>
                                    x
                                </button>
    
                                <div className='flex flex-col'>
                                <small className='text-[].6rem block leading-none text-gray-600 dark:text-gray-100/50'> - {frase.author}</small>
                                <span className="text-gray-800 dark:text-gray-50" onClick={() => navigate(`/autor/${frase.author.split(' ').join('-').toLowerCase()}/maxima/${key}`)}>"{frase.text}"</span>
                                </div>
                            </li>
                            ))
                        ))
                    }
                </ul>}
        </>
        
    )
}