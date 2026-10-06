import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from groq import Groq


# Load variables from backend/.env
load_dotenv()


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Prantik Portfolio API",
    version="2.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Portfolio information for AI
# --------------------------------------------------

PROFILE_CONTEXT = """
You are the professional portfolio assistant for Prantik Chakraborty.

Answer ONLY using the information provided in this context.

Do not invent:
- employers
- job titles
- metrics
- technologies
- education
- projects
- certifications
- links
- achievements
- personal information

If the user asks something that is not covered by this information,
politely say that the information is not available.

Be concise, friendly, professional, and recruiter-appropriate.

PERSON
Name: Prantik Chakraborty

Prantik is a recent Computer Science graduate focused on:
- full-stack development
- backend systems
- data analytics
- practical AI


SKILLS

Programming Languages:
- C
- C++
- Python
- JavaScript
- Java

Frameworks:
- Flask
- Django
- Django REST Framework

Backend:
- REST APIs
- Microservices
- Authentication
- MVC Architecture

Databases:
- PostgreSQL
- MySQL
- SQLite
- SQL

Messaging:
- Kafka basics
- Event-driven Architecture

Testing:
- pytest
- Unit Testing
- Integration Testing

DevOps:
- Docker
- CI/CD Pipelines
- GitHub Actions
- Linux

Practices:
- Agile
- Code Reviews
- Debugging
- Production Support


EDUCATION

Chandigarh University (CU), Mohali, India
M.E. in Computer Science and Engineering (Data Science)
CGPA: N/A
August 2026 - Present

Vellore Institute of Technology (VIT), Vellore, India
B.Tech in Computer Science and Engineering
CGPA: 7.22
September 2021 - November 2025

Indira Gandhi Memorial High School, Kolkata, India
Class XII (CBSE)
79.8%
March 2021

Indira Gandhi Memorial High School, Kolkata, India
Class X (CBSE)
85.8%
March 2019


EXPERIENCE

Hindustan Aeronautics Limited (HAL), Kolkata
Data Analyst Intern
September 2023 - October 2023

Responsibilities and achievements:
- Optimized SQL queries and backend workflows, improving execution time by 30%.
- Built Python ETL pipelines processing 10K+ records.
- Resolved data inconsistencies through backend audits.


RPSG Ventures Limited, Kolkata
Full-Stack Intern
November 2023 - December 2023

Responsibilities and achievements:
- Built REST APIs using Django and Flask.
- Implemented role-based secure login.
- Worked with containerized services and CI workflows.


PROJECTS

1. Microservices-Based Backend Platform
- Flask microservices
- Docker
- Kafka communication

2. Brain Tumor Detection System
- CNN-based MRI classifier
- 92% accuracy
- Flask deployment

3. Multiple Disease Prediction System
- Django backend
- REST APIs
- pytest

4. GitHub Profile Analytics API
- Flask API
- GitHub repository and activity metrics


CERTIFICATIONS AND LEADERSHIP

- IBM Data Analyst — Coursera (2026)
- Complete Full-Stack Web Development Bootcamp — Udemy (2025)
- R&D Head, IEEE Computer Society — VIT (2024)
"""


# --------------------------------------------------
# Request model
# --------------------------------------------------

class ChatRequest(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=1200,
    )


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "prantik-portfolio-api",
    }


# --------------------------------------------------
# Profile endpoint
# --------------------------------------------------

@app.get("/api/profile")
def profile():
    return {
        "name": "Prantik Chakraborty",
        "portfolio": "https://prantikchakz.vercel.app",
        "github": "https://github.com/PRANTIKCHAKRABORTY",
    }


# --------------------------------------------------
# Groq AI Chat
# --------------------------------------------------

@app.post("/api/chat")
def chat(body: ChatRequest):

    # Get Groq API key from environment
    key = os.getenv("GROQ_API_KEY")

    # Check whether the API key exists
    if not key:
        return {
            "answer": (
                "AI mode is not configured yet. "
                "Please configure the Groq API key."
            )
        }

    try:
        # Create Groq client
        client = Groq(api_key=key)

        # Send request to Groq
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": PROFILE_CONTEXT,
                },
                {
                    "role": "user",
                    "content": body.message,
                },
            ],
            temperature=0.2,
            max_tokens=350,
        )

        # Get AI response
        answer = response.choices[0].message.content

        return {
            "answer": answer
            or "I could not generate an answer right now."
        }

    except Exception as e:

        # Print real error in Render logs
        print(f"Groq API error: {e}")

        # Don't expose technical details to visitors
        return {
            "answer": (
                "I'm having trouble connecting to the AI "
                "service right now. Please try again in a moment."
            )
        }
