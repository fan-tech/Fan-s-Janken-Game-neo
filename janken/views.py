from itertools import product
import random
import logging
import sys
import io
from this import d
from django.http import JsonResponse, HttpResponse
import json
from django.http import QueryDict
from django.shortcuts import render

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def index(request):
    return render(request, 'janken/index.html')


def ajax_janken(request):
    npc_janken = random.randint(0,2)
    my_janken = int(request.POST['id'])
    d ={'kekka':-1}

    if npc_janken ==0 and my_janken ==0:
        # 2はあいこ
        d = {'kekka': 'あいこ','NPC手':'ぐー'}
    elif npc_janken == 0 and my_janken == 1:
        # 0はまけ
        d = {'kekka': 'まけ', 'NPC手': 'ぐー'}
    elif npc_janken == 0 and my_janken ==2:
        # 1は勝ち
        d = {'kekka': 'かち', 'NPC手': 'ぐー'}
    elif npc_janken == 1 and my_janken == 0:
        # 1は勝ち
        d = {'kekka': 'かち', 'NPC手': 'ちょき'}
    elif npc_janken == 1 and my_janken == 1:
        # 2はあいこ
        d = {'kekka': 'あいこ', 'NPC手': 'ちょき'}
    elif npc_janken == 1 and my_janken == 2:
        # 0はまけ
        d = {'kekka': 'まけ', 'NPC手': 'ちょき'}
    elif npc_janken == 2 and my_janken== 0:
        # 0はまけ
        d = {'kekka': 'まけ', 'NPC手': 'ぱー'}
    elif npc_janken == 2 and my_janken == 1:
        # 1は勝ち
        d = {'kekka': 'かち', 'NPC手': 'ぱー'}
    elif npc_janken ==2 and my_janken ==2:
        # 2はあいこ
        d = {'kekka': 'あいこ', 'NPC手': 'ぱー'}
    return JsonResponse(d)
