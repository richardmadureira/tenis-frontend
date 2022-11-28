import { HTMLProps, ReactElement, useEffect, useRef } from "react"

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
    indeterminate: boolean,
}

export const IndeterminateCheckbox = ({ indeterminate, className = '', ...rest }: IndeterminateCheckboxProps): ReactElement => {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate]);

    return (<input type="checkbox" ref={ref} className={'checkbox cursor-pointer ' + className} {...rest} />);
}