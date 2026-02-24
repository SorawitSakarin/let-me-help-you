from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to the hacking screen
        page.goto("http://localhost:3000/hacking-screen")

        # Simulate typing to generate code
        page.keyboard.type("hacking in progress", delay=100)

        # Wait a bit for more code to potentially appear (if auto-hack was triggered, but here we just typed)
        time.sleep(1)

        # Move mouse to trigger footer
        page.mouse.move(100, 500)
        page.mouse.move(100, 600) # Move down

        # Wait for footer transition
        time.sleep(0.5)

        # Take screenshot
        page.screenshot(path="verification/hacking_screen.png")

        browser.close()

if __name__ == "__main__":
    run()
