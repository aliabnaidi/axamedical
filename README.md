# AXA Medical Tech Website

موقع عربي RTL بتصميم داكن حديث لشركة برمجيات وأنظمة طبية وإدارية.

## الملفات
- index.html
- styles.css
- script.js

## الخط
تم وضع Cairo كبديل مؤقت. لإضافة Alyamama:
1. ضع ملف `Alyamama.woff2` داخل `fonts/`.
2. أضف @font-face في بداية `styles.css` ثم سيستخدمه الموقع تلقائياً.

## التخصيص
استبدل بيانات الهاتف والبريد والعنوان والشعار والمحتوى التجريبي في `index.html`.


## إرسال طلبات التواصل إلى البريد
تم ربط نموذج التواصل بالبريد `axasupport0@gmail.com` عبر FormSubmit AJAX.
- عند أول استخدام قد يطلب FormSubmit تأكيد/تفعيل عنوان البريد.
- غيّر قيمة `_next` في `index.html` من `https://example.com/thank-you.html` إلى رابط صفحة الشكر الفعلية لموقعك بعد نشره.
- لا تضع كلمة مرور البريد أو بيانات SMTP داخل HTML/JavaScript.


## نموذج التواصل
تم حذف حقل الشركة. الحقول المطلوبة الآن:
الاسم، البريد الإلكتروني، رقم الهاتف، الحل المطلوب، والرسالة.

النموذج يرسل مباشرة عبر POST إلى FormSubmit على البريد:
axasupport0@gmail.com

مهم: لا يمكن لموقع HTML/CSS/JS ثابت إرسال بريد عبر Gmail مباشرة بدون خدمة إرسال أو Backend. FormSubmit هو طبقة الإرسال المستخدمة هنا ولا نضع كلمة مرور البريد داخل الموقع.

## Contact Form

The contact form is connected to FormSubmit via its AJAX endpoint. It submits asynchronously without requiring a backend and shows Arabic success/error feedback inside the page.


## Contact
Contact form removed. The contact section now uses WhatsApp, phone, email, and Facebook links.
