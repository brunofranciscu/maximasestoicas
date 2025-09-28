import { useNavigate } from 'react-router-dom';

export default function Back(){
    const navigate = useNavigate()

    return(
        <button onClick={() => navigate(-1)} className={`dark:text-gray-400 text-gray-900 font-["Poppins"] font-[300] hover:text-gray-400 duration-100 mb-3 w-[70px]`}>
            &lt; voltar
        </button>
    )
}