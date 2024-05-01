import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./NavigationBar.css"; // Import CSS file for custom styles

function App() {
  // GET all items
  //
  const Getcatalog = () => {
    // Define hooks
    const [oneProduct, setOneProduct] = useState([]);
    const [id, setId] = useState("");
    // useEffect to load catalog once HOOK id is modified
    useEffect(() => {
      if (id) {
        fetch(`http://localhost:8081/product/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Show one product :", data);
            setOneProduct([data]);
          });
      }
    }, [id]); // Fetch only when id changes
    // Define hooks
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // useEffect to load products when load page
    useEffect(() => {
      fetch("http://localhost:8081/listProducts")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show Catalog of Products :", data);
          setProducts(data);
        });
    }, []);
    return (
      <div>
        <Navigationbar />
        <div className="container mt-5">
          <h1>Welcome to SafeTrav</h1>
          <div className="row mt-3">
            {/* Show all products using map */}
            {products.map((el) => (
              <div key={el.id} className="col-6 mb-3">
                <div className="card">
                  <img
                    src={el.imageUrl}
                    className="card-img-top img-fluid"
                    style={{ maxWidth: "40%" }}
                    alt="product"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Title: {el.name}</h5>
                    <p className="card-text">Rating: {el.description}</p>
                    <p className="card-text">Price: {el.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <h2>Search Location by ID</h2>
            {oneProduct.map((el) => (
              <div key={el.id} className="col-6 mb-3">
                <div className="card">
                  <img
                    src={el.imageUrl}
                    className="card-img-top img-fluid"
                    style={{ maxWidth: "40%" }}
                    alt="product"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Title: {el.name}</h5>
                    <p className="card-text">Rating: {el.description}</p>
                    <p className="card-text">Price: {el.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Postcatalog = () => {
    // Define HOOKS
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      id: "",
      name: "",
      price: "",
      description: "",
      category: "",
      imageUrl: "",
    });

    // Function to add input in formData HOOK using operator ...
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newValue =
        name === "id" || name === "price" ? Number(value) : value; // Convert to number if name is 'id' or 'price'
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    };

    // Function to fetch backend for POST - it sends data in BODY
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.value);
      fetch("http://localhost:8081/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Item added successfully!");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message); // Display alert if there's an error
        });
    }; // end handleOnSubmit

    //return
    return (
      <div>
        <Navigationbar />
        <div className="container mt-5">
          <div className="row mt-3">
            {/* Form to input data */}
            <div className="col ms-3">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-4">Post a New Vacation</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Location Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Rating"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="imageUrl"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //navbar
  const Navigationbar = () => {
    const navigate = useNavigate();
    return (
      <div>
        <Navbar
          expand="lg"
          fluid
          style={{
            backgroundColor: "#FFB6C1",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Navbar.Brand href="/">
            <img
              src="https://github.com/LucasMiddlekauff/319-FinalProject/blob/main/img/Safe%20trav.png?raw=true"
              style={{ width: "50px", height: "auto" }}
            />
            SafeTrav
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/getcatalog")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/postcatalog")}>
                Post a new Vacation
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/putcatalog")}>
                Update Ratings
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/deletecatalog")}>
                Delete a Vacation
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  // Delete - Modify an item
  const Deletecatalog = () => {
    // Define HOOKS
    const [products, setProducts] = useState([
      {
        id: "",
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
      },
    ]);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [isConfirm, setIsConfirm] = useState();
    // useEffect to load catalog when load page
    useEffect(() => {
      fetch("http://localhost:8081/listProducts")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log("Load initial Catalog of Products in DELETE :", data);
        });
    }, []);
    // Function to review products like carousel
    function getOneByOneProductNext() {
      setIsConfirm(false);
      if (products.length > 0) {
        if (index === products.length - 1) setIndex(0);
        else setIndex(index + 1);
      }
    }

    function getOneByOneProductPrev() {
      setIsConfirm(false);
      if (products.length > 0) {
        if (index === 0) setIndex(products.length - 1);
        else setIndex(index - 1);
      }
    }

    // Delete de product by its id <- id is Hook
    const deleteOneProduct = (id) => {
      console.log("Product to delete :", id);
      fetch("http://localhost:8081/deleteProduct/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => {
          if (response.status != 200) {
            return response.json().then((errData) => {
              throw new Error(
                `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete a product completed : ", id);
          console.log(data);
          // reload products from the local products array
          const newProducts = products.filter((product) => product.id !== id);
          setProducts(newProducts);
          setIndex(0);
          // show alert
          if (data) {
            const key = Object.keys(data);
            const value = Object.values(data);
            alert(key + value);
          }
        })
        .catch((error) => {
          console.error("Error adding item:", error);
          alert("Error adding robot:" + error.message); // Display alert if there's an error
        });
      setIsConfirm(false);
    };
    // return
    return (
      <div>
        <Navigationbar />
        <div className="row mt-3">
          {/* Buttons to simulate carousel */}
          <div className="row mt-3" style={{ marginLeft: "10px" }}>
            {/* Buttons to simulate carousel */}
            <div className="col">
              <h3>Delete one Vacation:</h3>
              <button
                className="btn btn-primary me-2"
                onClick={getOneByOneProductPrev}
              >
                Prev
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={getOneByOneProductNext}
              >
                Next
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => setIsConfirm(true)}
              >
                Delete
              </button>

              {isConfirm && (
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteOneProduct(products[index].id)}
                >
                  Click to confirm delete
                </button>
              )}
            </div>
          </div>
          <div className="row mt-3" style={{ marginLeft: "10px" }}>
            {/* Show product properties, one by one */}
            <div className="col">
              <div key={products[index].id}>
                <img
                  src={products[index].imageUrl}
                  alt="Vacation"
                  width={500}
                />
                <br />
                Id: {products[index].id}
                <br />
                Title: {products[index].name}
                <br />
                Rating: {products[index].description}
                <br />
                Price: {products[index].price}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // PUT - modify the rating of an item
  const Putcatalog = () => {
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [oneProduct, setOneProduct] = useState([]);
    const [id, setId] = useState("");
    // useEffect to load catalog once HOOK id is modified
    useEffect(() => {
      if (id) {
        fetch(`http://localhost:8081/product/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Show one product :", data);
            setOneProduct([data]);
          });
      }
    }, [id]);

    const handlePriceUpdate = () => {
      // Prepare the request body
      const requestBody = {
        description: newPrice,
      };

      // Send PUT request to update the pric
      fetch(`http://localhost:8081/updateProduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          // if (!response.ok) {
          //   throw new Error("Failed to update price");
          // }
          return response.json();
        })
        .then((data) => {
          setMessage("Rating updated successfully");
          setOneProduct([data]);
          console.log("this is the updated data" + data);
          // Optionally, update local state or perform any other actions
        })
        .catch((error) => {
          setMessage("Error updating price: " + error.message);
        });
    };

    return (
      <div>
        <Navigationbar />
        <div className="container mt-5">
          <div className="row mt-3">
            <div>
              <h3>Update a Vacation Rating</h3>
            </div>
            {/* Display one product */}
            {oneProduct.map((el) => (
              <div key={el.id} className="col">
                <img src={el.imageUrl} alt="product" width={400} />
                <div>Title: {el.name}</div>
                <div>Rating: {el.description}</div>
                <div>Price: {el.price}</div>
              </div>
            ))}
          </div>
          <div className="row mt-3">
            {/* Input for ID and New Price */}
            <div className="col">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter New Rating"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handlePriceUpdate}>
                Update Rating
              </button>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const About = () => {
    const navigate = useNavigate();
    return (
      <div>
        <Navigationbar />
        <div className="container mt-5">
          <div className="row mt-3">
            <div className="col">
              <h3>Student Information</h3>
              <div>
                <p>Violet Middlekauff: lmidd@iastate.edu</p>
              </div>
              <div>
                <p>Claire Miller: claire03@iastate.edu</p>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <h3>Class Information</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  SE / ComS319 Construction of User Interfaces
                </li>
                <li className="list-group-item">Ali Jannesari</li>
                <li className="list-group-item">
                  <p>Replace with SafeTrav bio</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/getcatalog" element={<Getcatalog />} />
        <Route path="/postcatalog" element={<Postcatalog />} />
        <Route path="/putcatalog" element={<Putcatalog />} />
        <Route path="/deletecatalog" element={<Deletecatalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Getcatalog />} /> Default view
      </Routes>
    </Router>
  );
}
// App end
export default App;
