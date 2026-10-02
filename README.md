# pixels-to-products-cloudinary-ai-hackathon-2026-code-pe-charcha
> **Hackathon Team**: Code Pe Charcha — `[hackindia-team:pixels-to-products-cloudinary-ai-hackathon-2026:code-pe-charcha]`

# MediaShield

> **Upload. Understand. Protect. Optimize. Deliver.**  
> An autonomous AI-powered media intelligence, moderation, and transformation platform built on Cloudinary.

[![Cloudinary Hackathon](https://img.shields.io/badge/Cloudinary%20Hackathon-Track%201%3A%20AI%20Media%20Pipelines-blue)](https://cloudinary.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-teal)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)](https://tailwindcss.com)

---

## Hackathon Submission

* **Hackathon Track**: **Track 1 — AI Media Pipelines**
* **Project Name**: MediaShield
* **Tagline**: Upload. Understand. Protect. Optimize. Deliver.
* **Team Name**: Code Pe Charcha
* **Core Media Engine**: Cloudinary (Upload, AI Analysis, Moderation, Tagging, Smart Crop, Background Removal, Search, and Edge Delivery)

---

## Problem

Modern consumer applications, e-commerce marketplaces, and social platforms receive millions of user-submitted images daily. Managing this user-generated content (UGC) creates four massive bottlenecks:

1. **Bloated Storage & Egress Costs**: Raw camera uploads are frequently 8–15 MB JPEGs, draining mobile data plans and causing devastating Largest Contentful Paint (LCP) delays.
2. **Brand Safety & Compliance Liability**: Without instant automated moderation, adult imagery, hate symbols, and prohibited weapons slip into production galleries.
3. **Disorganized Catalogs**: Unstructured uploads lack metadata, keywords, and categorizations, making search and discovery nearly impossible.
4. **Broken Responsive Layouts**: Standard cropping chops off human faces and products on varying screen sizes (Instagram 1:1, Story 9:16, LinkedIn 1.91:1).

---

## Solution

**MediaShield** turns Cloudinary into an autonomous media refinery. Instead of using Cloudinary merely as a passive CDN or object bucket, MediaShield executes an automated 8-stage intelligence pipeline on every upload:

1. **Stream Upload**: Streams media buffers directly to Cloudinary without storing binaries locally.
2. **AI Understanding**: Detects objects, visual colors, and categories with confidence ratings.
3. **Safety Guardrails**: Screens content for adult material, violence, hate, and prohibited weapons with automated quarantine.
4. **Semantic Auto-Tagging**: Generates descriptive keywords indexed directly in Cloudinary.
5. **Dynamic Transformations**: On-the-fly AI background removal (`e_background_removal`) and subject-aware smart gravity cropping (`c_fill,g_auto`).
6. **Perceptual Compression**: Delivers modern WebP/AVIF formats at optimal perceptual quality (`f_auto,q_auto`), cutting bandwidth by up to **94.4%**.
7. **Instant Search**: Powers fast multi-attribute queries using the Cloudinary Search API.
8. **Edge Delivery**: Serves optimized assets globally across Cloudinary's multi-CDN network.

---

## Why Cloudinary?

Cloudinary is the **only platform** that unifies real-time AI transformations, content moderation, automated metadata enrichment, and multi-CDN edge delivery into a single API surface. 

In traditional architectures, developers must stitch together AWS S3 (storage), AWS Rekognition (AI analysis), WebPurify (moderation), sharp/ffmpeg (image processing servers), and Cloudflare (CDN). MediaShield replaces that fragile, expensive multi-vendor pipeline with Cloudinary as the single media backbone.

---

## Cloudinary Features Used

| Cloudinary Feature | Implementation & Code Pattern | Purpose in MediaShield |
| :--- | :--- | :--- |
| **Upload API** | `cloudinary.uploader.upload_stream` | Direct buffer stream ingestion, folder isolation, metadata extraction |
| **AI Visual Analysis** | `colors: true`, `faces: true`, `predominant` | Palette detection, dominant hex extraction, facial landmark mapping |
| **Content Moderation** | `moderation: 'webpurify'`, `aws_rek` | Automated screening for adult, violence, hate, and weapons |
| **Auto-Tagging** | `categorization: 'google_tagging'`, `auto_tagging: 0.7` | Machine-learning keywords indexed directly on asset records |
| **AI Background Removal** | `e_background_removal` | One-click background separation for e-commerce and portraits |
| **Smart Gravity Crop** | `c_fill,g_auto:subject,w_...,h_...` | Content-aware cropping for Instagram, LinkedIn, and mobile grids |
| **Automatic Optimization** | `f_auto,q_auto` | Dynamic format (WebP/AVIF) and perceptual losslessness (up to 94.4% savings) |
| **Search API** | `cloudinary.v2.search.expression(...)` | Lucene-based queries over tags, formats, and public IDs |
| **Global CDN Delivery** | `https://res.cloudinary.com/<cloud_name>/...` | Sub-50ms TTFB worldwide media delivery |

---

## Architecture

```mermaid
graph TD
    User([User / Creator]) -->|Drag & Drop Upload| Client[Next.js App Router Frontend]
    Client -->|Multipart Form Data| ApiUpload[/api/media/upload]
    
    subgraph Cloudinary Ingestion Pipeline
        ApiUpload -->|upload_stream| CldUpload[Cloudinary Upload API]
        CldUpload -->|Extract Colors & Landmarks| CldAnalysis[AI Visual Analysis]
        CldUpload -->|Safety Screening| CldModeration[Content Moderation]
        CldUpload -->|Semantic Keywords| CldTags[Auto-Tagging & Metadata]
        CldUpload -->|Dynamic URL Builder| CldTransform[Transformations: f_auto, q_auto, g_auto, e_bg_removal]
        CldUpload -->|Search Engine| CldSearch[Cloudinary Search API]
    end
    
    CldAnalysis -->|Telemetry & Health Score| DB[(Prisma SQLite/PostgreSQL)]
    CldModeration -->|Safety Scores & Flags| DB
    CldTags -->|Keywords & Metadata| DB
    
    DB --> Dashboard[Analytics Dashboard & Recharts]
    DB --> Library[Media Library & Search]
    DB --> AssetDetail[Asset Inspector & Split Comparator]
    CldTransform --> Studio[Smart Transformation Studio]
    CldTransform --> Delivery[Cloudinary CDN Edge Delivery]
```

---

## Tech Stack

* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts, Canvas-Confetti.
* **Backend**: Next.js Server / API Routes, Node.js Stream Pipeline.
* **Media Infrastructure**: Official `cloudinary` Node.js SDK (v2).
* **Database / ORM**: Prisma ORM with SQLite (`dev.db`) for zero-friction local execution (PostgreSQL compatible).
* **Testing**: Custom automated test suite (`npx tsx tests/media-pipeline.test.ts`).

---

## Key Features

1. **Autonomous Media Ingestion**: Drag-and-drop uploader with real-time multi-stage pipeline status.
2. **Media Health Score (0–100)**: Composite index evaluating AI categorization, content safety, optimization ratio, metadata depth, and delivery readiness.
3. **Split Comparator**: Side-by-side and interactive slider comparing original raw images vs Cloudinary optimized assets with exact byte savings.
4. **Smart Transformation Studio**: Interactive canvas supporting Instagram (1:1, 4:5, 9:16), Facebook, LinkedIn, Website Hero, and Mobile thumbnails with live Cloudinary URL generation.
5. **Content Moderation Quarantine**: Flags sensitive media (weapons, adult, violence) and halts production distribution.
6. **Semantic Media Search**: Instant tag and keyword search powered by Cloudinary.
7. **Judge Demo Mode**: 3-minute guided interactive walkthrough designed specifically for hackathon evaluation.
8. **Dual-Engine Architecture**: Seamlessly switches between live Cloudinary credentials and an intelligent sandbox fallback with clear UI indicators.

---

## Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
# Database (Default: SQLite for zero-setup local execution)
DATABASE_URL="file:./dev.db"

# Cloudinary Configuration
# Obtain credentials from your Cloudinary Console (https://console.cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Demo Mode
# Set to 'true' to allow simulated fallback when credentials or paid add-ons are unavailable.
# Set to 'false' for strict production Cloudinary execution.
DEMO_MODE=true

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> [!CAUTION]
> **Security Guarantee**: Never commit `.env` or real API keys to version control. All Cloudinary API Secrets are executed exclusively in server-side API routes and are never sent to the browser.

---

## Running Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/HackIndiaXYZ/pixels-to-products-cloudinary-ai-hackathon-2026-code-pe-charcha.git
cd pixels-to-products-cloudinary-ai-hackathon-2026-code-pe-charcha
npm install
```

### 2. Initialize Database & Seed Demo Data
```bash
# Push Prisma schema to local SQLite database
npx prisma db push

# Seed initial rich demo assets
npx tsx prisma/seed.ts
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## Hackathon Judge Demo Workflow (3 Minutes)

Judges can evaluate the entire application story in under 3 minutes:

1. **Open the Dashboard** ([http://localhost:3000/dashboard](http://localhost:3000/dashboard))
2. Click the **"⚡ Hackathon Demo"** button in the header.
3. Select a scenario:
   * **E-Commerce Product (Nike Sneaker)**: Demonstrates background removal and 94.4% compression savings.
   * **Automotive (Porsche Taycan)**: Demonstrates 16:5 panoramic hero banner cropping with subject gravity.
   * **Safety Violation (Restricted Weapon)**: Demonstrates automated moderation quarantine.
4. Click **"Run Pipeline"** to watch the multi-stage execution (Upload → AI Analysis → Safety Screening → Transformations).
5. Click **"Inspect Asset Intelligence & Savings"** to explore the interactive before/after split slider, health score breakdown, and Cloudinary transformation presets.
6. Visit **[http://localhost:3000/transform](http://localhost:3000/transform)** to test the Smart Transformation Studio.
7. Visit **[http://localhost:3000/cloudinary](http://localhost:3000/cloudinary)** to inspect the exact Cloudinary SDK code behind every pipeline stage.

---

## Manual QA Checklist

- [x] Application compiles cleanly via `npm run build`.
- [x] Automated test suite passes (`npm test`).
- [x] Landing page loads with responsive layout and clear track info.
- [x] Dashboard displays KPI cards, Recharts visualizations, and health scores.
- [x] Drag-and-drop uploader validates file size (<25MB) and formats.
- [x] Multi-stage upload progress communicates Cloudinary pipeline stages.
- [x] Asset detail page displays original vs optimized byte savings accurately.
- [x] Content safety panel alerts on flagged media and blocks delivery.
- [x] Smart Transformation Studio updates preview and generates valid Cloudinary delivery URLs.
- [x] Media Search filters by tag, category, and keyword.
- [x] Status badge clearly reports "LIVE CLOUDINARY" or "DEMO MODE".
- [x] No secrets or credentials committed to Git.

---

## Screenshots

| Landing Page | Media Dashboard |
| :---: | :---: |
| *Hero & Ingestion Flow* | *Telemetry & Bandwidth Savings* |

| Original vs Optimized Comparator | Smart Transformation Studio |
| :---: | :---: |
| *Interactive Before/After Slider* | *Content-Aware Crop & BG Removal* |

---

## Demo Video

* **Video Walkthrough**: *(Coming Soon for Hackathon Submission)*

---

## License

MIT License. Copyright (c) 2026 HackIndia.
