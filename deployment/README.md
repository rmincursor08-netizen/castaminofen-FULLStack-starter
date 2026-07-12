# deployment

این پوشه برای فایل‌های مربوط به استقرار و Release Management در نظر گرفته شده است.

## هدف
- نگه‌داری استراتژی‌های انتشار، rollback، canary، blue-green و سیاست‌های release
- فراهم‌سازی یک مسیر مستند و قابل تکرار برای استقرار

## ساختار پیشنهادی
- deployment/strategies
- deployment/releases
- deployment/rollback

## نکته معماری
انتشار باید کنترل‌شده، ایمن و قابل بازگشت باشد تا ریسک در محیط تولید کاهش یابد.
