# Assignment: Build an AI Job Description Generator

## 1. Objective

Build a web application that uses an AI API to automatically generate a Job Description (JD) based on information provided by the user.

Students will practice:

- Designing input forms
- Integrating AI APIs
- Processing user input
- Displaying structured AI-generated results
- Designing backend APIs
- Prompt engineering

---

## 2. Business Scenario

The HR department of a company spends significant time creating Job Descriptions for new hiring requests.

To improve efficiency, the company wants to develop an AI-powered tool that generates professional Job Descriptions from a small set of recruitment inputs.

---

## 3. Functional Requirements

### Feature 1: Enter Recruitment Information

The user must provide the following information:

| Field | Required |
|---------|---------|
| Job Title | Yes |
| Department | Yes |
| Experience Level | Yes |
| Employment Type | Yes |
| Location | Yes |
| Company Name | Yes |
| Company Description | Yes |
| Required Skills | Yes |
| Benefits | No |

Example:

```text
Job Title: Backend Developer

Department: Engineering

Experience Level: Senior

Employment Type: Full-time

Location: Ho Chi Minh City

Company Name: ABC Software

Company Description:
ABC Software develops SaaS products for enterprise customers.

Required Skills:
NodeJS, PostgreSQL, AWS, Docker

Benefits:
Health Insurance, Remote Working
```

---

### Feature 2: Generate Job Description Using AI

When the user clicks:

```text
Generate Job Description
```

The system must call an AI API to generate a Job Description.

---

### Feature 3: Display Generated Result

The generated Job Description must contain the following sections:

#### About Company

A short company introduction.

#### Job Summary

A high-level overview of the position.

#### Responsibilities

At least 5 responsibilities.

#### Requirements

At least 5 requirements.

#### Nice-to-Have Skills

At least 3 optional skills.

#### Benefits

A list of employee benefits.

---

### Feature 4: Copy Result

The user can click:

```text
Copy Job Description
```

to copy the generated Job Description to the clipboard.

---

## 4. AI Requirements

Students must design prompts that instruct the AI to return structured JSON output.

Example:

```json
{
  "jobTitle": "Backend Developer",
  "jobSummary": "...",
  "responsibilities": [
    "...",
    "..."
  ],
  "requirements": [
    "...",
    "..."
  ],
  "niceToHave": [
    "...",
    "..."
  ],
  "benefits": [
    "...",
    "..."
  ]
}
```

Free-text responses are not acceptable.

---

## 5. Technical Requirements

### Frontend

Use one of the following:

- ReactJS
- Angular
- VueJS

### Backend

Use one of the following:

- Node.js
- Java Spring Boot
- .NET Core

### AI Service

Integrate one of the following AI APIs:

- OpenAI API
- Gemini API
- Claude API

---

## 6. Process Flow

```text
User Input
     ↓
Frontend Form
     ↓
Backend API
     ↓
AI API
     ↓
JSON Response
     ↓
Frontend Display
```

---

## 7. Expected Output Example

```text
Senior Backend Developer

About Company
ABC Software is a SaaS company serving enterprise customers.

Job Summary
We are seeking a Senior Backend Developer...

Responsibilities
- Design backend services
- Build REST APIs
- Optimize databases
- Collaborate with frontend teams
- Mentor junior developers

Requirements
- 5+ years experience
- Strong NodeJS knowledge
- PostgreSQL expertise
- AWS experience
- Docker experience

Nice-to-Have Skills
- Kubernetes
- Terraform
- CI/CD

Benefits
- Health Insurance
- Remote Working
```

---

## 8. Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Complete input form | 20 |
| Successful AI API integration | 20 |
| Effective prompt design | 20 |
| Correct JSON response structure | 15 |
| Clear and user-friendly UI | 15 |
| Copy Job Description feature | 10 |

**Total: 100 points**

---

# Bonus Assignment (+20 Points)

## Interview Question Generator

Based on the generated Job Description, the AI should also generate:

- 5 Technical Questions
- 3 Behavioral Questions
- 2 Scenario-Based Questions

Example:

```text
Technical:
1. Explain the Node.js event loop.
2. What is database indexing?

Behavioral:
1. Describe a conflict you experienced within a team.
2. How do you handle tight deadlines?

Scenario-Based:
1. What would you do if a production server crashed?
```

This bonus task allows students to practice a multi-step AI workflow instead of making only a single AI API request.
