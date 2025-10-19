# 🏠 Mono House Landing Page

Лендинг для компании по мебелированию премиум-класса.

## 🛠️ Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик проекта
- **Tailwind CSS v4** - стилизация
- **Motion (Framer Motion)** - анимации
- **shadcn/ui** - UI компоненты
- **Lucide React** - иконки
- **Sonner** - уведомления

## 📁 Структура проекта

```
mono-house-landing/
├── public/              # Статические файлы
│   └── images/         # Изображения (добавь сюда свои фото)
├── src/
│   ├── components/     # React компоненты
│   │   ├── ui/        # shadcn/ui компоненты
│   │   ├── figma/     # Утилиты из Figma Make
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Benefits.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   └── globals.css  # Глобальные стили
│   ├── App.tsx         # Главный компонент
│   └── main.tsx        # Точка входа
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## 🚀 Установка и запуск

### 1️⃣ Клонируй/создай проект

```bash
# Создай папку для проекта
mkdir mono-house-landing
cd mono-house-landing
```

### 2️⃣ Скопируй все файлы

Создай структуру папок и файлов как указано выше:

```bash
# Создай структуру
mkdir -p src/components/ui src/components/figma src/styles public/images
```

Скопируй все файлы которые я создал:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `tailwind.config.ts`
- `index.html`
- `.gitignore`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles/globals.css`
- Все компоненты из `src/components/`

### 3️⃣ Установи зависимости

```bash
# Используй npm
npm install

# Или yarn
yarn install

# Или pnpm
pnpm install
```

### 4️⃣ Добавь изображения

Положи свои изображения в папку `public/images/`:

```
public/
└── images/
    ├── hero-bg.jpg          # Для Hero секции
    ├── portfolio-1.jpg      # Для Portfolio
    ├── portfolio-2.jpg
    └── ...
```

**ВАЖНО:** После добавления изображений, обнови пути в компонентах:

**Hero.tsx** - строка 27:
```typescript
// Было:
src="https://optim.tildacdn.pro/tild3635-3766-4335-b663-653130363538/-/format/webp/photo-output.JPG.webp"

// Стало:
src="/images/hero-bg.jpg"
```

**Portfolio.tsx** - массив `portfolioImages` (строки 6-67):
```typescript
// Замени все URL на локальные пути:
const portfolioImages = [
  {
    url: '/images/portfolio-1.jpg',
    title: 'Современный интерьер',
  },
  {
    url: '/images/portfolio-2.jpg',
    title: 'Гостиная премиум класса',
  },
  // и т.д.
];
```

### 5️⃣ Запусти проект

```bash
# Development сервер
npm run dev

# Или
yarn dev

# Или
pnpm dev
```

Проект откроется на **http://localhost:3000** 🎉

### 6️⃣ Собери для продакшена

```bash
npm run build
npm run preview
```

## 🎨 Кастомизация

### Цвета

Все цвета находятся в `src/styles/globals.css`:

```css
:root {
  --color-charcoal: #2C2C2C;
  --color-gold: #D4AF37;
  --color-light-bg: #FAF8F5;
  --color-text-muted: #6B6B6B;
}
```

### Шрифты

Используются Google Fonts:
- **Playfair Display** - для заголовков
- **Inter** - для текста

Подключены в `globals.css` через `@import`.

### Контент

Вся текстовая информация находится прямо в компонентах:
- `Hero.tsx` - главный экран
- `Services.tsx` - услуги
- `Benefits.tsx` - преимущества
- `Portfolio.tsx` - работы
- `Process.tsx` - процесс работы
- `ContactForm.tsx` - форма связи
- `Footer.tsx` - футер с контактами

## 📝 Важные замечания

1. **Форма отправки** (`ContactForm.tsx`):
   - Сейчас работает с `setTimeout` (имитация)
   - Для реальной отправки добавь API endpoint

2. **Изображения**:
   - Положи все изображения в `public/images/`
   - Обнови пути в `Hero.tsx` и `Portfolio.tsx`

3. **Sonner version**:
   - В `ContactForm.tsx` строка 6: `import { toast } from 'sonner@2.0.3';`
   - Убери `@2.0.3`, оставь просто: `import { toast } from 'sonner';`

4. **Кроссбраузерность**:
   - Проект использует современные возможности
   - Поддержка: Chrome, Firefox, Safari, Edge (последние версии)

## 🐛 Возможные проблемы

### Ошибка с импортами
Если видишь ошибки импортов:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind не работает
Убедись что:
1. В `tailwind.config.ts` правильные пути в `content`
2. В `vite.config.ts` подключен `@tailwindcss/vite`
3. В `globals.css` есть `@theme inline`

### Motion/Framer Motion ошибки
Если видишь ошибки с `motion`:
```bash
npm install motion@latest
```

## 📞 Контакты в проекте

Обнови контакты в `Footer.tsx`:
- Email: `monohouse.01@gmail.com`
- Телефоны: `0507909567`, `0500914700`
- Соцсети: сейчас "Coming soon"

## 🚀 Деплой

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Загрузи папку dist на Netlify
```

### GitHub Pages
Добавь в `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

---

**Сделано с ❤️ для Mono House**