#!/bin/bash
# setup_variants.sh – создание вариантов dilitant-dev с разными менеджерами пакетов и TypeScript
set -e

BASE_DIR="/home/dilitant/ProDilitant/devel_ap"
SOURCE="dilitant-dev"
RUST_DIR="src-tauri"

cd "$BASE_DIR"

# Проверяем, что исходная папка существует
if [ ! -d "$SOURCE" ]; then
    echo "❌ Исходная папка $SOURCE не найдена в $BASE_DIR"
    exit 1
fi

# Проверяем, что Rust-часть существует
if [ ! -d "$SOURCE/$RUST_DIR" ]; then
    echo "❌ Папка $RUST_DIR не найдена в $SOURCE. Создайте её сначала."
    exit 1
fi

echo "============================================"
echo " Создание вариантов проекта dilitant-dev"
echo "============================================"

# -----------------------------------------------------------
# 1. dilitant-dev-pnpm (pnpm)
# -----------------------------------------------------------
echo ""
echo "📦 1. Создаём dilitant-dev-pnpm..."
if [ -d "dilitant-dev-pnpm" ]; then
    echo "   Папка уже существует, пропускаем"
else
    rsync -a --exclude 'node_modules' --exclude "$RUST_DIR" "$SOURCE/" "dilitant-dev-pnpm/"
    cd dilitant-dev-pnpm
    # Создаём ссылку на общий src-tauri
    ln -sfn "../$SOURCE/$RUST_DIR" "$RUST_DIR"
    # Устанавливаем pnpm, если его нет
    if ! command -v pnpm &> /dev/null; then
        echo "   Устанавливаем pnpm глобально..."
        npm install -g pnpm
    fi
    echo "   Устанавливаем зависимости через pnpm..."
    pnpm install
    cd ..
    echo "   ✅ dilitant-dev-pnpm готов"
fi

# -----------------------------------------------------------
# 2. dilitant-dev-yarn (Yarn)
# -----------------------------------------------------------
echo ""
echo "🧶 2. Создаём dilitant-dev-yarn..."
if [ -d "dilitant-dev-yarn" ]; then
    echo "   Папка уже существует, пропускаем"
else
    rsync -a --exclude 'node_modules' --exclude "$RUST_DIR" "$SOURCE/" "dilitant-dev-yarn/"
    cd dilitant-dev-yarn
    ln -sfn "../$SOURCE/$RUST_DIR" "$RUST_DIR"
    if ! command -v yarn &> /dev/null; then
        echo "   Устанавливаем Yarn глобально..."
        npm install -g yarn
    fi
    echo "   Устанавливаем зависимости через Yarn..."
    yarn install
    cd ..
    echo "   ✅ dilitant-dev-yarn готов"
fi

# -----------------------------------------------------------
# 3. dilitant-dev-ts (TypeScript с npm)
# -----------------------------------------------------------
echo ""
echo "🏷️  3. Создаём dilitant-dev-ts (TypeScript)..."
if [ -d "dilitant-dev-ts" ]; then
    echo "   Папка уже существует, пропускаем"
else
    rsync -a --exclude 'node_modules' --exclude "$RUST_DIR" "$SOURCE/" "dilitant-dev-ts/"
    cd dilitant-dev-ts
    ln -sfn "../$SOURCE/$RUST_DIR" "$RUST_DIR"

    # Переименовываем .js в .ts, кроме vite.config.js и вложенных файлов
    echo "   Переименовываем .js -> .ts..."
    find src -name "*.js" ! -name "vite.config.js" -exec sh -c 'mv "$1" "${1%.js}.ts"' _ {} \;

    # Создаём tsconfig.json
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@core/*": ["./src/core/*"],
      "@shared/*": ["./src/shared/*"],
      "@features/*": ["./src/features/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"]
}
EOF

    echo "   Устанавливаем зависимости через npm..."
    npm install
    cd ..
    echo "   ✅ dilitant-dev-ts готов"
fi

echo ""
echo "============================================"
echo " Готово! Созданы три варианта:"
echo "   - dilitant-dev-pnpm  (pnpm + JS)"
echo "   - dilitant-dev-yarn  (Yarn + JS)"
echo "   - dilitant-dev-ts    (npm + TypeScript)"
echo ""
echo " Все они используют общий src-tauri."
echo " Запускать можно командой:"
echo "   npm run tauri dev    (или pnpm, yarn)"
echo " Только не забывай переходить в соответствующую папку."
echo "============================================"