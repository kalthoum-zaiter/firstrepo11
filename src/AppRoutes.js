import React from 'react';
import TopRanked from './components/TopRanked/TopRanked';
import SignIn from './components/signin/signin';
import SignUp from './components/RegisterForm/RegisterForm';
import Portf from './components/Portf/Portf';
import SymbolInfo from './components/SymbolInfo/SymbolInfo';
import GenerateAiScore from './components/GenerateAiScore/GenerateAiScore';
import  StockData from './components/teststockinfo/teststockinfo';
import CompanyInfo from './components/teststockinfo/teststockinfo';
import StockTrend from './components/Vitrine/Vitrine';
import TechnicalIndicator from './components/TechnicalIndicator/TechnicalIndicator'
const AppRoutes = [
  {
    path: '/topstocks',
    element: <TopRanked />,
    sidebar: true 
  },
  {
    path: '/signin',
    element: <SignIn />,
    sidebar: false 
  },
  {
    path: '/register',
    element: <SignUp />,
    sidebar: false
  },
  {
    
    path: '/portf',
    element: <Portf />,
    sidebar: false
  },
  {//lezem nehiha overview 
    path: '/stock/:tickerName/overview',  
    element: <SymbolInfo />,
    sidebar: true
  },
  {
    path: '/stock/:tickerName/aistockanalysis',
    element: <GenerateAiScore />,
    sidebar: true
  },
  {
    path: '/Teststockinfo',
    element: <StockData />,
    sidebar: true
  },
  {
    path: '/companyinfo',
    element: <CompanyInfo />,
    sidebar: true
  },
  {
    path: '/stockTrend',
    element: <StockTrend/>,
    sidebar: true
  },
  {
    path:'/stock/:tickerName/technicalanalysis',
    element :<TechnicalIndicator/>,
    sidebar: true
  }
];

export default AppRoutes;
