import { RouteObject } from "react-router-dom";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { Layout } from "./components/layout/layout";
import { DesafioHomePage } from "./pages/desafios";
import { DesafioAlteracaoPage } from "./pages/desafios/alteracao";
import { DesafioConsultaPage } from "./pages/desafios/consulta";
import { DesafioDetalhePage } from "./pages/desafios/detalhe";
import { DesafioExclusaoPage } from "./pages/desafios/exclusao";
import { DesafioNovoPage } from "./pages/desafios/novo";
import { HomePage } from "./pages/home";
import { RankingHomePage } from "./pages/rankings";
import { TemporadaHomePage } from "./pages/temporadas";
import { TemporadaAlteracaoPage } from "./pages/temporadas/alteracao";
import { TemporadaConsultaPage } from "./pages/temporadas/consulta";
import { TemporadaDetalhePage } from "./pages/temporadas/detalhe";
import { TemporadaExclusaoPage } from "./pages/temporadas/exclusao";
import { TemporadaNovaPage } from "./pages/temporadas/nova";
import { TenistaHomePage } from "./pages/tenistas";
import { TenistaAlteracaoPage } from "./pages/tenistas/alteracao";
import { TenistaConsultaPage } from "./pages/tenistas/consulta";
import { TenistaDetalhePage } from "./pages/tenistas/detalhe";
import { TenistaExclusaoPage } from "./pages/tenistas/exclusao";
import { TenistaNovoPage } from "./pages/tenistas/novo";
import { TorneioHomePage } from "./pages/torneios";
import { TorneioAlteracaoPage } from "./pages/torneios/alteracao";
import { TorneioConsultaPage } from "./pages/torneios/consulta";
import { TorneioDetalhePage } from "./pages/torneios/detalhe";
import { TorneioExclusaoPage } from "./pages/torneios/exclusao";
import { TorneioNovoPage } from "./pages/torneios/novo";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorBoundary/>,
        children: [
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path: 'temporadas',
                element: <TemporadaHomePage />,
                children: [
                    {
                        path: 'nova',
                        element: <TemporadaNovaPage />
                    },
                    {
                        path: 'pesquisa',
                        element: <TemporadaConsultaPage />
                    },
                    {
                        path: 'alteracao/:id',
                        element: <TemporadaAlteracaoPage />
                    },
                    {
                        path: 'detalhe/:id',
                        element: <TemporadaDetalhePage />
                    },
                    {
                        path: 'exclusao/:id',
                        element: <TemporadaExclusaoPage />
                    }
                ]
            },
            {
                path: 'desafios',
                element: <DesafioHomePage />,
                children: [
                    {
                        path: 'novo',
                        element: <DesafioNovoPage />
                    },
                    {
                        path: 'pesquisa',
                        element: <DesafioConsultaPage />
                    },
                    {
                        path: 'alteracao/:id',
                        element: <DesafioAlteracaoPage />
                    },
                    {
                        path: 'detalhe/:id',
                        element: <DesafioDetalhePage />
                    },
                    {
                        path: 'exclusao/:id',
                        element: <DesafioExclusaoPage />
                    }
                ]
            },
            {
                path: 'torneios',
                element: <TorneioHomePage />,
                children: [
                    {
                        path: 'novo',
                        element: <TorneioNovoPage />
                    },
                    {
                        path: 'alteracao/:id',
                        element: <TorneioAlteracaoPage />
                    },
                    {
                        path: 'detalhe/:id',
                        element: <TorneioDetalhePage />
                    },
                    {
                        path: 'pesquisa',
                        element: <TorneioConsultaPage />
                    },
                    {
                        path: 'exclusao/:id',
                        element: <TorneioExclusaoPage />
                    }
                ]
            },
            {
                path: 'tenistas',
                element: <TenistaHomePage />,
                children: [
                    {
                        path: 'novo',
                        element: <TenistaNovoPage />
                    },
                    {
                        path: 'alteracao/:id',
                        element: <TenistaAlteracaoPage />
                    },
                    {
                        path: 'detalhe/:id',
                        element: <TenistaDetalhePage />
                    },
                    {
                        path: 'pesquisa',
                        element: <TenistaConsultaPage />
                    },
                    {
                        path: 'exclusao/:id',
                        element: <TenistaExclusaoPage />
                    }
                ]
            },
            {
                path: 'rankings',
                element: <RankingHomePage />
            }
        ]
    }
];

export default routes;