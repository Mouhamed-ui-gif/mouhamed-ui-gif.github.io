# Mouhamed Ghennai — Personal Website

الموقع الشخصي الرسمي لـ محمد غناي (Mouhamed Ghennai) — مطوّر ويب ورائد أعمال من أم البواقي، الجزائر.

رابط الموقع: **https://mouhamed-ui-gif.github.io**

## البنية

```
├── index.html      الصفحة الرئيسية (ثلاث لغات: عربي / فرنسي / إنجليزي)
├── css/style.css   التصميم (أسلوب سيبراني داكن)
├── js/i18n.js      نظام الترجمة
├── js/main.js      التفاعلات
├── images/         الصور المجانية
├── sitemap.xml     خريطة الموقع (SEO)
└── robots.txt      ملف الروبوتات (SEO)
```

## النشر على GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Mouhamed-ui-gif/mouhamed-ui-gif.github.io.git
git push -u origin main
```

> الموقع يُنشر تلقائياً من فرع `main` عند استعمال ريبو باسم `مouhamed-ui-gif.github.io`.

## إرسال الموقع إلى Google (Search Console)

1. افتح https://search.google.com/search-console
2. أضف الموقع: `https://mouhamed-ui-gif.github.io`
3. اختر التحقق عبر HTML (ضع الميتا في `index.html`)
4. أرسل `sitemap.xml` في قسم "Sitemaps"

## تحديث المحتوى

- **النصوص/الترجمات:** عدّل `js/i18n.js`
- **الألوان:** عدّل المتغيرات في أعلى `css/style.css`
- **المشاريع:** عدّل قسم المشاريع في `index.html`
