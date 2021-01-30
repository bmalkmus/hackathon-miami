import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {USERS_ADDRESS, USERS_ABI, COLLECTIONS_ADDRESS, COLLECTIONS_ABI} from './config';
import MainView from './components/mainView/index'
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [userContracts, setUserContract] = useState(null);
  const [loaded, setLoad] = useState(false);
  const [users, setUsers] = useState([])
  const [userCount, setUserCount]=useState(0)
  const [collectionsCount, setCollCount]=useState(0);
  const [collectionContract, setCollContract]=useState();
  const [collect, setCollect] = useState();

  async function loadData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts();
    await setAccount(accounts[0]);
    const usersList= new web3.eth.Contract(USERS_ABI, USERS_ADDRESS);
    setUserContract(usersList);
    const userCount = await usersList.methods.getUserCount().call()
    await setUserCount(userCount)
    let tempUser =[];
    for (let i = 1; i <= userCount; i++){
      const user = await usersList.methods.users(i).call()
      tempUser.push(user)
    }
    setUsers(tempUser)
    const CollectionsList = new web3.eth.Contract(COLLECTIONS_ABI, COLLECTIONS_ADDRESS);
    setCollContract(CollectionsList);
    const collectCount = await CollectionsList.methods.getCollectionCount.call();
    await setCollCount(collectCount);
    let tempColl = []
    for (let i = 1; i <= collectCount; i++){
      const coll = await CollectionsList.methods.Directory(i).call();
       tempColl.push(coll); 
    }
    setCollect(tempColl);
    setLoad(true);
  }

  useEffect(()=>{
    console.log("getting contract information")
    loadData()
  }, [])

  return (
    <div className="App">
      {loaded 
      ? <MainView/>
      : <div> Loading....</div>}
    </div>
  );
}

export default App;
