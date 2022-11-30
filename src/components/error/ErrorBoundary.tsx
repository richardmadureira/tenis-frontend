import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    return (
        <>
            <div>Dang!</div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
    );
}