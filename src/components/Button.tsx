import { ButtonHTMLAttributes } from 'react'; //todos os possíveis atributos que um botão pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { //passamos entre <> a tipagem do elemento do botão (é global) - além disso, recebemos propriedades extras da nossa escolha(& {...})
    isOutlined?: boolean
}; 

export function Button({isOutlined = false, ...props}: ButtonProps) { //tudo que não foi isOutlined (que por default é false) é jogado pra dentro do props

    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
    )
}
