import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { useTheme } from '../hooks/useTheme';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
    
    let history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    // const {theme, toggleTheme} = useTheme();

    async function handleCreateRoom() {
        if (!user){
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get(); //verificamos se o código corresponde a uma sala existente e damos um get() no resultado

        if (!roomRef.exists()) {
            alert('Room does not exists!');
            return;
        }

        if (roomRef.val().endedAt) { //se existir o ""atributo""" endedAt no room é porque ele foi encerrado
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}