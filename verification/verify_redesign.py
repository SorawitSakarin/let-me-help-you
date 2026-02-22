import time
from playwright.sync_api import sync_playwright

def verify_redesign():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to capture more content
        page = browser.new_page(viewport={'width': 1280, 'height': 1200})

        # 1. Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        time.sleep(1) # Wait for hydration
        page.screenshot(path="verification/home.png")
        print("Captured home.png")

        # 2. Currency Converter (New Tool)
        print("Navigating to Currency Converter...")
        page.goto("http://localhost:3000/currency-converter")
        time.sleep(1)
        # Check if NES classes are gone
        content = page.content()
        if "nes-container" in content:
            print("WARNING: 'nes-container' found in Currency Converter!")
        else:
            print("Success: No 'nes-container' in Currency Converter.")
        page.screenshot(path="verification/currency.png")
        print("Captured currency.png")

        # 3. Pomodoro Timer (New Tool)
        print("Navigating to Pomodoro Timer...")
        page.goto("http://localhost:3000/pomodoro-timer")
        time.sleep(1)
        page.screenshot(path="verification/pomodoro.png")
        print("Captured pomodoro.png")

        # 4. Word Counter (New Tool)
        print("Navigating to Word Counter...")
        page.goto("http://localhost:3000/word-counter")
        time.sleep(1)
        page.screenshot(path="verification/word-counter.png")
        print("Captured word-counter.png")

        # 5. QR Code (Refactored Existing Tool)
        print("Navigating to QR Code...")
        page.goto("http://localhost:3000/qr-code")
        time.sleep(1)
        page.screenshot(path="verification/qr-code.png")
        print("Captured qr-code.png")

        browser.close()

if __name__ == "__main__":
    verify_redesign()
