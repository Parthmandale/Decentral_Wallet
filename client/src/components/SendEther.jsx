import { useState } from "react";

function SendEther({ WEB3, Account }) {
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);

  const sendEther = async (event) => {
    event.preventDefault();
    // const _from = document.querySelector("#from");
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");
    const weiValue = WEB3.utils.toWei(_value.value, "ether");
    WEB3.eth
      .sendTransaction({
        from: Account, //_from.value,
        to: _to.value,
        value: weiValue,
      })
      .then(function (receipt) {
        setReceipt(receipt); 
        setToggle(true);
      });
  };
  return (
    <>
    <form className="box" onSubmit={sendEther}>
      <p className="label">
        <label htmlFor="">Enter Receiver's Address</label>
        <input className="receiver" type="text" id="to"></input>
      </p>

      <p className="label">
        <label htmlFor="">Enter Amount to Send (Ether)</label>
        <input className="receiver" type="text" id="value"></input>
      </p>
      <button className="btn" type="submit">
        Send
      </button>
    </form>
    <div className="box">
    <pre className="json">
      <h3>JSON Response</h3>
        <code>
          {toggle &&
            JSON.stringify(
              receipt,
              ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
              2
            )}
        </code>
      </pre>
    </div>
  </>
  );
}

export default SendEther;