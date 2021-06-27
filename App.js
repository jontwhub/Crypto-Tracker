import axios from 'axios'
import { useEffect, useState} from 'react'
import './App.css';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const[search, setSearch] = useState('')
  
  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res =>{
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="coin-app">
      <div className="jumbotron">
        <h1 style={{fontFamily:'sans-serif',color:'#444444',fontWeight:'bold',textAlign:'center'}} className="display-4">Crypto Currency World</h1>
        <form>
          <input style={{borderRadius:'15px',padding:'5px',marginLeft:'550px',marginTop:'20px',width:'400px'}} type="text" placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
         marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
      )
      })}
    </div>
  );
}

export default App;
