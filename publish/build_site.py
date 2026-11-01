"""Сборка статического сайта из четырёх лабораторных работ."""

import argparse
from pathlib import Path
import shutil


WEB = Path(__file__).resolve().parent.parent
PUBLISH = WEB / "publish"
ALLOWED = {
    ".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".gif",
    ".webp", ".svg", ".ico", ".xml", ".dtd", ".xsd",
}
SOURCES = [
    (WEB / "Лабораторная работа 1" / "Letter", "lab1/letter"),
    (WEB / "Лабораторная работа 1" / "Planets", "lab1/planets"),
    (WEB / "Лабораторная работа 2" / "BirdWatching", "lab2"),
    (WEB / "Лабораторная работа 3" / "Airport", "lab3"),
    (WEB / "Лабораторная работа 4", "lab4"),
]
BACK_LINKS = {
    "lab1/letter/index.html": "../../",
    "lab1/planets/index.html": "../../",
    "lab2/index.html": "../",
    "lab3/index.html": "../",
    "lab3/flights.html": "../",
    "lab3/booking.html": "../",
    "lab3/contacts.html": "../",
    "lab4/index.html": "../",
}


def build(output):
    files = {
        Path("index.html"): PUBLISH / "menu" / "index.html",
        Path("styles.css"): PUBLISH / "menu" / "styles.css",
        Path("lab1/index.html"): PUBLISH / "lab1-index.html",
    }
    for source, destination in SOURCES:
        if not source.is_dir():
            raise ValueError(f"Не найдена папка: {source}")
        if output == source or output in source.parents or source in output.parents:
            raise ValueError("Папка сборки не должна пересекаться с исходниками")
        for file in sorted(source.rglob("*")):
            if file.is_file() and file.suffix.lower() in ALLOWED:
                files[Path(destination) / file.relative_to(source)] = file

    if output == PUBLISH or PUBLISH in output.parents:
        raise ValueError("Выберите папку сборки вне publish")
    if output.exists():
        extra = {p.relative_to(output) for p in output.rglob("*") if p.is_file()} - set(files)
        if extra:
            raise ValueError("В папке сборки есть посторонние файлы. Выберите пустую папку через --output")

    for relative, source in files.items():
        target = output / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)

    for relative, href in BACK_LINKS.items():
        target = output / relative
        text = target.read_text(encoding="utf-8")
        if text.count("</body>") != 1:
            raise ValueError(f"Не найден единственный </body>: {relative}")
        link = f'<p><a href="{href}">В главное меню лабораторных работ</a></p>'
        if relative == "lab2/index.html":
            if text.count("</footer>") != 1:
                raise ValueError("В BirdWatching не найден единственный </footer>")
            text = text.replace("</footer>", "  " + link + "\n    </footer>")
            text = text.replace("</body>", "  </body>")
        else:
            text = text.replace("</body>", "    " + link + "\n  </body>")
        target.write_text(text, encoding="utf-8")

    return len(files)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=WEB / "_проверка" / "site",
                        help="Папка результата (по умолчанию web/_проверка/site)")
    args = parser.parse_args()
    output = args.output.expanduser().resolve()
    try:
        count = build(output)
    except (OSError, ValueError) as error:
        parser.exit(1, f"Ошибка: {error}\n")
    print(f"Готово: {count} файлов в {output}")


if __name__ == "__main__":
    main()
