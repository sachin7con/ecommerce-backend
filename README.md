# E-Commerce Platform — Core Transactional Backend

A secure, scalable production API engine engineered to handle high-integrity checkout workflows, inventory management, token-based authentication loops, and payment gate integrations. This backend serves as the centralized business-logic layer for the E-Commerce ecosystem.

* **Looking for the UI Client?** [👉 Access the Frontend Repository Here](https://github.com/sachin7con/ecommerce-frontend)
* **Backend API Base Engine:** [👉 Live Production API Base](https://ecommerce-backend-oc9b.onrender.com/api)

---

## 🛠️ Tech Stack & Architecture

* **Runtime Environment:** **Node.js** engineered with the **Express.js** minimal framework for structured HTTP routing.
* **Database Pipeline:** **MongoDB via Mongoose ORM** implementing schema validations, indexing optimizations, and deep data population models.
* **Security & Session Layer:** Stateless **JSON Web Tokens (JWT)** for session validation alongside password hashing mechanisms via **bcrypt**.
* **Payment Architecture:** Integrated **Razorpay API / Stripe SDK** processing asynchronous webhook validation cycles for absolute payment integrity.

---

## 💡 Core Engineering Challenges Solved

### 1. High-Integrity Order State Transactions
* **The Challenge:** Preventing order generation drift, phantom inventory deductions, and malicious price manipulation on checkout request payloads.
* **The Implementation:** Implemented a zero-trust pricing validation pipeline. The backend drops all incoming client-side product price metadata, fetches raw inventory valuation records directly from the database cluster, computes balances strictly on the server layer, and seals state changes using transactional integrity guards.

### 2. Double-Token Stateless Security Routing
* **The Challenge:** Hardening the application against cross-site scripting (XSS) and token extraction while keeping user sessions seamlessly persistent.
* **The Implementation:** Deployed a short-lived **Access Token** framework sent via strict Bearer authorization headers, backed by a cryptographically signed **Refresh Token** tracking mechanism stored exclusively within highly restrictive **HttpOnly cookies**. This approach effectively isolates critical session assets from frontend client-side scripts.

### 3. Asynchronous Webhook Payment Handshaking
* **The Challenge:** Managing dropped orders or incomplete transactions when buyers accidentally close their browsers midway through payment processing gateways.
* **The Implementation:** Structured isolated webhook listeners checking cryptographic request signatures from the payment server. When a successful payment payload triggers asynchronously, background operations independently match checkout logs against database transaction state tables to systematically fulfill order items without direct client reliance.

---

## ⚙️ Local Development Setup

Clone the server workspace:
```bash
git clone https://github.com
cd ecommerce-backend
```

1. Install server ecosystem dependencies:
```bash
npm install
```

2. Configure your server-side environment matrix `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_cluster_connection_string
JWT_SECRET=your_cryptographic_access_token_secret
JWT_REFRESH_SECRET=your_cryptographic_refresh_token_secret
RAZORPAY_KEY_ID=your_payment_gateway_key_id
RAZORPAY_KEY_SECRET=your_payment_gateway_secret_string
```

3. Spin up the Node API application cluster:
```bash
npm start
```
