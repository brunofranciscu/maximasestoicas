import React from "react";
import { useNavigate } from 'react-router-dom';


export default function PoliticaPrivacidade(){

    const navigate = useNavigate()

    return(
        <div className='h-full w-full relative grid place-content-center bg-gray-200 dark:bg-gray-800 px-5 py-20'>

            <div className="max-w-[1000px] mx-auto px-5  [&>h2]:font-[700] [&>h1]:font-[900] [&>h1]:uppercase [&>h1]:text-2xl relative text-gray-700 dark:text-gray-200">

                <button className="absolute left-0 -top-12" onClick={()=>navigate('/')}>
                    <span className='relative top-[1px]'>&lt;</span> voltar
                </button>
                
                <h1>Política de Privacidade do Site de Máximas Estoicas</h1> <br />
                <em><strong>Última atualização:</strong> 13 de julho de 2024</em> <br />
                <br />
                <h2>Coleta de Informações</h2>
                <p>Não coletamos nenhuma informação pessoal identificável através do nosso site.</p>
                <br />
                <h2>Uso das Informações</h2>
                <p>Não utilizamos informações pessoais, pois não as coletamos.</p>
                <br />
                <h2>Compartilhamento de Informações</h2>
                <p>Não compartilhamos informações pessoais com terceiros, pois não as coletamos.</p>
                <br />
                <h2>Cookies</h2>
                <p>Não utilizamos cookies para coletar informações pessoais dos usuários.</p>
                <br />
                <h2>Links para Terceiros</h2>
                <p>Nosso site pode conter links para sites de terceiros. Esta Política de Privacidade não se aplica a sites de terceiros, portanto, recomendamos que você revise as políticas de privacidade desses sites.</p>
                <br />
                <h2>Alterações nesta Política</h2>
                <p>Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. Alterações significativas serão comunicadas através de nosso site.</p>
                <br />
                <h2>Contato</h2>
                <p>Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail <a href="mailto:bruno.f.c@icloud.com">bruno.f.c@icloud.com</a>.</p>
            </div>

        </div>
    )
}