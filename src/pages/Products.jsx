import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { AlertCircle, Plus } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ title: "", price: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ title: product.title, price: product.price });
    } else {
      setEditingProduct(null);
      setFormData({ title: "", price: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ title: "", price: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      setError("Please fill all fields");
      return;
    }

    if (editingProduct) {
      // Edit product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...formData }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    handleCloseModal();
    setError(null);
  };

  const handleDelete = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h2>Products</h2>
          <p style={{ color: "#666", margin: "0.5rem 0 0 0" }}>
            Manage and view all products in your inventory
          </p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c33",
            padding: "1rem",
            borderRadius: "6px",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="table-container">
        <div className="table-header">
          <h3>Product List ({products.length})</h3>
        </div>
        <Table
          columns={["id", "title", "price"]}
          data={products}
          isLoading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Product Name</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              step="0.01"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCloseModal}
              style={{
                background: "#ccc",
                color: "#333",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: 0 }}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;
