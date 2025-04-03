# 🎞️ Video Gallery App

A scalable Typescript React full stack web application that allows users to upload multiple videos, automatically generates thumbnails, and displays them in a responsive carousel.

Built using **Vite**, **React**, **MUI**, **Vercel Functions**, **Vercel Blob**, **Cloudinary**, and **Supabase**.

[Live Demo](https://gallery-sable-omega.vercel.app/)

## Features

- Upload multiple `.mp4` video files using preassigned URL using Vercel Blob Client Upload
- Swiper React for virtual videos display
- Cloudinary for generating thumbnail.
- Metadata storage in Supabase postgres DB.
- Vercel functions using NodeJS for serverless scalable backend.

## Tech Stack

| Frontend  | Backend    |
|-----------|----------------------|
| Vite + React (TS) | Vercel Serverless Functions |
| Swiper     | Vercel Blob SDK + Supabase (PostgreSQL)   |
| MUI        | Cloudinary API   |

## Project Structure

```bash
src/               # React frontend
api/               # Serverless API routes
lib/               # Cloudinary, Supabase helpers
types/             # types
consts/            # Constants
```

## API Overview

### POST /api/videos/upload
- Uses @vercel/blob/client to generate upload tokens and upload directly to Vercel Blob
- Upon upload completed calls its onCompleted function to generate thumbnail and save metadata to Supabase

### GET /api/videos/list
- Returns a list of all saved video + thumbnail pairs from Supabase

## Notes
- Generating preassigned URL is the best practice to upload files but in Vercel requires to open a port locally for testing
- Vercel Blob is adding a generated id to every uploaded file which makes it impossible to predict the file name and it can not be turned off.
