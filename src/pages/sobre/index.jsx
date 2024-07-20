import { Link, useNavigate } from "react-router-dom"

export default function Sobre(){
    const navigate = useNavigate()
    return (
        <>
            <header className="max-w-[1000px] mx-auto px-12 [&>h1]:font-[900] [&>h1]:uppercase [&>h1]:text-2xl relative text-gray-700 dark:text-gray-200 pt-28">
                <button className="absolute left-12 top-12" onClick={()=> navigate('/')}>
                    <span className='relative top-[1px]'>&lt;</span> voltar
                </button>
                <h1 className="font-bold">Projeto Máximas Estoicas</h1> <br />
            </header>
    
            <main className="max-w-[1000px] mx-auto px-12 [&>h2]:font-[700] [&>h2]:uppercase [&_h2]:text-2xl relative text-gray-700 dark:text-gray-200 ">
                <section >
                    <p>Bem-vindo ao Projeto Máximas Estoicas, uma coleção abrangente de mais de 1700 máximas, aforismos e reflexões inspiradas na filosofia estoica. 
                        Este projeto visa fornecer sabedoria atemporal para ajudar as pessoas a enfrentar os desafios da vida com resiliência, calma e clareza.</p>
                </section>
                <br /><br />

                <section >
                    <h2 className="font-bold">
                        O Que São Máximas Estoicas?
                    </h2><br />
                    <p>As máximas estoicas são pequenos trechos de sabedoria derivados das obras de filósofos estoicos como Sêneca, Epicteto e Marco Aurélio. 
                        Estes pensadores antigos abordaram questões da vida cotidiana, da ética e da mente humana, fornecendo orientações práticas para viver uma vida virtuosa e equilibrada. 
                        As máximas oferecem insights sobre como lidar com adversidades, controlar emoções e encontrar paz interior.</p>
                </section>

                <br /><br />
                
                <section >
                    <h2 className="font-bold">Características do Projeto</h2>
                    <br />
                    <article >
                        <strong>Coletânea Abrangente</strong>
                        <p>Nossa coleção inclui mais de 1700 máximas que cobrem uma ampla gama de tópicos relacionados à filosofia estoica. 
                           Cada máxima foi cuidadosamente selecionada para oferecer profundidade e clareza, promovendo reflexões significativas.
                           <br /><br />
                           Para tornar mais acessível e moderno, foi implementado a funcionalidade de <strong className="text-gray-100">Text-to-Speech (TTS)</strong> usando inteligência artificial. 
                           Agora você pode ouvir as máximas em vez de apenas lê-las, facilitando a absorção do conteúdo em qualquer momento e lugar.
                           <br /><br />

                           Convidamos leitores e entusiastas da filosofia a contribuírem para este projeto. <br />
                           Se você conhece outras máximas ou autores estoicos que deveriam ser incluídos, entre em contato conosco pelo email: &nbsp;
                           <a href="mailto:bruno.f.c@icloud.com"><span className="text-white underline inline-block">bruno.f.c@icloud.com</span></a>, 
                           ou contribua pelo &nbsp;<Link to={'https://github.com/brunofranciscu/maximasestoicas'}><span className="text-white underline">github</span></Link>.
                           Acredito que a sabedoria cresce quando compartilhada, e estou ansioso para expandir a coleção com a sua ajuda.
                    
                        </p>
                    </article>
    
                </section>
                <br /><br />
                <section className="flex gap-5">
                    <article >
                        <strong>Política de Privacidade</strong><br />
                        <p>Sua privacidade é importante para nós. Para mais informações, consulte nossa &nbsp;
                            <Link to="/politica-de-privacidade"><span className="underline text-white">Política de Privacidade</span></Link>.</p>
                    </article>
        
                    <article >
                        <h3 className="font-bold">Redes</h3>
                        <p>
                            Siga-nos no Instagram para atualizações, novas máximas e inspirações diárias. Acesse nosso perfil &nbsp;
                                <Link to="https://www.instagram.com/maximasestoicas">
                                    <span className="underline text-white">aqui</span>
                                </Link>
                        .</p>
                    </article>
                </section>
            </main>
            <br /><br />
            <footer className="text-gray-700 dark:text-gray-300 text-center py-5">
                <p>&copy; 2024 Projeto Máximas Estoicas</p>
            </footer>
  </>
    )
}