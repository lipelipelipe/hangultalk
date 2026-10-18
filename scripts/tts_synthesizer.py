import sys
import asyncio
import edge_tts

async def main():
    if len(sys.argv) < 3:
        print("Usage: python tts_synthesizer.py <text> <output_file> [slow]")
        sys.exit(1)
        
    text = sys.argv[1]
    output_file = sys.argv[2]
    slow = len(sys.argv) > 3 and sys.argv[3].lower() in ['true', '1', 'slow']
    
    rate = "-25%" if slow else "+0%"
    voice = "ko-KR-SunHiNeural"
    
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_file)

if __name__ == '__main__':
    asyncio.run(main())
