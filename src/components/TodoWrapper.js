import { useEffect, useState } from "react";

import Web3 from "web3";
import Web3Modal from "web3modal";

const TodoWrapper = () => {
  // States
  const [walletConnected, setWalletConnected] = useState(false);
  const [todoList, setTodoList] = useState([]);

  // Smart contract
  const SMART_CONTRACT_ADDRESS = "0xfCd08096a922358428f9a8750d7fC1F034878064";
  const SMART_CONTRACT_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "TaskCompleted",
      type: "event",
    },
    {
      inputs: [{ internalType: "string", name: "task", type: "string" }],
      name: "addTask",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "count",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      name: "deleteTask",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "list",
      outputs: [
        { internalType: "string", name: "task", type: "string" },
        { internalType: "bool", name: "isDeleted", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  // Functions
  useEffect(() => {
    if (walletConnected) {
      const fetchData = async () => {
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();
        const contract = new web3.eth.Contract(
          SMART_CONTRACT_ABI,
          SMART_CONTRACT_ADDRESS
        );
        contract.methods
          .count()
          .call()
          .then((resCount) => {
            let count = parseInt(resCount);
            for (let i = 0; i < count; i++) {
              contract.methods
                .list(i)
                .call()
                .then((todo) => {
                  setTodoList((prevTodoList) => {
                    return [...prevTodoList, todo];
                  });
                });
            }
          });
      };

      fetchData();
    }
  }, [walletConnected]);

  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      if (networkId === 5 || networkId === `${5}`) {
        setWalletConnected(true);
      } else {
        alert("Please change your network to Goerli test network");
      }
    } else {
      window.open(`https://metamask.app.link/dapp/${window.location.href}`);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (walletConnected) {
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable();

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const contract = new web3.eth.Contract(
        SMART_CONTRACT_ABI,
        SMART_CONTRACT_ADDRESS
      );

      const taskValue = e.target.task.value;

      e.target.task.value = "";

      contract.methods
        .addTask(taskValue)
        .send({
          gas: "300000",
          from: account,
        })
        .then(() => {
          setTodoList((prevTodoList) => {
            return [
              ...prevTodoList,
              {
                task: taskValue,
                isDeleted: false,
              },
            ];
          });

          alert("Task added");
        });
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>IOT Data in Blockchain</h1>

      {!walletConnected && (
        <div className="connect-wallet">
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        </div>
      )}

      {walletConnected && (
        <>
          <form onSubmit={addTask} className="TodoForm">
            <input
              type="text"
              name="task"
              className="todo-input"
              placeholder="Input your task here..."
              required
            />

            <button type="submit" className="todo-btn">
              Add
            </button>
          </form>

          <div className="data-list-container">
            {todoList.map((todo, index) => {
              return (
                <div key={index} className="data-list">
                  <a href="https://goerli.etherscan.io/address/0xfcd08096a922358428f9a8750d7fc1f034878064" target="_blank">
                  <div className="data">
                    <p>{todo.task}</p>
                  </div>
                  </a>
                 
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoWrapper;
