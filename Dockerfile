FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better caching
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory
COPY backend/ .

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "main.py"]