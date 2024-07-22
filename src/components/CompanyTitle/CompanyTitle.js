import React from 'react'

///// nheb el composant hedha yestamlouh bech yebda esm el societe w log 
    const CompanyTitle = () => {
        const { tickerName } = useParams();
        const [companyName, setCompanyName] = useState('');
      
        useEffect(() => {
          const apiKey = 'FFTZ06W4JZ6C7ZDS';
          const fetchCompanyName = async () => {
            try {
              const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerName}&apikey=${apiKey}`);
              setCompanyName(response.data.Name);
            } catch (error) {
              console.error('Failed to fetch company name:', error);
            }
          };
      
          fetchCompanyName();
        }, [tickerName]);
  return (
    <div>
           {companyName} ({tickerName}) Statistics & Alternative Data 2024

    </div>
  )
}

export default CompanyTitle
