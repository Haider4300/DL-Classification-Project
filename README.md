# DL Image Classifier

An end-to-end deep learning web app that classifies natural images into 8 categories using a fine-tuned EfficientNetB3 model (99.8% validation accuracy).

**Classes:** Airplane · Car · Cat · Dog · Flower · Fruit · Motorbike · Person

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Model | Keras / EfficientNetB3 (Transfer Learning) |
| Backend | FastAPI + Uvicorn |
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |

---

## Project Structure

```
DL project/
├── backend/
│   ├── app/
│   │   ├── api/routes/      # health.py, predict.py
│   │   ├── core/            # config.py
│   │   ├── inference/       # keras_predictor.py
│   │   ├── schemas/         # prediction.py
│   │   ├── services/        # predictor_service.py
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Card, HealthBadge, PredictionForm, etc.
│   │   ├── hooks/           # useHealth.ts
│   │   ├── lib/             # api.ts, types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
├── natural_images_transfer_learning.keras   ← active model
├── natural_images_cnn.keras
└── Notebooks/
```

---

## Run Locally

### Terminal 1 — Backend
```bash
cd backend
source .venv/Scripts/activate    # Windows
# source .venv/bin/activate      # Mac/Linux
python -m uvicorn app.main:app --reload --port 8000
```

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## ⚠️ Important Note on Model Files

The `.keras` model files are **excluded from git** because they are large (100MB+).

**Options to share the model:**
1. **Git LFS** — `git lfs track "*.keras"` then commit normally
2. **Google Drive / OneDrive** — share the link in README
3. **Hugging Face Hub** — free model hosting at huggingface.co
4. **Release attachment** — attach to a GitHub Release

---

## Deployment

See deployment section below for full instructions.