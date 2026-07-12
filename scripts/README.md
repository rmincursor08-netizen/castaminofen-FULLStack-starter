# scripts

این پوشه برای اسکریپت‌های خودکار و عملیات اجرایی پروژه در نظر گرفته شده است.

## هدف
- اجرای migration، seed، setup، cleanup، deploy helper و automation tasks
- کاهش نیاز به دستورات دستی در محیط‌های مختلف

## ساختار پیشنهادی
- scripts/setup.sh
- scripts/dev.sh
- scripts/migrate.sh
- scripts/seed.sh

## نکته معماری
اسکریپت‌ها باید قابل فهم، قابل تکرار و بدون وابستگی پنهان باشند.
