# monitoring

این پوشه برای ابزارهای مانیتورینگ، لاگ‌گیری، ردیابی، هشدار و مقیاس‌پذیری در نظر گرفته شده است.

## هدف
- نگه‌داری پیکربندی Prometheus، Grafana، OpenTelemetry، Loki و Alertmanager
- فراهم‌سازی دیده‌بان برای عملکرد، خطاها و وضعیت سرویس‌ها

## ساختار پیشنهادی
- monitoring/prometheus
- monitoring/grafana
- monitoring/otel
- monitoring/alerts

## نکته معماری
مشاهده‌پذیری باید در هر سطح از سیستم از ابتدا در نظر گرفته شود و نه به‌عنوان یک لایه‌ی بعدی.
