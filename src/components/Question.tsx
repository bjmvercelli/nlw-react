import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
}

export function Question({content, author}: QuestionProps) { //ao invés de utilizar props: QuestionProps, desestruturamos o props para pegar o que será utilizado
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    );
}