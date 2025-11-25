# Vite + React + TypeScript + Tailwind CSS + Zustand

Dự án được khởi tạo với các công nghệ mới nhất:

- ⚡️ **Vite** - Build tool nhanh chóng
- ⚛️ **React 19** - Thư viện UI mới nhất
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🐻 **Zustand** - State management đơn giản và nhẹ

## 🚀 Bắt đầu

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

### Build cho production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── store/           # Zustand stores
│   └── useCounterStore.ts
├── App.tsx          # Component chính
├── main.tsx         # Entry point
└── index.css        # Tailwind CSS imports
```

## 🎯 Tính năng

- ✅ Hot Module Replacement (HMR)
- ✅ TypeScript support
- ✅ Tailwind CSS v4 với PostCSS
- ✅ Zustand store mẫu (Counter)
- ✅ ESLint configuration

## 📦 Dependencies

### Production
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `zustand` ^5.0.8

### Development
- `vite` ^7.2.4
- `typescript` ~5.9.3
- `tailwindcss` ^4.1.17
- `postcss` ^8.5.6
- `autoprefixer` ^10.4.22

## 🎨 Sử dụng Tailwind CSS

Tailwind CSS đã được cấu hình sẵn. Bạn có thể sử dụng các utility classes trực tiếp trong components:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## 🐻 Sử dụng Zustand

Ví dụ store mẫu đã được tạo tại `src/store/useCounterStore.ts`. Bạn có thể tạo thêm các stores khác theo cùng pattern:

```tsx
import { useCounterStore } from './store/useCounterStore'

function MyComponent() {
  const { count, increment } = useCounterStore()
  return <button onClick={increment}>Count: {count}</button>
}
```

## 📝 License

MIT
