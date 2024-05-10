import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [accountBalance, setAccountBalance] = useState("");

  const [inputAmount, setInputAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState("day");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch account balance
  useEffect(() => {
    fetchAccountBalance();
    fetchProducts();
  }, []);

  const fetchAccountBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getAccountBalance",
        {
          params: { email: localStorage.getItem("rememberedEmail") },
        }
      );
      setAccountBalance(response.data.accountBalance);
      setInputAmount("");
    } catch (error) {
      console.log("Error fetching account balance: ", error);
    }
  };

  // Handle input amount change
  const handleAmountChange = (e) => {
    setInputAmount(e.target.value);
  };

  const filterfc = (e) => {
    const flval = document.getElementById("filtertab").value;
    alert(flval);
    setFilter(flval);
  };

  // Handle adding money
  const handleAddMoney = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addMoney", {
        email: localStorage.getItem("rememberedEmail"),
        accountBalance: inputAmount,
      });
      setAccountBalance(response.data.accountBalance);
      setInputAmount("");
      toast.success("Money Added successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:", error);
    }
  };

  // Add products Item
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name === "productName") {
      setProductName(value);
    } else if (name === "productAmount") {
      setProductAmount(value);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/addProduct", {
        email: localStorage.getItem("rememberedEmail"),
        productName,
        productAmount,
      });
      if (response.status === 422) {
        toast.error("Error high price:");
      } else {
        setProducts([...products, response.data.newProduct]);
        setAccountBalance(response.data.balancemoney);
        toast.success("Product added successfully");
        setProductName("");
        setProductAmount("");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // toast.error("Error adding product:", error);
      toast.error("Error high price:");
    }
  };


  // fetch the products
  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getProducts", {
        email: localStorage.getItem("rememberedEmail"),
      });
      // setProducts(response.data);
      setProducts(response.data.products);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  
  // Get the first letter of the user's email
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  const firstLetter = rememberedEmail
    ? rememberedEmail.charAt(0).toUpperCase()
    : "";

  return (
    <div className="Signup_main1">
      <div className="login_container1">
        <div className="navbar">
          <h1>Pocket Saving</h1>
          <div className="user-name">
            <h2>{firstLetter}</h2>
          </div>
        </div>

        <div className="account_saving">
          <h2>Account Balance</h2>
          <div className="amount">
            <h2>{accountBalance}</h2>
            <input
              type="number"
              placeholder="enter your money"
              value={inputAmount}
              onChange={handleAmountChange}
            />
            <button onClick={handleAddMoney}>Submit</button>
            <i className="fa-solid fa-pen"></i>
          </div>

          <div className="products_items">
            <input
              type="text"
              name="productName"
              placeholder="Enter Your product name"
              value={productName}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="productAmount"
              placeholder="Enter Your product amount"
              value={productAmount}
              onChange={handleProductChange}
            />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>

          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <span>{product.productName}</span>
                <span>{product.productAmount}</span>
              </li>
            ))}
          </ul>
          <div className="today">
  <h1>Total</h1>
  <p>{totalAmount}</p>
</div>

          <select id="filtertab" onChange={filterfc}>
            <option value={"day"}>day</option>
            <option value={"week"}>week</option>
            <option value={"month"}>month</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Home;
