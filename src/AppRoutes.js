import React from 'react';
import TopRanked from './components/TopRanked/TopRanked';
import SignIn from './components/signin/signin';
import SignUp from './components/RegisterForm/RegisterForm';
import Portf from './components/Portf/Portf';
import SymbolInfo from './components/SymbolInfo/SymbolInfo';
import GenerateAiScore from './components/GenerateAiScore/GenerateAiScore';
import  StockData from './components/teststockinfo/teststockinfo';
const AppRoutes = [
  {
    path: '/topstocks',
    element: <TopRanked />,
    sidebar: true // This route should have a sidebar
  },
  {
    path: '/signin',
    element: <SignIn />,
    sidebar: false // This route should not have a sidebar
  },
  {
    path: '/register',
    element: <SignUp />,
    sidebar: false // This route should not have a sidebar
  },
  {
    
    path: '/portf',
    element: <Portf />,
    sidebar: false
  },
  {
    path: '/symbolinfo',
    element: <SymbolInfo />,
    sidebar: true
  },
  {
    path: '/generateAiReport',
    element: <GenerateAiScore />,
    sidebar: true
  },
  {
    path: '/Teststockinfo',
    element: <StockData />,
    sidebar: true
  }
  // Add other routes as needed
];

export default AppRoutes;
