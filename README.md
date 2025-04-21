# serverless-inventory-management-system

This project demonstrates how to build a clean and scalable full-stack **inventory management system** using **pure AWS serverless components**. With React on the frontend and Terraform on the backend, it’s cloud-native and production-ready.

## 📁 Project Architecture

![image](https://github.com/user-attachments/assets/a9689f50-eb14-4701-8eac-aadc1da690bd)



This project is a fully serverless full-stack **inventory management system** built using:

- **AWS Lambda** for serverless backend logic
- **Amazon API Gateway** for HTTP endpoints
- **Amazon DynamoDB** as the NoSQL database
- **React.js** for the frontend
- **Terraform** for infrastructure as code

---

## 🔧 Tech Stack

- **Frontend**: React.js (calls API Gateway endpoints)
- **Backend**: AWS Lambda (Python) + API Gateway
- **Database**: Amazon DynamoDB
- **Infrastructure**: Terraform
- **API Testing**: Postman

---
**Deploying the Backend with Terraform**

Terraform enables infrastructure as code, making deployment consistent and repeatable. Here's a step-by-step guide to deploying the backend infrastructure:

**1. Clone the Repository**
First, clone the project repository containing the Terraform configuration:

```bash
git clone https://github.com/OjoOluwagbenga700/serverless-inventory-management-system.git
cd backend/terraform

```
**2. Initialize Terraform**

Initialize the Terraform working directory:


```bash
terraform init
```

This command downloads the necessary provider plugins and sets up the backend configuration.

**3. Review the Execution Plan**
Generate and review the execution plan:


```bash
terraform plan 
```
This shows you what resources will be created, modified, or destroyed.

**4. Apply the Configuration**
Apply the Terraform configuration to provision the infrastructure:

```bash
terraform apply --auto-approve
```

**Terraform will create all the necessary AWS resources:**

- DynamoDB tables
- IAM roles and policies
- Lambda functions
- API Gateway endpoints
- CloudWatch log groups

**5. Verify Deployment**

After successful application, Terraform will output the API Gateway endpoint URL

![image](https://github.com/user-attachments/assets/2b5d227e-30a1-4802-97c8-8e54820db146)




```bash
api_gateway_url = "https://i5mmj6bhw1.execute-api.us-east-1.amazonaws.com"

```

**6. Update Frontend Configuration**
Use the output values to update your frontend environment configuration.

```jsx
// src/services/api.js
// API Gateway integration layer

const API_ENDPOINT = 'https://i5mmj6bhw1.execute-api.us-east-1.amazonaws.com';

// Fetch all inventory items
export async function fetchItems() {
  try {
    const response = await fetch(`${API_ENDPOINT}/items`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

```
**7. Run frontend Application**

Navigate to the frontend directory 

```bash
cd frontend/inventory-management-system
```
Run the following npm commands

```bash
npm install
npm start
```

![image](https://github.com/user-attachments/assets/5f01749f-653e-4ea4-8f17-660fee954358)



![image](https://github.com/user-attachments/assets/9ed71285-79d0-46ed-bfba-618fdda9dc48)




**Conclusion**

By leveraging AWS serverless technologies, React, and Terraform, businesses can implement a powerful inventory management system that scales with their needs while minimizing operational overhead. This cloud-native approach provides the flexibility to adapt quickly to changing business requirements while maintaining robust security and performance.
Feel free to clone, fork, or build on top of it!
