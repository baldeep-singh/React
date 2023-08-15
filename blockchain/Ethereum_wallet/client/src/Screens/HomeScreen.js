import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Web3 from 'web3';

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = window.ethereum;
        try {
          await provider.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(provider);
          setWeb3(web3Instance);

          // Get the current wallet address
          const accounts = await web3Instance.eth.getAccounts();
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not detected.');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    // Fetch wallet balance
    const fetchBalance = async () => {
      if (web3 && walletAddress) {
        const balanceWei = await web3.eth.getBalance(walletAddress);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setWalletBalance(balanceEth);
      }
    };

    // Fetch transaction history
    const fetchTransactionHistory = async () => {
      if (web3 && walletAddress) {
        const filter = {
          fromBlock: 0,
          toBlock: 'latest',
          address: walletAddress,
        };

        const logs = await web3.eth.getPastLogs(filter);
        setTransactionHistory(logs);
      }
    };

    fetchBalance();
    fetchTransactionHistory();
  }, [web3, walletAddress]);

  return (
    <Container>
      <h1 className="text-center mt-4">Welcome to Your Ethereum Wallet Dashboard</h1>

      <Row className="mt-4">
        <Col md="6" className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="text-center">Your Wallet Balance</Card.Title>
              <p className="text-center">{walletBalance} ETH</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md="6" className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="text-center">Transaction History</Card.Title>
              <ul>
                {transactionHistory.map((transaction, index) => (
                  <li key={index}>
                    Transaction Hash: {transaction.transactionHash}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
    </Container>
  );
};

export default Home;
