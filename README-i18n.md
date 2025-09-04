# Internationalization (i18n) System

This portfolio website now supports multiple languages with a client-side locale switching system.

## 🌍 Supported Languages

- **English** (🇺🇸) - Default language
- **Vietnamese** (🇻🇳) - Native language

## 🚀 How It Works

### 1. Locale Switching

- Click the globe icon (🌐) in the navigation bar
- Select your preferred language from the dropdown
- All content automatically updates to the selected language
- Your choice is saved in localStorage and persists across sessions

### 2. Translation System

- Uses a custom `useTranslations` hook
- Client-side locale management with React Context
- No server-side routing changes needed
- Fallback to English if translations are missing

## 📁 File Structure

```
locales/
├── en.json          # English translations
├── vi.json          # Vietnamese translations
components/
├── providers/
│   ├── LocaleProvider.tsx    # Locale context provider
│   └── index.ts
lib/
└── useTranslations.ts        # Translation hook
```

## 🔧 How to Use

### In Components

```tsx
import { useTranslations } from "@/lib/useTranslations";

export default function MyComponent() {
  const { t } = useTranslations();

  return (
    <div>
      <h1>{t("section.title")}</h1>
      <p>{t("section.description")}</p>
    </div>
  );
}
```

### Adding New Translations

1. Add the key to `locales/en.json`:

```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "New section description"
  }
}
```

2. Add the same key to `locales/vi.json`:

```json
{
  "newSection": {
    "title": "Tiêu đề phần mới",
    "description": "Mô tả phần mới"
  }
}
```

3. Use in your component:

```tsx
<h1>{t('newSection.title')}</h1>
<p>{t('newSection.description')}</p>
```

## 🎯 Features

- ✅ **Instant Switching**: No page reloads when changing languages
- ✅ **Persistent Storage**: Language choice saved in localStorage
- ✅ **Fallback System**: Missing translations fall back to English
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimized with React memoization
- ✅ **SEO Friendly**: No duplicate URLs for different languages

## 🚫 What's NOT Included

- Server-side locale routing (e.g., `/en/about`, `/vi/about`)
- Automatic language detection based on browser settings
- URL-based locale switching
- SEO meta tags for different languages

## 💡 Best Practices

1. **Always provide both languages**: Don't leave translations incomplete
2. **Use descriptive keys**: Make translation keys self-explanatory
3. **Test both languages**: Ensure the UI works well in both languages
4. **Keep translations up-to-date**: Update translations when content changes

## 🔄 Adding New Languages

To add a new language (e.g., Japanese):

1. Create `locales/ja.json` with translations
2. Update `components/providers/LocaleProvider.tsx`:

```tsx
const locales: Locale[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" }, // Add this line
];
```

3. Update `lib/useTranslations.ts` to import the new locale file

## 🎉 Current Status

- ✅ All main components translated
- ✅ Hero section fully internationalized
- ✅ Project cards display in selected language
- ✅ Navigation and sections use translations
- ✅ Build successful with no errors
- ✅ Ready for production use

The system is now fully functional and ready to provide a multilingual experience for your portfolio visitors!
