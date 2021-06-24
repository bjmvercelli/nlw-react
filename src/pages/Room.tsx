import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom' //permite pegar os parametros da url

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg'
import '../styles/room.scss'
import { useEffect } from 'react';

type FirebaseQuestions = Record<string, { //Record é usado para declarar tipagem de um objeto, em que nesse caso a chave é uma string e o valor é outro objeto
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams = {
    id: string;
}

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');

    const [questions, setQuestions] = useState<QuestionType[]>([]); //<> -> generic
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => { //usamos o evento 'value' para ler o conteúdo, ele será chamado sempre que houver alteração em dados da nossa referencia, no caso as questions do nosso room -  (on(), mas poderia ser once() para ouvir uma unica vez) - https://firebase.google.com/docs/database/web/read-and-write?hl=pt-br#web_value_events
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}; //o '??' implica que o retorno será o operador da direita ('{}') caso o da esquerda ('databaseRoom.questions') seja null 
            
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //As questões são retornadas em um objeto e aqui jogamos elas para um array para mapear - desestruturamos o array em key e value
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                };
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]); 

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === ''){
            return;
        }

        if(!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> /*O '&&' implica em um 'if' sem um 'else'*/}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}