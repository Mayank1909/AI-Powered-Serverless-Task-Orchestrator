![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)
![Claude 3](https://img.shields.io/badge/Claude%203-D97757?style=for-the-badge&logo=anthropic&logoColor=white)
# AI-Powered Serverless Task Orchestrator 🪄

A sophisticated, cloud-native project management tool built with the **MERN** stack and **AWS Serverless** architecture. This application features an "AI Magic" engine that leverages **Generative AI** to transform high-level goals into structured, actionable sub-tasks.

---

## 🧠 Technical Architecture & System Design

### Infrastructure Overview
```mermaid
graph TD
    %% Define Styles
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b;
    classDef cloud fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100;
    classDef ai fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c;
    classDef storage fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#1b5e20;

    subgraph Frontend_Layer [Frontend - React.js]
        A[User UI] -->|Click AI Magic| B[Optimistic UI Update]
        B -->|REST API Post| C[API Gateway]
    end

    subgraph Security_Layer [Security & Auth]
        C -->|Validate Token| D[AWS Cognito]
        E[IAM Roles] -.->|Authorize| F[AWS Lambda]
    end

    subgraph Compute_Intelligence_Layer [Compute & AI]
        C -->|Trigger| F
        F -->|Invoke Model| G[Amazon Bedrock]
        G -->|Claude 3 Haiku| H[Task Decomposition]
        H -->|JSON Result| F
    end

    subgraph Data_Layer [Persistence]
        F -->|Save Task| I[(Amazon DynamoDB)]
    end

    F -->|Return Data| C
    C -->|Success Response| B

    %% Apply Styles
    class A,B frontend;
    class C,D,E cloud;
    class F,G,H ai;
    class I storage;
```
sequenceDiagram
    participant U as User (UI)
    participant L as Lambda (Node.js)
    participant B as Bedrock (Claude 3)
    participant D as DynamoDB

    U->>L: POST /decompose (Task Data)
    L->>B: InvokeModel (Claude 3 Haiku)
    B-->>L: AI Breakdown JSON
    L->>D: Update Task Record
    L-->>U: 200 OK (Display Sub-tasks)
