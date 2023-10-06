import "./Main.css";
import { useEffect, useState } from "react";
function Accounts({ WEB3, SetAddress }) {
const [provider, setProvider] = useState("None" ); 
const [balance, setBalance] = useState("None" ); 
const [account, setAccount ] = useState("None" ); 
  useEffect(() => {
    const allAccounts = async () => {

      setProvider("Ganache"); 
      console.log(WEB3.eth.currentProvider.host);                                   
      var select = document.getElementById("selectNumber");    // just selecting the Select from return to create the option
      var options = await WEB3.eth.getAccounts();             // now here in options there will be stored all the accounts of ganache

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];  // account of ganache on perticular number
        
        var elem = document.createElement("option");  //is been created the option inside the select in return-> <option value=""></option>
        elem.textContent = opt;   //  showcase those value
        elem.value = opt;         //  showcase those value
        select.appendChild(elem); // append - edit, the current select var, in which the selectNumbber is been stored
      }
    };
    WEB3 && allAccounts();        // untill and unless this thing is not there, the function wont work
  }, [WEB3]);                     // WEB3 is dependencies as as it will only rerender while is being there

  const selectAccount = async () => {           // fun created here which sets the value to display of account secyted , its ether in it
    let selectedAccountAddress = document.getElementById("selectNumber").value;  // selected one's value is been taken
    if (selectedAccountAddress && selectedAccountAddress !==  "Select your account") {
      SetAddress(selectedAccountAddress);   // addtress stored
      let accountBalance = await WEB3.eth.getBalance(selectedAccountAddress);  // acoount balance is stored
      let accountBalanceEth = WEB3.utils.fromWei(accountBalance, "ether");     //  conversion
      setBalance(accountBalanceEth);         // storing value in the functioon of the useState 
      setAccount(selectedAccountAddress);    // storing value in the functioon of the useState 
    }
  
  };

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount} >   {/*Here the selectAccount function is being called
         where the every thing is set using useState like account, ballance , funct */}
        <option value="Select your account"></option>
        </select>
      </form>
      {/*  here the currennt value of uyseState is being passed  */}
      <p className="conAc">Connected Account: {account}</p>
      <br></br>
      <span className="acBal">Account Balance: {balance}</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
