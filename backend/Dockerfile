# Python 3.13 (latest stable) with slim variant
FROM python:3.13-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Render.com uses PORT environment variable
ENV PORT=10000

# Expose the port
EXPOSE $PORT

# Run the application with Render's PORT
CMD uvicorn app:app --host 0.0.0.0 --port $PORT
