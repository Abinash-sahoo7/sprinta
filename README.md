# Sprinta - Project Management Application

Sprinta is a modern, full-stack project management application built with Next.js, TypeScript, and Prisma. It provides teams with powerful tools to manage projects, tasks, and team collaboration in one place.

## 🏗️ Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  AWS Amplify    │────▶│  API Gateway    │────▶│  EC2 Instance   │
│  (Frontend)     │     │                 │     │  (Backend)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                            │
                                                            ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Amazon Cognito  │     │  Amazon RDS     │     │  Amazon S3      │
│  (Auth)         │     │  (PostgreSQL)   │     │  (Storage)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🌟 Features

- **Project Management**: Create, view, and manage projects with ease
- **Task Tracking**: Track tasks across different statuses (To Do, In Progress, Completed, Under Review)
- **Multiple Views**: View your projects in different layouts (Board, List, Table, Timeline)
- **Team Collaboration**: Manage team members and their roles
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in dark theme for comfortable viewing

## 🚀 Tech Stack

### Frontend (AWS Amplify)

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript
- **UI Components**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Drag & Drop**: React DnD
- **Form Handling**: React Hook Form

### Backend (EC2)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Server**: AWS EC2 (t3.medium recommended)
- **Process Manager**: PM2

### Database (Amazon RDS)

- **Engine**: PostgreSQL
- **Instance**: db.t3.micro (free tier eligible)
- **Storage**: 20GB GP2 (scalable)

### Storage (Amazon S3)

- **Purpose**: File and media storage
- **Features**: Versioning enabled
- **Access**: Private by default, signed URLs for access

### Authentication (Amazon Cognito)

- **User Pools**: For user registration and sign-in
- **Identity Pools**: For AWS service access
- **Social Logins**: Google, Facebook, etc.

### API (Amazon API Gateway)

- **Type**: REST API
- **Security**: IAM authentication
- **Throttling**: Rate limiting enabled
- **Caching**: API response caching

## 🛠️ Prerequisites

### Local Development

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL (for local development)

### AWS Account Requirements

- AWS Account with appropriate permissions
- IAM User with AdministratorAccess
- AWS CLI configured with access keys

### AWS Services Required

- AWS Amplify (Frontend Hosting)
- Amazon EC2 (Backend Server)
- Amazon RDS (PostgreSQL Database)
- Amazon S3 (File Storage)
- Amazon Cognito (Authentication)
- Amazon API Gateway (API Management)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd careplus
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Set up environment variables

Create a `.env` file in both `client` and `server` directories with the required environment variables.

#### Client (.env)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
# Add your AWS Amplify configuration here
```

#### Server (.env)

```
DATABASE_URL="postgresql://user:password@localhost:5432/careplus?schema=public"
PORT=5000
# Add other environment variables as needed
```

### 4. Set up the database

```bash
# Navigate to server directory
cd server

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed
```

### 5. Start the development servers

#### Start the backend server

```bash
# From the server directory
npm run dev
```

#### Start the frontend development server

```bash
# From the client directory
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Production Build

To create a production build:

```bash
# Build the client
cd client
npm run build

# Build the server
cd ../server
npm run build

# Start the production server
npm start
```

## 🌐 Live Demo

Check out the live demo of Sprinta:
[Sprinta Live Demo](https://master.d99sl325ybzvd.amplifyapp.com/)

## ☁️ AWS Deployment Guide

### 1. Frontend Deployment with AWS Amplify

1. **Initialize Amplify Project**

   ```bash
   cd client
   amplify init
   ```

2. **Add Hosting**

   ```bash
   amplify add hosting
   ```

   Select "Hosting with Amplify Console" and follow the prompts

3. **Deploy**
   ```bash
   amplify publish
   ```

### 2. Backend Deployment on EC2

1. **Launch EC2 Instance**
   - AMI: Amazon Linux 2
   - Instance Type: t3.medium
   - Security Group: Open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000 (API)
   - IAM Role: EC2 access to S3, RDS, and other required services

2. **Connect to EC2 and Set Up**

   ```bash
   # Install Node.js and PM2
   curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs
   sudo npm install -g pm2

   # Install Nginx
   sudo amazon-linux-extras install nginx1 -y

   # Install PostgreSQL client
   sudo amazon-linux-extras enable postgresql14
   sudo yum install -y postgresql
   ```

3. **Deploy Backend Code**

   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd sprinta/server

   # Install dependencies
   npm install

   # Build the project
   npm run build

   # Start the server with PM2
   pm2 start dist/index.js --name "sprinta-api"
   pm2 save
   pm2 startup
   ```

### 3. Database Setup with Amazon RDS

1. **Create RDS Instance**
   - Engine: PostgreSQL
   - Version: 14 or later
   - Instance Class: db.t3.micro (free tier eligible)
   - Storage: 20GB (scalable)
   - Security Group: Allow EC2 security group
   - Backup: Enable automated backups

2. **Connect and Migrate**

   ```bash
   # Set environment variables
   export DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/dbname?schema=public"

   # Run migrations
   npx prisma migrate deploy

   # Seed initial data
   npx prisma db seed
   ```

### 4. File Storage with Amazon S3

1. **Create S3 Bucket**
   - Bucket name: `sprinta-files-<random-string>`
   - Region: Same as your other resources
   - Block all public access: Yes
   - Versioning: Enabled

2. **Configure CORS**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": []
     }
   ]
   ```

### 5. Authentication with Amazon Cognito

1. **Create User Pool**
   - Pool name: `sprinta-users`
   - Attributes: Email, Username
   - Password policy: 8+ chars, requires numbers and special chars
   - MFA: Optional
   - App client: Generate client secret

2. **Configure App Client**
   - Allowed OAuth Flows: Authorization code grant
   - Callback URLs: Your frontend URLs
   - Sign out URLs: Your frontend URLs
   - Identity providers: Configure as needed

### 6. API Gateway Configuration

1. **Create REST API**
   - Name: `sprinta-api`
   - Endpoint Type: Regional
   - API Key: Required

2. **Set Up Resources and Methods**
   - Create resources matching your API routes
   - Set up CORS for each resource
   - Configure method request/response

3. **Deploy API**
   - Create new stage (e.g., `prod`)
   - Enable CloudWatch logging
   - Set up throttling and quotas

### 7. Environment Variables

Create a `.env` file on your EC2 instance:

```env
# Database
DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/dbname?schema=public"

# AWS
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# S3
S3_BUCKET_NAME=your-bucket-name
S3_REGION=your-region

# Cognito
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_CLIENT_ID=your-client-id

# API Gateway
API_BASE_URL=https://your-api-gateway-url.com/prod

# JWT
JWT_SECRET=your-jwt-secret
```

### 8. Monitoring and Maintenance

1. **Set Up CloudWatch Alarms**
   - CPU utilization > 80%
   - Memory usage > 80%
   - Disk space < 20%

2. **Enable Logging**
   - EC2 system logs
   - Application logs
   - API Gateway access logs

3. **Backup Strategy**
   - RDS automated backups
   - S3 versioning
   - Regular database dumps

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries, please reach out to the project maintainers.

<!-- Below is the Docker local commands  -->

# Start all services

docker-compose up -d

# View logs

docker-compose logs -f

# Stop all services

docker-compose down

# Rebuild and start

docker-compose up -d --build

# Stop and remove volumes (clean slate)

docker-compose down -v
