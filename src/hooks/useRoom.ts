//Nesse hook abstraimos a lógica de carregamento da sala em um arquivo específico, que pode ser reutilizado também na hora de fazer a página do admin
import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, { //Record é usado para declarar tipagem de um objeto, em que nesse caso a chave é uma string e o valor é outro objeto
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
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
}

export function useRoom(roomId: string) {
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

    return {questions, title}
}