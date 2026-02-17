from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Landing Page
        print("Navigating to Home...")
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Text to Speech", timeout=10000)
        page.screenshot(path="verification/landing_page_with_tts.png", full_page=True)
        print("Landing page screenshot taken.")

        # 2. Text to Speech
        print("Navigating to TTS Page...")
        page.click("text=Open Tool >> nth=2") # Click the 3rd tool (or by text if unique)
        # Wait for navigation
        page.wait_for_url("**/text-to-speech")
        page.wait_for_selector("text=Text to Speech", timeout=10000)

        page.fill("#tts_input", "Hello, this is a test.")
        time.sleep(1)

        # Take screenshot of TTS interface
        page.screenshot(path="verification/tts_page.png", full_page=True)
        print("TTS page screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
