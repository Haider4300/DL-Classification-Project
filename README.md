---
title: DL Image Classifier
emoji: 🧠
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---
# Author: Ali Haider (AI-Engineer)
<div align="center">

# 🧠 DL Image Classifier

**An end-to-end deep learning web app for natural image classification**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.17-FF6F00?logo=tensorflow&logoColor=white)](https://tensorflow.org)

</div>

---

## 📸 Dashboard

<img width="1919" height="945" alt="dashboard" src="https://github.com/user-attachments/assets/31a934f1-9db9-4d85-88d0-dabe3a44c2bb" />

---

## ✨ Features

- 🖼️ **Drag & drop** image upload with instant preview
- ⚡ **Real-time classification** with probability bars for all 8 classes
- 📊 **Session history** — timestamped audit trail of every prediction
- 📈 **Stats panel** — total predictions, avg confidence, latency, class distribution
- 🟢 **Live API health badge** — polls backend every 10 seconds
- 🎯 **99.85% validation accuracy** using EfficientNetB3 transfer learning

---

## 🏷️ Supported Classes

| Emoji | Class | Emoji | Class |
|-------|-------|-------|-------|
| ✈️ | Airplane | 🌸 | Flower |
| 🚗 | Car | 🍎 | Fruit |
| 🐱 | Cat | 🏍️ | Motorbike |
| 🐶 | Dog | 🧑 | Person |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Model** | EfficientNetB3 (Transfer Learning) + Custom CNN |
| **Backend** | FastAPI · Uvicorn · Pydantic · Pillow · NumPy |
| **Frontend** | React 18 · TypeScript · Vite · Tailwind CSS 3 |
| **Training** | TensorFlow 2.17 · Keras 3 · Jupyter Notebooks |

---

## 📁 Project Structure

```
DL project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── health.py       # GET /api/v1/health
│   │   │       └── predict.py      # POST /api/v1/predict
│   │   ├── core/
│   │   │   └── config.py           # App settings (model path, image size, classes)
│   │   ├── inference/
│   │   │   └── keras_predictor.py  # Model loading + inference logic
│   │   ├── schemas/
│   │   │   └── prediction.py       # Pydantic request/response models
│   │   ├── services/
│   │   │   └── predictor_service.py # Singleton model instance
│   │   └── main.py                 # FastAPI app + CORS + lifespan
│   ├── .env                        # Model path, image size, CORS origins
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.tsx            # Reusable card shell
│   │   │   ├── HealthBadge.tsx     # API status indicator
│   │   │   ├── PredictionForm.tsx  # Upload + submit
│   │   │   ├── PredictionResult.tsx # Class + probability bars
│   │   │   ├── PredictionHistory.tsx # Session audit table
│   │   │   └── StatsPanel.tsx      # Metrics + distribution
│   │   ├── hooks/
│   │   │   └── useHealth.ts        # Health polling hook
│   │   ├── lib/
│   │   │   ├── api.ts              # fetch wrappers
│   │   │   └── types.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Root layout
│   │   └── main.tsx                # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── Notebooks/
│   ├── dl_project.ipynb            # Custom CNN training
│   └── transfer_learning.ipynb     # EfficientNetB3 fine-tuning
│
├── docs/
│   └── dashboard.png               # App screenshot
│
├── .gitignore
└── README.md
```

> ⚠️ **Model files** (`*.keras`) are not included in this repo due to size.
> Download from: **[Google Drive link here]** and place in the project root.

---

## 🚀 Run Locally

### Prerequisites
- Python 3.11
- Node.js 18+
- The `.keras` model file in project root

### Terminal 1 — Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/Scripts/activate    # Windows
# source .venv/bin/activate      # Mac / Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
python -m uvicorn app.main:app --reload --port 8000
```

Backend runs at → `http://localhost:8000`
API docs at → `http://localhost:8000/docs`

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:3000`

---

## 🔌 API Endpoints

### `GET /api/v1/health`
Returns model status and supported classes.

```json
{
  "status": "online",
  "model_name": "natural_images_transfer_learning.keras",
  "classes": ["airplane", "car", "cat", "dog", "flower", "fruit", "motorbike", "person"],
  "model_loaded": true
}
```

### `POST /api/v1/predict`
Accepts a multipart image upload, returns prediction.

```bash
curl -X POST http://localhost:8000/api/v1/predict \
  -F "file=@cat.jpg"
```

```json
{
  "label": "cat",
  "confidence": 0.9998,
  "probabilities": [
    { "label": "cat",   "probability": 0.9998 },
    { "label": "dog",   "probability": 0.0001 },
    { "label": "flower","probability": 0.0001 }
  ],
  "model_name": "natural_images_transfer_learning.keras",
  "inference_ms": 166.4
}
```

---

## 🧠 Model Details

### Transfer Learning Model — EfficientNetB3 ⭐ (Active)

| Metric | Value |
|--------|-------|
| Base model | EfficientNetB3 (ImageNet weights) |
| Input size | 224 × 224 × 3 |
| Training accuracy | ~100% |
| Validation accuracy | **99.85%** |
| Epochs | 15 |
| Dataset size | 6,899 images |

Architecture:
```
EfficientNetB3 (frozen, ImageNet)
→ GlobalAveragePooling2D
→ Dense(256, relu)
→ Dropout(0.3)
→ Dense(8, softmax)
```

### Custom CNN Model (Baseline)

| Metric | Value |
|--------|-------|
| Input size | 150 × 150 × 3 |
| Architecture | Custom Conv2D + MaxPool stack |

---

## ⚙️ Configuration

Edit `backend/.env` to switch models or adjust settings:

```env
# Use transfer learning model (recommended)
APP_MODEL_PATH=../natural_images_transfer_learning.keras
APP_IMAGE_SIZE=[224,224]

# Or use the custom CNN
# APP_MODEL_PATH=../natural_images_cnn.keras
# APP_IMAGE_SIZE=[150,150]

APP_CLASS_NAMES=["airplane","car","cat","dog","flower","fruit","motorbike","person"]
APP_CORS_ORIGINS=["http://localhost:3000"]
```

---

## 📦 Deployment

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend (FastAPI) | 
| **Google Drive** | Model file storage | 

See [DEPLOYMENT.md] for full step-by-step instructions.

---

## 📄 License

Internal project. All rights reserved by the authors.
