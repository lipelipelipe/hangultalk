import asyncio
import os
import sys
import edge_tts

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')


PHRASES = [
    {"id": "phrase_1", "text": "좋은 아침이에요"},
    {"id": "phrase_2", "text": "물"},
    {"id": "phrase_3", "text": "물 주세요"},
    {"id": "phrase_4", "text": "좋은 아침이에요. 물 주세요."},
    {"id": "phrase_5", "text": "감사합니다"},
    {"id": "phrase_6", "text": "커피 한 잔 주세요"},
    {"id": "phrase_7", "text": "안녕하세요"},
    {"id": "phrase_8", "text": "만나서 반가워요"},
    {"id": "phrase_9", "text": "이거 얼마예요?"},
    {"id": "phrase_10", "text": "맛있게 드세요"}
]

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

async def generate():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for p in PHRASES:
        normal_path = os.path.join(OUTPUT_DIR, f"{p['id']}.mp3")
        slow_path = os.path.join(OUTPUT_DIR, f"{p['id']}_slow.mp3")

        print(f"Generating {p['id']} -> {p['text']}...")
        # Normal speed
        communicate_normal = edge_tts.Communicate(p['text'], VOICE, rate="+0%")
        await communicate_normal.save(normal_path)

        # Slow speed (-25%)
        communicate_slow = edge_tts.Communicate(p['text'], VOICE, rate="-25%")
        await communicate_slow.save(slow_path)
        print(f"Saved: {normal_path} & {slow_path}")

    print("\nAll 10 Korean audio phrases generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
