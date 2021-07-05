import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean,
    isHighlighted?: boolean,
}

export function Question({content, author, children, isAnswered = false, isHighlighted = false}: QuestionProps) { //ao invés de utilizar props: QuestionProps, desestruturamos o props para pegar o que será utilizado
    return (
        <div className={cx(
            'question',
            { answered: isAnswered},
            { highlighted: isHighlighted && !isAnswered }
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}