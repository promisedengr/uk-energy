/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';

import TheTasks from './components/task-resources/TheTasks.vue';
//import AddTask from './components/task-resources/AddTask.vue';
// import NotFound from './components/task-resources/NotFound.vue';
const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TheTasks },
    ]
});
export default router;
