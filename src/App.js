import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {USERS_ADDRESS, USERS_ABI} from './contractConfigs/User-config.js';
import {COLLECTIONS_ADDRESS, COLLECTIONS_ABI} from './contractConfigs/Tags-configs.js';
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
    console.log(accounts, "accounts loaded");
    const usersList= new web3.eth.Contract(USERS_ABI, USERS_ADDRESS);
    setUserContract(usersList);
    const userCount = await usersList.methods.getUserCount().call()
    console.log(userCount, "user count")
    setUserCount(userCount)
    let tempUser =[];
    for (let i = 1; i <= userCount; i++){
      const user = await usersList.methods.userInfo(i).call()
      console.log(user, "user")
      tempUser.push(user)
    }
    setUsers(tempUser)
    const CollectionsList = new web3.eth.Contract(COLLECTIONS_ABI, COLLECTIONS_ADDRESS);
    setCollContract(CollectionsList);
    const collectCount = await CollectionsList.methods.getCollectionCount().call();
    console.log(collectCount, "Collectioncount")
    setCollCount(collectCount);
    let tempColl = []
    for (let i = 1; i <= collectCount; i++){
      const coll = await CollectionsList.methods.Directory(i).call();
       await tempColl.push(coll); 
    }
    setCollect(tempColl);
    setLoad(true);
    const UserAccount = await usersList.methods.Registry(accounts[0]).call();
    console.log(UserAccount,"NEW USER ACCOUNT")
  }

  useEffect(()=>{
    console.log("getting contract information")
    loadData()
  },[])

  const setNameBtn = (input, unique) => {
    if (!unique){
      alert("Sorry but this Set Name has already been taken")
    }
    else {
      setLoad(false);
      collectionContract.methods.CreateCollection(input).send({from: account})
      .once('receipt', (receipt) => {
        console.log(receipt)
        window.location.reload()
      })
    }
  }

  const setUserNameBtn = (input, unique) => {
    if (!unique){
      alert("Sorry but this UserName has already been taken")
    }
    else {
      userContracts.methods.AddUser(account, input).send({from:account})
      .once('receipt', (receipt) => {
        console.log("user added")
        window.location.reload()
      })
    }
  }


  return (
    <div className="App">
      {loaded 
      ? <MainView account ={account} setUserNameBtn={setUserNameBtn} tagContract={collectionContract} users={users} collection={collect} collectionsCount={collectionsCount} setNameBtn={setNameBtn}/>
      : <div> Loading....</div>}
    </div>
  );
}

export default App;
