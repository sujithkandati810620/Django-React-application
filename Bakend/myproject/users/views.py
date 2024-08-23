from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json
from django.contrib.auth.hashers import check_password, make_password

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            address = data.get('address')
            age = data.get('age')
            phone = data.get('phone')

            if not all([username, email, password, address, age, phone]):
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            # # Check if username or email already exists
            # if User.objects.filter(username=username).exists():
            #     return JsonResponse({'message': 'username existed'})
            
            # if User.objects.filter(email=email).exists():
            #     return JsonResponse({'message': 'email alredy existed'})

            # # Hash the password before saving
            

            # Create and save the user with hashed password
            user = User(
                username=username,
                email=email,
                password=password,  # Save the hashed password
                address=address,
                age=age,
                phone=phone
            )
            user.save()

            # Return user information (username in this case)
            return JsonResponse({
                'user_id': username,  # Use username as user_id
                'message': 'User registered successfully'
            })

        except KeyError as e:
            return JsonResponse({'error': f'Missing key: {e.args[0]}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
            if password == user.password:
                # Password is correct, return success response with user ID
                return JsonResponse({
                    'message': 'Login successful',
                    # 'user_id': str(user.id),  # Ensure user ID is included
                    'username': user.username  # Optional: include username
                })
            else:
                # Password is incorrect
                return JsonResponse({'error': 'Invalid username or password'}, status=401)
        except User.DoesNotExist:
            # User not found
            return JsonResponse({'error': 'Invalid username or password'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def user_list(request):
    if request.method == 'GET':
        username = request.GET.get('username')  # Get username from query parameters

        if not username:
            # If no username is provided, return a list of all users
            users = User.objects.all().values('username', 'email', 'address', 'age', 'phone')
            return JsonResponse(list(users), safe=False)

        try:
            user = User.objects.get(username=username)
            user_details = {
                'username': user.username,
                'email': user.email,
                'address': user.address,
                'age': user.age,
                'phone': user.phone
            }
            return JsonResponse(user_details)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
