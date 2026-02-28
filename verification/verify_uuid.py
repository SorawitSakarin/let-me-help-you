from playwright.sync_api import sync_playwright

def verify_uuid_generator():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the UUID Generator page
        page.goto("http://localhost:3000/generate-uuid")

        # Verify title
        if page.locator("h2.title").inner_text() != "UUID Generator":
            print("Title mismatch")
            return

        # Generate UUIDs
        # Default quantity is 1
        page.click("button.is-primary") # Generate button

        # Check if UUID is generated
        uuids = page.locator("ul.nes-list li")
        if uuids.count() != 1:
             print(f"Expected 1 UUID, found {uuids.count()}")
             return

        # Change quantity to 5
        # The input is a range slider, so we set the value directly
        page.fill("input[type='range']", "5")

        # Generate again
        page.click("button.is-primary")

        # Check if 5 UUIDs are generated
        uuids = page.locator("ul.nes-list li")
        if uuids.count() != 5:
             print(f"Expected 5 UUIDs, found {uuids.count()}")
             return

        # Take a screenshot
        page.screenshot(path="verification/uuid_generator.png")
        print("Verification successful, screenshot saved to verification/uuid_generator.png")

        browser.close()

if __name__ == "__main__":
    verify_uuid_generator()
