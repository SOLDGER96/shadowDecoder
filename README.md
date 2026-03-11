# 🕵️‍♂️ Shadow Date Decoder

A lightweight, terminal-themed web application that decodes the "Last Password Change" value from a Linux `/etc/shadow` file into a human-readable date. 

Built with **Python (FastAPI)** for the backend and **Vanilla HTML/CSS/JS** for the frontend. The project uses **`uv`** for blazing-fast Python package and environment management.

---

## ✨ Features
* **Terminal-Themed UI:** A retro, hacker-style interface that mimics a real Linux terminal.
* **Smart Parsing:** Accept either a raw integer (e.g., `17933`) OR paste a complete `/etc/shadow` line (e.g., `user:$6$abc:17933:0:99999:7:::`), and the app will automatically extract the correct field.
* **Single-Server Architecture:** The FastAPI backend serves the frontend static files, meaning you only need to run one command to boot the entire app.
* **Robust Validation:** Prevents negative numbers and invalid string formats.

---

## ⚙️ How it Works

In Linux, user password hashes and expiry data are stored in `/etc/shadow`. 



The files are separated by colons `:`. The **3rd field** represents the number of days since the Unix Epoch (January 1, 1970) that the password was last changed. 

This application takes that integer, routes it to the FastAPI backend, and uses Python's `datetime` and `timedelta` modules to calculate and return the exact calendar date.

---

## 🚀 Getting Started

### Prerequisites
You will need to have [uv](https://github.com/astral-sh/uv) installed on your system.
```bash
# macOS / Linux
curl -LsSf [https://astral.sh/uv/install.sh](https://astral.sh/uv/install.sh) | sh
