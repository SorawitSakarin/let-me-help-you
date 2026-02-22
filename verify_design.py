from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    # Verify Landing Page
    print("Navigating to Home...")
    page.goto("http://localhost:3000")
    page.wait_for_selector("h1") # Wait for hero
    page.screenshot(path="verification_home.png", full_page=True)
    print("Screenshot saved: verification_home.png")

    # Verify QR Code
    print("Navigating to QR Code...")
    page.goto("http://localhost:3000/qr-code")
    page.wait_for_selector("h1")
    page.screenshot(path="verification_qr.png", full_page=True)
    print("Screenshot saved: verification_qr.png")

    # Verify Random Slot
    print("Navigating to Random Slot...")
    page.goto("http://localhost:3000/random-slot")
    page.wait_for_selector("h1")
    page.screenshot(path="verification_slot.png", full_page=True)
    print("Screenshot saved: verification_slot.png")

    # Verify TTS
    print("Navigating to TTS...")
    page.goto("http://localhost:3000/text-to-speech")
    page.wait_for_selector("h1")
    page.screenshot(path="verification_tts.png", full_page=True)
    print("Screenshot saved: verification_tts.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
