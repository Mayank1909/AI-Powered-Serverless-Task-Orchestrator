# AI-Powered Serverless Task Orchestrator 🪄

A sophisticated, cloud-native project management tool built with the **MERN** stack and **AWS Serverless** architecture. This application features an "AI Magic" engine that leverages **Generative AI** to transform high-level goals into structured, actionable sub-tasks.



---

## 🧠 Technical Architecture & System Design

The application follows a **Decoupled, Event-Driven Architecture** designed for high availability, security, and minimal operational overhead.

### Infrastructure Overview

1.  **Client Layer:** A React-based SPA utilizing **Optimistic UI** patterns to mask network latency and provide a seamless user experience.
2.  **API Proxy Layer:** **Amazon API Gateway** handles request routing, throttling, and CORS preflight (`OPTIONS`) handshakes.
3.  **Compute Layer:** **AWS Lambda** (Node.js 20.x) orchestrates the business logic, transforming user input into optimized LLM prompts.
4.  **Intelligence Layer:** **Amazon Bedrock** provides a managed interface for **Anthropic Claude 3 Haiku**, enabling low-latency, cost-effective task decomposition.
5.  **Data Layer:** **Amazon DynamoDB** provides single-digit millisecond latency for data persistence, utilizing **AWS Cognito** sub-IDs for strict multi-tenant data isolation.

### AI Implementation Details
* **Model:** `anthropic.claude-3-haiku-20240307-v1:0`
* **Configuration:** * `Temperature: 0.2` (Prioritizing logical consistency over creativity)
    * `Max Tokens: 300` (Cost-optimized for utility-based output)
* **Security:** Governed by **IAM Least-Privilege Policies**, granting the compute layer specific `bedrock:InvokeModel` permissions.

---

## 🛠️ Challenges Overcome

* **CORS Preflight Resolution:** Engineered custom middleware logic within AWS Lambda to handle `OPTIONS` requests, resolving browser-level cross-origin blocks.
* **IAM & Marketplace Integration:** Navigated AWS Marketplace subscription dependencies to authorize service-role access to Foundation Models.
* **Optimistic Updates:** Implemented React state synchronization to ensure the UI remains responsive while the AI generation processes in the background.

---

## 🚀 Local Setup & Installation

### Prerequisites
* AWS Account with **Amazon Bedrock** model access granted.
* Node.js (v18+) and npm installed.

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

### Configure Environment Variables:
2. **Create a .env file in the root directory:**


REACT_APP_BEDROCK_API_URL=[https://your-api-id.execute-api.us-east-1.amazonaws.com](https://your-api-id.execute-api.us-east-1.amazonaws.com)
Install Dependencies:

### Bash
npm install
Run the Application:

### Bash
npm start
🔮 Future Roadmap
[ ] Multi-Agent Orchestration: Integrate CrewAI for multi-step task research and autonomous planning.

[ ] Vector Search: Implement RAG (Retrieval-Augmented Generation) for project history using Amazon OpenSearch Serverless.

[ ] Mobile Support: Responsive design optimization for industrial tablet use cases in manufacturing environments.

📄 License
Distributed under the MIT License.
