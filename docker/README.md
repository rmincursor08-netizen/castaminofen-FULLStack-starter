# docker

این پوشه برای فایل‌های Docker و محیط‌های اجرایی محلی در نظر گرفته شده است.

## هدف
- نگه‌داری Dockerfileها، docker-compose و تنظیمات محیط محلی
- فراهم‌سازی راه‌اندازی سریع برای توسعه و تست

## ساختار پیشنهادی
- docker/dev.dockerfile
- docker/prod.dockerfile
- docker/docker-compose.yml

## نکته معماری
Docker باید برای محیط توسعه و CI از یک پایه‌ی یکسان استفاده کند تا drift جلوگیری شود.
