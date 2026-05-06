from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from typing import List

app = FastAPI(
    title="Sunshine Aura AI Backend",
    description="Training, Consultancy, Jobs & Learning Platform",
    version="0.1.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Role(str, Enum):
    free = "free"
    pro = "pro"

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Role = Role.free

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: Role

class Training(BaseModel):
    id: int
    title: str
    description: str
    category: str
    is_free: bool

class JobPost(BaseModel):
    id: int
    title: str
    company: str
    location: str
    job_type: str
    description: str

class ConsultingOffer(BaseModel):
    id: int
    title: str
    details: str

# In-memory storage (use database in production)
users = []
trainings = [
    Training(id=1, title="Python Fundamentals", description="Learn Python basics for business applications.", category="Python", is_free=True),
    Training(id=2, title="AI + Python Web Applications", description="Build modern AI-powered web applications using Python and practical tools.", category="AI", is_free=True),
    Training(id=3, title="Advanced AI Architecture (Pro)", description="Build production AI systems — for pro users only.", category="AI", is_free=False),
]
jobs = [
    JobPost(id=1, title="Junior Python Trainer", company="Sunshine Aura AI", location="Remote", job_type="Full-time", description="Teach Python and AI to corporate teams."),
    JobPost(id=2, title="AI Consultant", company="Aura Consulting", location="Hybrid", job_type="Contract", description="Design AI solutions for enterprise clients."),
]
offers = [
    ConsultingOffer(id=1, title="AI Strategy Consulting", details="1-on-1 sessions to plan your AI adoption."),
    ConsultingOffer(id=2, title="Career Guidance", details="Personalized career coaching in AI and tech."),
]

# Routes
@app.get("/")
def root():
    return {"message": "Welcome to Sunshine Aura AI", "version": "0.1.0"}

@app.post("/api/register")
def register(user: UserCreate):
    if any(u["email"] == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email already registered.")
    new_user = {
        "id": len(users) + 1,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "role": user.role
    }
    users.append(new_user)
    return {
        "message": "Registration successful",
        "user": UserResponse(id=new_user["id"], name=new_user["name"], email=new_user["email"], role=new_user["role"])
    }

@app.post("/api/login")
def login(credentials: UserLogin):
    user = next((u for u in users if u["email"] == credentials.email and u["password"] == credentials.password), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    return {
        "message": "Login successful",
        "user": UserResponse(id=user["id"], name=user["name"], email=user["email"], role=user["role"])
    }

@app.get("/api/trainings", response_model=List[Training])
def get_trainings():
    return trainings

@app.get("/api/jobs", response_model=List[JobPost])
def get_jobs():
    return jobs

@app.get("/api/consulting", response_model=List[ConsultingOffer])
def get_consulting():
    return offers

@app.get("/api/pricing")
def get_pricing():
    return {
        "free": {
            "price": 0,
            "features": ["Basic trainings", "Job listings"]
        },
        "pro": {
            "price": 12999,
            "features": ["All trainings", "Consulting sessions", "Job placement support", "Premium community"]
        }
    }

@app.get("/api/users", response_model=List[UserResponse])
def get_all_users():
    return [UserResponse(id=u["id"], name=u["name"], email=u["email"], role=u["role"]) for u in users]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
