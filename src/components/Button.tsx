import { ButtonHTMLAttributes } from 'react'; //todos os possíveis atributos que um botão pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //passamos entre <> a tipagem do elemento do botão (é global)

export function Button(props: ButtonProps) {

    return (
        <button className="button" {...props}/>
    )
}
