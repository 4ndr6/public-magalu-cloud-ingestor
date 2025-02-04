# -*- coding: UTF-8 -*-

import sys
import time

import json
import os
import random
import requests


def send(url: str, sku: str, tenant: str, used_amount: int, unit: str, timeout: int = 5000):
    headers = {'Content-Type': 'application/json'}
    data = {
        "usedAmount": f"{used_amount}",
        "useUnity": f"{unit}",
        "tenant": {"name": f"{tenant}"},
        "product": {"sku": f"{sku}", "description": "sky created by python worker"}
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data), timeout=timeout)
        if response.status_code == 200:
            res_json = response.json()
            pulse_id = res_json.get('id')
            print(f"Pulse created: {pulse_id}")
        elif response.status_code == 201:
            res_json = response.json()
            pulse_id = res_json.get('id')
            print(f"Pulse updated: {pulse_id}")
        else:
            # melhorias: realizar retry em caso de erro
            print("Error while creating pulse")
            print(response.status_code, response.text)
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except requests.exceptions.ConnectionError as conn_err:
        print(f'Connection error occurred: {conn_err}')
    except requests.exceptions.Timeout as timeout_err:
        print(f'Timeout occurred: {timeout_err}')
    except requests.exceptions.RequestException as req_err:
        print(f'An unexpected error occurred: {req_err}')


def main():
    host = os.getenv('HOST', "http://localhost:4000")
    max_tenant = int(os.getenv('MAX_TENANT', "15000"))
    max_sku = int(os.getenv('MAX_SKU', "300"))
    min_amount = int(os.getenv('MIN_AMOUNT', "100"))
    max_amount = int(os.getenv('MAX_AMOUNT', "9999"))
    sleep = float(os.getenv('SLEEP', "0.5"))
    url = f"{host}/pulses"
    print(f"POST {url}")

    # Probabilidades no sorteio
    # KB: 30%
    # MB: 50%
    # GB: 10%
    # TB: 10%
    # KBPS: 0%
    # MBPS: 0%
    # GBPS: 0%
    # TBPS: 0%
    units = ["KB", "KB", "KB", "MB", "MB", "MB", "MB", "MB", "GB", "TB"]

    tenants = []
    for i in range(max_tenant):
        tenants.append(f"tenant_py_{i+1:03}")

    skus = []
    for i in range(max_sku):
        skus.append(f"vm_py_{i+1:03}")

    while True:
        tenant = random.choice(tenants)
        unit = random.choice(units)
        sku = random.choice(skus)
        used_amount = random.randint(min_amount, max_amount)
        print(f"sku: {sku}, tenant: {tenant}, used_amount: {used_amount}{unit}")
        send(url, sku, tenant, used_amount, unit)
        time.sleep(float(sleep))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(1)
