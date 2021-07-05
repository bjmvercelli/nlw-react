//Nesse hook abstraimos a lógica de carregamento da sala em um arquivo específico, que pode ser reutilizado também na hora de fazer a página do admin
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, { //Record é usado para declarar tipagem de um objeto, em que nesse caso a chave é uma string e o valor é outro objeto
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, { //objeto em que a chave é o id do like e o valor é um objeto que tem authorId 
        authorId: string;
    }> 
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length, //queremos só os values do array retornado, por isso usamos values() e não entries()
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0] //SE (?.) encontrar o like do usuario naquela pergunta, retorna o id desse like (que será o primeiro ([0]) encontrado)
                };
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            roomRef.off('value'); //remove os event listeners
        }

    }, [roomId, user?.id]); 

    return {questions, title}
}