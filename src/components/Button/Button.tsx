
import styles from "./component.module.scss";

interface ButtonProps {
    onClick: () => void;
    title: string
}

export default function Button({ onClick, title }: ButtonProps) {
    return <button
        className={styles.button}
        onClick={onClick}
    > {title}</button>
}
