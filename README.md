# AI-Image-Generator-Using-Hugging-Face-API
The objective of this project is to build a simple web application that can generate AI images from text prompts using publicly available AI models.


# AI Image Generator (Hugging Face + Node.js)

This is a mini **AI Image Generator** web app built for a college project.

You enter a **text prompt**, choose:

- an **AI model** (e.g. Stable Diffusion XL),
- **image count** (1–4),
- and **aspect ratio** (square, landscape, portrait),

and the app generates images using Hugging Face’s Inference Router API.  
You can then **download** each generated image with a single click.

---

## Features

- Simple, clean UI with light/dark theme toggle  
- Prompt textarea with random prompt generator (🎲 button)  
- Model selection (FLUX, Stable Diffusion XL, etc.)  
- Selectable image count (1–4 images per request)  
- Selectable aspect ratio (1:1, 16:9, 9:16)  
- Loading cards with “Generating…” state  
- Generated images in a responsive gallery grid  
- **Download button on hover** for each image (saves as `.png`)

---

## Tech Stack

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

**Backend:**

- Node.js
- Express.js

**AI / External Service:**

- Hugging Face Inference Router API  
  (`https://router.huggingface.co/hf-inference/models/...`)

---

## Project Structure

```Folder Structure`
- ai-image-generator-main/
  server.js             # Node.js + Express server (backend + API)
  package.json          # Node dependencies (express)
  node_modules/         # Installed dependencies (auto-created by npm)
  public/
    index.html          # Main UI
    script.js           # Frontend logic
    style.css           # Styles
    test.jpg            # Sample image / placeholder (optional)

## Important:
index.html, script.js, style.css, test.jpg must be inside the public/ folder.







----- HOW TO RUN THE PROJECT -------

## Prerequisites & Setup (Windows)

### 1. Prerequisites

Before running the project, make sure you have:

1. **Node.js (with npm)**
   - Download & install from: https://nodejs.org (LTS version recommended)
   - Verify in Command Prompt:
     ```Inside command prompt or git-bash - type below command``
     
     node -v
     npm -v
     
     Both commands should show a version number.

2. **Hugging Face Account + API Token**
   - Sign up / log in: https://huggingface.co
   - Go to: **Settings → Access Tokens**
   - Click **New token**
     - Type / Role: **Read**
   - Copy the token (it will start with `hf_...`).

3. **Git** (optional, only if cloning the repo)
   - Download: https://git-scm.com/downloads
   - Verify:
     ```bash
     git --version
     ```

---

### 2. Get the Project

#### Option A – Clone from GitHub

```Inside command prompt or git-bash - go to below path``

cd C:\Users\<YourUser>\Desktop
git clone https://github.com/<your-github-username>/<forked-repo-name>.git
cd <forked-repo-name>



### Option B — Download ZIP

1. On GitHub → click **Code → Download ZIP**
2. Extract the ZIP, for example to:
3. Open Command Prompt and go into that folder:
   
```Inside command prompt or git-bash - go to below path``
cd C:\Users\<YourUser>\Desktop\ai-image-generator-main




### 3. Add Your Hugging Face Token

- Open server.js in any code editor (VS Code, Notepad++, etc.).

- Find this line: 
const HF_TOKEN = "hf_YOUR_REAL_TOKEN_HERE"; // <-- paste your HF token here

- Replace it with your actual Hugging Face token (from Settings → Access Tokens):
  for example like below -
  const HF_TOKEN = "hf_abc123YOURREALTOKENxyz";



  ### 4. Install Dependencies

  - From inside the project folder (where server.js is located), run:
    npm install

    This installs all required packages listed in package.json (mainly express).

    You only need to run npm install once after downloading or cloning the project.



  ### 5. Run the Project

  - Open Command Prompt or git-bash.

  - Navigate to the project folder:
    cd C:\Users\<YourUser>\Desktop\ai-image-generator-main

  - Start the server:
    node server.js

  - If everything is correct, you should see something like:
    Server running on http://localhost:8080
    Serving static from: C:\Users\...\ai-image-generator-main\public

  - Open your browser (Chrome/Edge) and go to:
    http://localhost:8080/index.html

  NOTE - Do NOT double-click index.html and open it as file:///…
         The app must be opened via http://localhost:8080/index.html so it can talk to the backend server.


  



