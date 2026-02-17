from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Landing Page - Check Title
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Daily Task Tool", timeout=10000)
        page.screenshot(path="verification/landing_rebrand.png", full_page=True)
        print("Landing page screenshot taken. Rebrand verified.")

        # 2. QR Code Page - Check Back Button
        print("Navigating to QR Code Page...")
        page.goto("http://localhost:3000/qr-code")
        page.wait_for_selector("text=< Back to Home", timeout=10000)
        page.screenshot(path="verification/qr_back_btn.png", full_page=True)
        print("QR Code page back button verified.")

        # 3. Slot Machine Page - Check Back Button
        print("Navigating to Slot Machine Page...")
        page.goto("http://localhost:3000/random-slot")
        page.wait_for_selector("text=< Back to Home", timeout=10000)
        page.screenshot(path="verification/slot_back_btn.png", full_page=True)
        print("Slot Machine page back button verified.")

         # 4. TTS Page - Check Back Button
        print("Navigating to TTS Page...")
        page.goto("http://localhost:3000/text-to-speech")
        page.wait_for_selector("text=< Back to Home", timeout=10000)
        page.screenshot(path="verification/tts_back_btn.png", full_page=True)
        print("TTS page back button verified.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
