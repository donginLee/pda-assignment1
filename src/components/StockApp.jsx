import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

export default function StockApp() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    async function getStockData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/data/stock.json"
        );
        console.log(data);
        setStockData(data);
      } catch (error) {
        console.log("Error fetching stock data:", error);
      }
    }

    getStockData();
  }, []);

  return (
    <div style={{ width: "50%", height: "100%", margin: "10px" }}>
      <h2>STOCK</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종가</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <tr key={index}>
              <td>{stock.date}</td>
              <td>{stock.tradePrice}</td>
              <td>{stock.openingPrice}</td>
              <td>{stock.highPrice}</td>
              <td>{stock.lowPrice}</td>
              <td>{stock.candleAccTradePrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
