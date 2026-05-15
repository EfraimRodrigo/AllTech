#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix-fonts.py — AllTech
Varre todos os arquivos HTML e CSS do projeto e garante que
a fonte 'Syne' seja substituída por 'Plus Jakarta Sans' em
TODOS os contextos possíveis.

Uso:
    python fix-fonts.py

O script:
  1. Faz backup automático antes de qualquer alteração
  2. Processa todos os .html e .css na pasta do script
  3. Exibe um relatório detalhado do que foi alterado
  4. Verifica se ainda restou alguma referência à fonte antiga
"""

import os
import re
import shutil
from datetime import datetime
from pathlib import Path

# ── Configuração ──────────────────────────────────────────────────────────────
SITE_DIR    = Path(__file__).parent          # pasta onde o script está
BACKUP_DIR  = SITE_DIR.parent / "backups"   # pasta de backups

OLD_FONT_NAME   = "Syne"
NEW_FONT_NAME   = "Plus Jakarta Sans"
NEW_FONT_WEIGHT = "600;700;800"              # pesos disponíveis no Google Fonts

# Todas as variações de como a fonte antiga pode aparecer
REPLACEMENTS = [
    # CSS font-family declarations
    ("'Syne', sans-serif",              f"'{NEW_FONT_NAME}', sans-serif"),
    ('"Syne", sans-serif',              f"'{NEW_FONT_NAME}', sans-serif"),
    ("font-family: 'Syne'",             f"font-family: '{NEW_FONT_NAME}'"),
    ('font-family: "Syne"',             f"font-family: '{NEW_FONT_NAME}'"),
    ("font-family:'Syne',sans-serif",   f"font-family:'{NEW_FONT_NAME}',sans-serif"),
    ('font-family:"Syne",sans-serif',   f"font-family:'{NEW_FONT_NAME}',sans-serif"),
    ("font-family:'Syne'",              f"font-family:'{NEW_FONT_NAME}'"),
    # Google Fonts URL
    (
        "family=Syne:wght@700;800",
        f"family=Plus+Jakarta+Sans:wght@{NEW_FONT_WEIGHT}"
    ),
    (
        "family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800",
        f"family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@{NEW_FONT_WEIGHT}"
    ),
    # Inline style shorthand (loader CSS)
    ("font-family:'Syne'",              f"font-family:'{NEW_FONT_NAME}'"),
]

# ── Funções ───────────────────────────────────────────────────────────────────

def make_backup():
    """Cria backup com timestamp antes de qualquer alteração."""
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    dst = BACKUP_DIR / f"backup_{ts}_font-fix"
    shutil.copytree(SITE_DIR, dst, ignore=shutil.ignore_patterns(
        ".git", "backups", "__pycache__", "*.pyc"
    ))
    print(f"✅ Backup criado: {dst}")
    return dst


def process_file(filepath: Path) -> dict:
    """Processa um arquivo, aplica todas as substituições e retorna relatório."""
    result = {
        "file":     filepath.name,
        "changes":  [],
        "modified": False,
    }

    try:
        content = filepath.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = filepath.read_text(encoding="latin-1")

    original = content

    for old, new in REPLACEMENTS:
        if old in content:
            count = content.count(old)
            content = content.replace(old, new)
            result["changes"].append(f"  '{old[:50]}' → '{new[:50]}' ({count}x)")

    if content != original:
        filepath.write_text(content, encoding="utf-8")
        result["modified"] = True

    return result


def check_remaining(filepath: Path) -> list:
    """Verifica se ainda há referências à fonte antiga."""
    try:
        content = filepath.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = filepath.read_text(encoding="latin-1")

    found = []
    for match in re.finditer(r'.{0,40}Syne.{0,40}', content):
        found.append(match.group().strip())
    return found


def main():
    print("=" * 65)
    print(f"  fix-fonts.py — AllTech")
    print(f"  {OLD_FONT_NAME}  →  {NEW_FONT_NAME}")
    print("=" * 65)

    # 1. Backup
    print("\n📦 Criando backup...")
    make_backup()

    # 2. Coletar arquivos
    extensions = [".html", ".css"]
    files = []
    for ext in extensions:
        files.extend(SITE_DIR.glob(f"*{ext}"))
        files.extend((SITE_DIR / "css").glob(f"*{ext}"))
        files.extend((SITE_DIR / "js").glob(f"*{ext}"))

    # Remover duplicatas e arquivos de teste
    files = list({f for f in files if "teste" not in f.name.lower()})
    files.sort()

    print(f"\n🔍 Processando {len(files)} arquivos...\n")

    # 3. Processar
    modified_count = 0
    for f in files:
        result = process_file(f)
        if result["modified"]:
            modified_count += 1
            print(f"✏️  {result['file']}")
            for change in result["changes"]:
                print(change)
        else:
            print(f"✓  {result['file']} (sem alterações)")

    # 4. Verificar resíduos
    print(f"\n🔎 Verificando resíduos de '{OLD_FONT_NAME}'...")
    residues_found = False
    for f in files:
        remaining = check_remaining(f)
        if remaining:
            residues_found = True
            print(f"\n  ⚠️  {f.name} ainda tem referências:")
            for r in remaining[:5]:  # máximo 5 por arquivo
                print(f"     → {r}")

    if not residues_found:
        print(f"  ✅ Nenhuma referência a '{OLD_FONT_NAME}' encontrada.")

    # 5. Resumo
    print("\n" + "=" * 65)
    print(f"  CONCLUÍDO")
    print(f"  Arquivos modificados: {modified_count} de {len(files)}")
    print(f"  Nova fonte: {NEW_FONT_NAME} (pesos: {NEW_FONT_WEIGHT})")
    print("=" * 65)
    print("\n💡 Dica: Abra o site no browser e pressione Ctrl+Shift+R")
    print("   para forçar o recarregamento sem cache e ver a nova fonte.\n")


if __name__ == "__main__":
    main()
