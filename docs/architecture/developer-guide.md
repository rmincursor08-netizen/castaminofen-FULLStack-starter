# راهنمای توسعه‌دهنده

## 1. شروع کار

- نصب Docker و Docker Compose
- راه‌اندازی PostgreSQL، Redis، MinIO، Elasticsearch
- اجرای migrate و seed
- اجرای اپ‌های api و web

## 2. جریان کار روزمره

- ساخت branch جدید
- اجرای lint و test
- اجرای build برای package‌های تغییر یافته
- بازبینی dependency graph

## 3. نکات مهم

- از ماژول‌های مشترک استفاده کنید
- وابستگی‌های cross-module را از طریق contracts مدیریت کنید
- از دسترسی مستقیم به infra در لایه‌های بالاتر خودداری کنید
