import React from 'react';
import TopRanked from './components/TopRanked/TopRanked';
import SignIn from './components/signin/signin';
import SignUp from './components/RegisterForm/RegisterForm';
import StockData from './components/teststockinfo/teststockinfo';
import CompanyInfo from './components/teststockinfo/teststockinfo';
import TechnicalIndicator from './components/TechnicalIndicator/TechnicalIndicator';
import App from './components/InformationStock/InformationStock';
import PageStocks from './components/PageStocks/PageStocks';
import TickerInfo from './components/APropos/APropos';
import WatchList from './components/WatchList/WatchList';
import Accueil from './components/Accueil/Accueil';
import StockPrice from './components/Realprice/RealPrice';
import AccueilG from './components/AccueilG/AccueilG';
import WebSocketComponent from './components/RealTime/RealTime';
import MarketTrends from './components/Accueil/Accueil';
import  PortfeuilleConsultation from './components/PortefeuilleConsultation/PortefeuilleConsultation';
import Financials from './components/Financials/Financials';
import  PageStocksTechnical from './components/PageStocksTechnical/PageStocksTechnical';
import ForecastPage from './components/PageStocksForecast/PageStocksForecast';
const AppRoutes = [
  {

    path: '/technicals/:tickerName',
    element: < PageStocksTechnical />,
    sidebar: true,
    showAppBar: true
  },

  {

    path: '/financials/:tickerName',
    element: <Financials />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/topstocks',
    element: <TopRanked />,
    sidebar: true,
    showAppBar: true
    
  },
  {
    path: '/signin',
    element: <SignIn />,
    sidebar: false,       // No sidebar on the sign-in page
    showAppBar: true,     // Show the AppBar (without the search bar)
    SearchAppBar:true
  },
  
  {
    path: '/register',
    element: <SignUp />,
    sidebar: false,
    showAppBar: true
  },

  {
    path: '/Teststockinfo',
    element: <StockData />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/companyinfo',
    element: <CompanyInfo />,
    sidebar: true,
    showAppBar: true
  },
  
  {
    path: '/stock/:tickerName/technicalanalysis',
    element: <TechnicalIndicator />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/stock/:tickerName/priceprediction',
    element: <App />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/overview/:tickerName',
    element: <PageStocks />,
    sidebar: true,
    showAppBar: true
  },

  {
    path: '/TickerInfo/:tickerName/:tickerName',
    element: <TickerInfo />,
    sidebar: false,
    showAppBar: false
  },
  {
    path: '/Forecast/:tickerName',
    element: <ForecastPage/>,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/watchlist',
    element: <WatchList />,
    sidebar: false,
    showAppBar: true
  },
  {
    path: '/tendancesdumarch',
    element: <Accueil />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/accueil',
    element: <AccueilG />,
    sidebar: true,
    showAppBar: true,
    SearchAppBar: true  // Show search bar on dashboard page

  },
  {
    path: '/StockPrice/:tickerName',
    element: <StockPrice />,
    sidebar: false,
    showAppBar: true
  },
  {
    path: '/RealTime/:tickerName',
    element: <WebSocketComponent />,
    sidebar: false,
    showAppBar: true
  },
  // Ajout des routes demandées
  {
    path: '/',
    element: <MarketTrends />,
    sidebar: false,
    showAppBar: true
  },
  {
    path: '/indices-boursiers',
    element: <MarketTrends />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/valeurs-les-plus-actives',
    element: <MarketTrends />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/actions-en-hausse',
    element: <MarketTrends />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/actions-en-baisse',
    element: <MarketTrends />,
    sidebar: true,
    showAppBar: true
  },
  {
    path: '/portefeuilles',
    element: <PortfeuilleConsultation />,
    sidebar: true,
    showAppBar: true
  },

];

export default AppRoutes;
