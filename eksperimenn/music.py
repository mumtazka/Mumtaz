import time
import sys

def ketik(teks, delay=0.05):
    for char in teks:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()  # biar enter otomatis

# === Lirik dengan timing ===
ketik("But if you're looking for something new", 0.06)
time.sleep(3)

ketik("I know somebody that you could choose", 0.06)
time.sleep(4)

ketik("What about me?", 0.09)
time.sleep(2)

ketik("What about me?", 0.09)
time.sleep(2)

ketik("What about me and you together?", 0.06)
time.sleep(4)

ketik("Something that could really last forever", 0.06)
time.sleep(4)

ketik("What about me?", 0.09)
time.sleep(2)

ketik("What about me? Yeah", 0.09)
time.sleep(3)
