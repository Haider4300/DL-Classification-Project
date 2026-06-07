# Author: Ali Haider

<div align="center">

# 🧠 DL Image Classifier

**An end-to-end deep learning web app for natural image classification**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.17-FF6F00?logo=tensorflow&logoColor=white)](https://tensorflow.org)
[![HuggingFace](https://img.shields.io/badge/🤗%20HuggingFace-Spaces-yellow)](https://huggingface.co/spaces/Haider4300/dl-image-classifier)

🚀 **[Live Demo → huggingface.co/spaces/Haider4300/dl-image-classifier](https://huggingface.co/spaces/Haider4300/dl-image-classifier)**

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
| **Deployment** | Docker · Hugging Face Spaces |

---

## 📁 Project Structure

```
DL project/
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── health.py           # GET /api/v1/health
│   │   │   └── predict.py          # POST /api/v1/predict
│   │   ├── core/config.py          # App settings
│   │   ├── inference/
│   │   │   └── keras_predictor.py  # Model loading + inference
│   │   ├── schemas/prediction.py   # Pydantic models
│   │   ├── services/
│   │   │   └── predictor_service.py
│   │   └── main.py                 # FastAPI app entry point
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/             # UI components
│   │   ├── hooks/useHealth.ts
│   │   ├── lib/api.ts
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── Notebooks/
│   ├── dl_project.ipynb            # Custom CNN training
│   └── transfer_learning.ipynb     # EfficientNetB3 fine-tuning
├── Dockerfile                      # Multi-stage build for HF Spaces
└── README.md
```

---

## 🚀 Run Locally

### Terminal 1 — Backend

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate    # Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Backend → `http://localhost:8000`  
API docs → `http://localhost:8000/docs`

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend → `http://localhost:3000`

---

## 🔌 API Endpoints

### `GET /api/v1/health`

```json
{
  "status": "online",
  "model_name": "natural_images_transfer_learning.keras",
  "classes": ["airplane", "car", "cat", "dog", "flower", "fruit", "motorbike", "person"],
  "model_loaded": true
}
```

### `POST /api/v1/predict`

```json
{
  "label": "cat",
  "confidence": 0.9998,
  "probabilities": [
    { "label": "cat", "probability": 0.9998 },
    { "label": "dog", "probability": 0.0001 }
  ],
  "model_name": "natural_images_transfer_learning.keras",
  "inference_ms": 166.4
}
```

---

## 🧠 Model Details

### Transfer Learning — EfficientNetB3 ⭐ (Active)

| Metric | Value |
|--------|-------|
| Base model | EfficientNetB3 (ImageNet weights) |
| Input size | 224 × 224 × 3 |
| Validation accuracy | **99.85%** |
| Epochs | 15 |
| Dataset size | 6,899 images |

```
EfficientNetB3 (frozen) → GlobalAveragePooling2D → Dense(256) → Dropout(0.3) → Dense(8, softmax)
```

---

## 📦 Deployment

| Service | Purpose | Link |
|---------|---------|------|
| **Hugging Face Spaces** | Full app (Backend + Frontend) | [Live Demo](https://huggingface.co/spaces/Haider4300/dl-image-classifier) |
| **Git LFS** | Model file storage | Included in repo |

Multi-stage Dockerfile: Node.js builds React → Python serves API + static files on port `7860`.

---

## 📄 License

Internal project. All rights reserved by the author.
