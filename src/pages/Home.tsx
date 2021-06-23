import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useHistory } from 'react-router-dom';

export function Home() {

    let history = useHistory();

    function navigateToNewRoom() {
        history.push('/rooms/new');
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask logo" />
                    <button onClick={navigateToNewRoom} className="create-room">
                        <img src={googleImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala"/>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}