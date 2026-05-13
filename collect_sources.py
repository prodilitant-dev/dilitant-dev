#!/usr/bin/env python3
import os, sys, json

# Только эти расширения
TEXT_EXTENSIONS = {
    '.js', '.ts', '.html', '.css', '.json', '.md',
    '.toml', '.gitignore', '.sh', '.rs', '.py',
    '.svg', '.txt', '.xml', '.yaml', '.yml', '.cfg',
}

# Папки, которые полностью игнорируем
EXCLUDE_DIRS = {
    '.git', '.vscode', 'node_modules', 'target',
    '__pycache__', '.venv', 'venv', 'env', 'dist',
    'icons', 'public', 'src-tauri/icons', 'src-tauri/target'
}

# Файлы, которые пропускаем при любом расширении
EXCLUDE_FILES = {
    '.DS_Store', 'Thumbs.db', 'all_code.json',
    os.path.basename(__file__), 'package-lock.json', 'Cargo.lock'
}

MAX_FILE_SIZE = 1_000_000  # 1 MB

def get_extension(path):
    _, ext = os.path.splitext(path)
    return ext.lower()

def collect_tree(root):
    try:
        items = sorted(os.listdir(root))
    except PermissionError:
        return {}

    tree = {}
    for name in items:
        if name.startswith('.') and name != '.gitignore':
            continue
        path = os.path.join(root, name)
        if os.path.islink(path):
            continue
        if os.path.isdir(path):
            # Проверяем, не находится ли текущая директория в списке исключений
            if name in EXCLUDE_DIRS or any(part in EXCLUDE_DIRS for part in path.split(os.sep)):
                continue
            subtree = collect_tree(path)
            if subtree:
                tree[name] = subtree
        else:
            if name in EXCLUDE_FILES:
                continue
            ext = get_extension(name)
            if ext not in TEXT_EXTENSIONS:
                continue
            try:
                size = os.path.getsize(path)
                if size > MAX_FILE_SIZE:
                    tree[name] = f"[skipped: >1MB]"
                    continue
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                tree[name] = content
            except (UnicodeDecodeError, PermissionError, OSError):
                tree[name] = f"[binary: {name}]"
    return tree

if __name__ == "__main__":
    root_dir = os.path.abspath(os.path.dirname(__file__))
    project_structure = {
        os.path.basename(root_dir): collect_tree(root_dir)
    }

    output_file = os.path.join(root_dir, "all_code.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(project_structure, f, ensure_ascii=False, indent=2)

    def count_files(d):
        cnt = 0
        for v in d.values():
            if isinstance(v, dict):
                cnt += count_files(v)
            else:
                cnt += 1
        return cnt

    total = count_files(project_structure)
    print(f"✅ Собрано {total} текстовых файлов в {output_file}")
