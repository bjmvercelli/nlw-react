type ButtonProps = { //Definição de tipagem para TypeScript 
    text?: string; //o '?' implica que a propriedade é opcional
}

export function Button(props: ButtonProps) {
    return (
        <button>{props.text || 'Default'}</button>
    )
}
