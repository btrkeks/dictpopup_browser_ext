#!/usr/bin/env python3
import sys
import json
import struct
import subprocess

def get_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def send_message(message):
    encoded_message = json.dumps(message).encode('utf-8')
    encoded_length = struct.pack('=I', len(encoded_message))
    sys.stdout.buffer.write(encoded_length)
    sys.stdout.buffer.write(encoded_message)
    sys.stdout.buffer.flush()

while True:
    message = get_message()
    print("message: {message['text']}")
    subprocess.Popen(['dictpopup', message['text']])
    send_message({"result": "opened"})
