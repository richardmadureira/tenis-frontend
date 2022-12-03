import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
    let error = useRouteError();
    return (
        <>
            <div>Erro encontrado!</div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
    );
}