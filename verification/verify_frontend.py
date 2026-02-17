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
        page.wait_for_selector("text=Daily 8-bit Tools", timeout=10000)
        page.screenshot(path="verification/landing_page.png", full_page=True)
        print("Landing page screenshot taken.")

        # 2. QR Code Generator
        print("Navigating to QR Code Generator...")
        page.goto("http://localhost:3000/qr-code")
        page.wait_for_selector("text=Generate QR Code", timeout=10000)
        page.fill("#url_field", "https://example.com/test")
        time.sleep(1)
        page.screenshot(path="verification/qr_code_page.png", full_page=True)
        print("QR Code page screenshot taken.")

        # 3. Random Slot Machine
        print("Navigating to Random Slot Machine...")
        page.goto("http://localhost:3000/random-slot")
        page.wait_for_selector("text=Random Slot Machine", timeout=10000)
        page.fill("#options_field", "Option A\nOption B\nOption C")
        page.click("text=SPIN!")
        time.sleep(2) # Wait for spin to start/process
        page.screenshot(path="verification/slot_machine_spinning.png", full_page=True)
        print("Slot Machine page screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
