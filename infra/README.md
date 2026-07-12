# infra

این پوشه برای زیرساخت به‌صورت کد (Infrastructure as Code) در نظر گرفته شده است.

## هدف
- نگه‌داری Terraform، Pulumi، CloudFormation یا ابزارهای مشابه
- تعریف شبکه، پایگاه داده، IAM، bucket و سایر منابع زیرساختی

## ساختار پیشنهادی
- infra/terraform
- infra/modules
- infra/environments

## نکته معماری
زیرساخت باید قابل بازتولید، قابل نسخه‌گذاری و مستقل از تغییرات دستی باشد.
