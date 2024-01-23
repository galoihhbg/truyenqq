import config from '../config'
import { DefaultLayout, ChapterLayout } from "../Layouts";
import Following from "../pages/Following";
import Home from "../pages/Home";
import Genre from '../pages/Genre';
import Manga from '../pages/Manga';
import Chapter from '../pages/Chapter';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout
    },
    {
        path: config.routes.following,
        component: Following,
        layout: DefaultLayout
    },
    {
        path: config.routes.genre,
        component: Genre,
        layout: DefaultLayout
    },
    {
        path: config.routes.manga,
        component: Manga,
        layout: DefaultLayout
    },
    {
        path: config.routes.chapter,
        component: Chapter,
        layout: ChapterLayout
    }
]

const privateRoutes = []

export {publicRoutes, privateRoutes};