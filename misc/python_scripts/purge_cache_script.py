import os
import requests
import argparse
from dotenv import load_dotenv

def purge_cache(domain: str):
    """
    Purges the Nuxt multi-cache for a given domain.
    """
    load_dotenv()
    token = os.getenv("CACHE_PURGE_API_KEY")

    if not token:
        print("Error: CACHE_PURGE_API_KEY not found in environment variables.")
        print("Please ensure you have a .env file with CACHE_PURGE_API_KEY set.")
        return

    url = f"{domain}/__nuxt_multi_cache/purge/all"
    headers = {
        "x-nuxt-multi-cache-token": token,
        "Content-Type": "application/json",
    }

    try:
        print(f"Attempting to purge cache for domain: {domain}")
        response = requests.post(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4XX or 5XX)
        print(f"Status: {response.status_code}")
        try:
            print("Response body:", response.json())
<<<<<<< HEAD
        except (requests.exceptions.JSONDecodeError, ValueError):
=======
        except requests.exceptions.JSONDecodeError:
>>>>>>> d8cc2fa9 (change notebook to script)
            print("Response body (not JSON):", response.text)
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Status Code: {response.status_code}")
        print(f"Response Text: {response.text}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
        print(f"Failed to connect to {url}. Please check the domain and your network connection.")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"An unexpected error occurred: {req_err}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Purge Nuxt multi-cache for a specified domain.")
    parser.add_argument("domain", type=str, help="The domain to purge the cache for (e.g., http://localhost:3000 or https://example.com)")

    args = parser.parse_args()

    purge_cache(args.domain)
