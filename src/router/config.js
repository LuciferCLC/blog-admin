import { lazy } from 'react';
import {
  HomeOutlined,
  ProjectOutlined,
  BarsOutlined,
  EditOutlined,
  MessageOutlined,
  TagsOutlined,
  FireOutlined,
  LinkOutlined,
  SettingOutlined
} from '@ant-design/icons';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ArticlesList = lazy(() => import('@/pages/ArticleList'));
const ArticlesRelease = lazy(() => import('@/pages/ArticleRelease'));
const Comments = lazy(() => import('@/pages/Comments'));
const Heros = lazy(() => import('@/pages/Heros'));
const Links = lazy(() => import('@/pages/Links'));
const Tags = lazy(() => import('@/pages/Tags'));
const Set = lazy(() => import('@/pages/Settings'));

export const Menus = [
  {
    path: '/dashboard',
    title: 'Home',
    icon: HomeOutlined,
    component: Dashboard
  },
  {
    path: '/article',
    title: 'Articles',
    icon: ProjectOutlined,
    subMenu: [
      {
        path: '/article/list',
        title: 'List',
        icon: BarsOutlined,
        component: ArticlesList
      },
      {
        path: '/article/release',
        title: 'Edit',
        icon: EditOutlined,
        component: ArticlesRelease
      }
    ]
  },
  {
    path: '/comment',
    title: 'Comment',
    icon: MessageOutlined,
    component: Comments
  },
  {
    path: '/tag',
    title: 'Tags',
    icon: TagsOutlined,
    component: Tags
  },
  {
    path: '/heros',
    title: 'Heros',
    icon: FireOutlined,
    component: Heros
  },
  {
    path: '/links',
    title: 'Links',
    icon: LinkOutlined,
    component: Links
  },
  {
    path: '/settings',
    title: 'settings',
    icon: SettingOutlined,
    component: Set,
    redirect: '/settings/options'
  }
];
