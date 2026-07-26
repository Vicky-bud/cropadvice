import requests

data = {
    "username": "badavathmadanlal06@gmail.com",
    "password": "password123"
}
res = requests.post("http://localhost:8000/api/auth/login", data=data)
print(res.status_code, res.text)
