import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Email, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';

import { Navbar } from '../../navbar/Navbar';
import './About.scss';

export const About = (): ReactNode => {
    const socialMediaLinks = [
        {
            link: 'https://linkedin.com/in/danvinicius',
            title: 'LinkedIn',
        },
        {
            link: 'https://github.com/danvinicius',
            title: 'Github',
        },
        {
            link: 'mailto:viniccius774@gmail.com',
            title: 'E-mail',
        },
        {
            link: 'https://api.whatsapp.com/send/?phone=5521981834355',
            title: 'WhatsApp',
        },
    ];
    return (
        <>
            <Navbar />
            <section className='about container flex column gap-3'>
                <article className='flex column gap-5'>
                    <header>
                        <h2>O que é o Lexhub?</h2>
                    </header>
                    <p>
                        O Lexhub é uma plataforma de gestão de cenários e léxicos que foi projetada para resolver um dos maiores desafios na
                        engenharia de requisitos: <span>a falta de precisão na comunicação</span> e o alinhamento entre stakeholders.
                        <br />
                        <br />
                        Este problema, comum em projetos de software, resulta em custos elevados, ineficiência e até falhas. Nossa solução
                        combina cenários, símbolos e rastreabilidade, promovendo um entendimento claro e comum entre todos os envolvidos.
                    </p>
                </article>

                <article className='flex column gap-5'>
                    <header>
                        <h2>Como funciona?</h2>
                    </header>
                    <p>A plataforma organiza os principais elementos da definição de requisitos:</p>
                    <br />
                    <dl>
                        <dt>
                            <span>Cenários:</span>
                        </dt>
                        <dd>
                            Representam tarefas e situações do sistema, organizados com atores, exceções, contexto, recursos e episódios.
                            <br />
                            <br />A utilização de cenários é uma prática comum para clarificar e especificar esses requisitos, facilitando a
                            comunicação entre stakeholders. Os cenários oferecem meios valiosos para fornecer contexto para a elicitação dos
                            requisitos. Eles permitem que o engenheiro de software forneça uma estrutura para perguntas sobre tarefas do
                            usuário.
                        </dd>
                        <br />
                        <dt>
                            <span>Símbolos:</span>
                        </dt>
                        <dd>Termos importantes para o projeto, com suas noções, sinônimos e impactos.</dd>
                        <br />
                        <dt>
                            <span>Léxico Ampliado da Linguagem (LAL):</span>
                        </dt>
                        <dd>
                            O Léxico Ampliado da Linguagem, ou léxico, é um metamodelo projetado para ajudar na elicitação e na
                            representação da linguagem usada na aplicação.
                            <br />
                            <br />
                            No Lexhub, o léxico se traduz em símbolos e cenários, onde o usuário pode cadastrar previamente os
                            símbolos do seu projeto e, caso estes estejam presentes em quaisquer informações dos cenários, eles se conectam
                            automaticamente, criando um fluxo contínuo de informações.
                        </dd>
                    </dl>
                    <br />
                    <p>
                        Para fins didáticos, observe <Link to='/projeto/'>este exemplo de projeto</Link> para você entender na prática como
                        funciona a plataforma.
                    </p>
                </article>

                <article className='flex column gap-5'>
                    <header>
                        <h2>Por que o Lexhub é essencial?</h2>
                    </header>
                    <p>
                        A engenharia de requisitos é uma etapa crítica no desenvolvimento de software, onde são especificadas as
                        funcionalidades e restrições do sistema. Estudos mostram que uma má definição de requisitos pode levar a falhas no
                        projeto, aumento de custos e insatisfação do cliente. <br />
                        <br /> Nossa plataforma resolve esses problemas ao fornecer ferramentas poderosas para a criação, organização e
                        rastreamento de cenários e léxicos, promovendo <span>comunicação clara</span> e <span>eficiência no processo</span>.
                    </p>
                </article>

                <article className='flex column gap-5'>
                    <header>
                        <h2>Funcionalidades Principais</h2>
                    </header>
                    <div className='flex column gap-5' style={{ marginBottom: '1rem' }}>
                        <h3>Gestão de Projetos</h3>
                        <ul className='flex column gap-5'>
                            <li>Criar, editar e deletar projetos com controle total.</li>
                            <li>Definir projetos como públicos ou privados para garantir segurança e privacidade.</li>
                            <li>
                                Atribuir usuários e gerenciar permissões com papéis específicos:
                                <br />
                                <span>Observador:</span> Visualiza informações.
                                <br />
                                <span>Colaborador:</span> Pode editar cenários e símbolos.
                                <br />
                                <span>Administrador:</span> Gerencia usuários e permissões.
                                <br />
                                <span>Proprietário:</span> Tem controle total e pode excluir o projeto.
                            </li>
                        </ul>
                    </div>
                    <div className='flex column gap-5' style={{ marginBottom: '1rem' }}>
                        <h3>Cenários e símbolos</h3>
                        <ul className='flex column gap-5'>
                            <li>
                                Criar, editar e deletar cenários e símbolos para representar tarefas e processos do sistema, assim como seu
                                dicionário.
                            </li>
                            <li>
                                Referenciar cenários e símbolos dentro de outros cenários criando um sistema interconectado e intuitivo.
                            </li>
                        </ul>
                    </div>
                    <div className='flex column gap-5' style={{ marginBottom: '1rem' }}>
                        <h3>Léxico Ampliado da Linguagem (LAL)</h3>
                        <ul className='flex column gap-5'>
                            <li>Destaque automático de palavras ou frases em cenários que representam símbolos ou seus sinônimos.</li>
                            <li>
                                Ao clicar em um termo destacado, o usuário pode visualizar detalhes do símbolo, como classificação, noção,
                                sinônimos e impactos.
                            </li>
                            <li>Funciona como um dicionário dinâmico que elimina ambiguidade e promove entendimento coletivo.</li>
                        </ul>
                    </div>
                    <div className='flex column gap-5'>
                        <h3>Rastreabilidade e Controle de Alterações</h3>
                        <ul className='flex column gap-5'>
                            <li>Histórico completo de modificações em cenários e símbolos.</li>
                            <li>Transparência com rastreamento de quem realizou cada alteração.</li>
                        </ul>
                    </div>
                </article>

                <article className='flex column gap-5'>
                    <header>
                        <h2>Impacto para equipes de software</h2>
                    </header>
                    <p>Com a plataforma, engenheiros de software podem:</p>
                    <ol>
                        <li>Facilitar a elicitação de requisitos ao fornecer contexto detalhado por meio de cenários.</li>
                        <li>Garantir clareza no significado de termos técnicos e organizacionais através do léxico ampliado.</li>
                        <li>Melhorar a comunicação entre stakeholders, eliminando mal-entendidos.</li>
                        <li>Aumentar a eficiência e reduzir custos ao evitar erros decorrentes de requisitos mal definidos.</li>
                    </ol>
                </article>

                <footer>
                    <header>
                        <h2>Conclusão</h2>
                    </header>
                    <p>
                        Esta plataforma representa um avanço significativo na engenharia de requisitos, ajudando equipes a superar os
                        desafios da <span>comunicação</span> e da <span>definição de requisitos</span>. Seja você um desenvolvedor, analista
                        ou gerente de projetos, esta ferramenta é essencial para o sucesso dos seus projetos de software. Faça já seu
                        cadastro{' '}
                        <Link to='/login'>
                            <strong>clicando aqui</strong>
                        </Link>
                        .
                    </p>
                </footer>

                <div className='copyright flex column gap-1'>
                    <p>Lexhub {2025} &copy; e todos os direitos reservados.</p>
                    <ul className='socialMediaLinks'>
                        {socialMediaLinks?.map((socialMedia) => {
                            const { title, link } = socialMedia;
                            return (
                                <li key={title}>
                                    <a href={link} title={title} target='_blank'>
                                        {title == 'LinkedIn' ? (
                                            <LinkedIn />
                                        ) : title == 'Github' ? (
                                            <GitHub />
                                        ) : title == 'E-mail' ? (
                                            <Email />
                                        ) : title == 'WhatsApp' ? (
                                            <WhatsApp />
                                        ) : (
                                            ''
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
};
